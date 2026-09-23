// Adds `validatedBody` to express' Request everywhere: the validate() factory
// writes the parsed zod output there, controllers read it.
export {};

declare global {
    namespace Express {
        interface Request {
            validatedBody?: Record<string, any>;
        }
    }
}