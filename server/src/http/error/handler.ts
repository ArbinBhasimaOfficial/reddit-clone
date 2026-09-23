import { z, ZodError } from "zod";

export class ErrorHandler {
    constructor(private readonly error: any) {}

    handle() {
        // Based on instance of err, return the response payload
        if (this.error instanceof ZodError) {
            return this.handlerZodError(this.error);
        }

        // Body-parser / http-errors carry their own status (malformed JSON → 400).
        // Trust client errors (< 500) and their message; never leak 5xx text.
        const status =
            typeof this.error?.status === "number" && this.error.status < 500
                ? this.error.status
                : 500;

        return {
            message:
                status < 500 ? this.error?.message ?? "Bad Request" : "Internal server error",
            data: null,
            status,
        };
    }

    handlerZodError(err: ZodError) {
        return {
            status: 422,
            message: "Validation failed",
            data: z.treeifyError(err),
        };
    };
}; 