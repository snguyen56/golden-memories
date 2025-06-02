import { z } from "zod";

export const commentSchema = z.object({
  id: z.string(),
  postId: z.string(),
  userId: z.string(),
  content: z.string(),
  createdAt: z.string().or(z.date()),
  user: z.object({
    name: z.string(),
    image: z.string(),
  }),
});

export const CommentsResultsSchema = z.object({
  comments: z.array(commentSchema),
});

export type Comment = z.infer<typeof commentSchema>;
export type CommentResponse = z.infer<typeof CommentsResultsSchema>;
