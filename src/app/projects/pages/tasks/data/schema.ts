import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
  deadline: z
  .object({
    from: z.date().optional(),
    to: z.date().optional(),
  })
  .optional()
  .refine(
    (data) => data?.from && data?.to && data?.from < data?.to,
    "Deadline must be a valid date range"
  ),
});

export type TaskSchema = z.infer<typeof taskSchema>;
