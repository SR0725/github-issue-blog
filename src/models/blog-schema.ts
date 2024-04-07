import { z } from "zod";

const blogSchema = z.object({
  title: z.string().min(1, {
    message: "標題必填",
  }),
  body: z.string().min(30, {
    message: "內文至少需要 30 字",
  }),
});

export default blogSchema;

export type BlogSchema = z.infer<typeof blogSchema>;
