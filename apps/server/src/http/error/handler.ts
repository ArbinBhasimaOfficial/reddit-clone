import { z, ZodError } from "zod";
import { CustomError } from "./customError.js";
import type { ResponseFormat } from "../response/index.js";

export class ErrorHandler {
    constructor(private readonly error: any) {}

    handle(): ResponseFormat<any> {
        // Based on instance of err, return the response payload
        if (this.error instanceof ZodError) {
            return this.handlerZodError(this.error);
        }

        if (this.error instanceof CustomError) {
            return this.handleCustomError(this.error);
        }

        return this.handleJSError(this.error);
    }

    handleCustomError(err: CustomError): ResponseFormat {
        return {
            statusCode: err.statusCode,
            message: err.message,
            data: err.data ?? null,
        }
    }

    // Plain JS errors (and anything else thrown): body-parser / http-errors
    // carry their own status (malformed JSON → 400). Trust client errors
    // (< 500) and their message; never leak 5xx text.
    handleJSError(err: any): ResponseFormat {
        return {
            statusCode: 500,
            message: err.message || "Internal server error",
            data: null,
        }
    }

    handlerZodError(err: ZodError): ResponseFormat {
        return {
            statusCode: 422,
            message: "Validation failed",
            data: z.treeifyError(err),
        };
    };
}; 