import z from "zod";

export const queryParamSchema = z.looseObject({
  title: z.string().optional(),
});

export type QueryParamSchema = z.infer<typeof queryParamSchema>;
