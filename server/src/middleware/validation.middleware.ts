import type { z } from "zod"
import type { Request, Response, NextFunction } from "express"

// Generic body validation — the schema comes per-route (see post.routes.ts).
// safeParse (not parse): reject HERE with a readable 400 so the global
// ErrorHandler's 422 branch only ever sees genuinely thrown ZodErrors.
export function validate<T extends Record<string, any>>(schema: z.ZodType<T>) {
    return function (req: Request, res: Response, next: NextFunction) {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            // One readable string, e.g. "content: Content is required; images.0: Invalid url ..."
            const message = result.error.issues
                .map((issue) =>
                    issue.path.length > 0
                        ? `${issue.path.join(".")}: ${issue.message}`
                        : issue.message,
                )
                .join("; ");

            return res.status(400).json({ error: message });
        }

        req.validatedBody = result.data; // zod output: known keys only, correct types
        next();
    }
}

// :id guard — post ids are UUID strings, so there is nothing numeric to parse;
// this normalizes Express' `string | string[] | undefined` param typing and
// rejects an empty id with 400. Lives here so controllers stay validation-free.
export function validateId(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;

    if (typeof id !== "string" || id === "") {
        return res.status(400).json({ error: "id is required" });
    }

    next();
}