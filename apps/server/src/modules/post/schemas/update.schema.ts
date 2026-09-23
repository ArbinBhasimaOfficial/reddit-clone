import {z} from "zod";

export const postUpdateSchema = z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    images: z.array(z.url("Invalid image url"),).optional(),
    createdBy: z.object(
        {
            id: z.string("Id is required").min(1, "user id is required"),
            name: z.string("Name is required").min(1, "user name is required"),
        }
    ).optional(),
});


export type PostUpdateInput = z.infer<typeof postUpdateSchema>