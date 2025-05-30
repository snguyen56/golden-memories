import { z } from "zod";

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string(),
});

export const LikeSchema = z.object({
  userId: z.string(),
  postId: z.string(),
  createdAt: z.date(),
});

export const PostSchema = z.object({
  id: z.string(),
  name: z.string(),
  url: z.string().url(),
  width: z.number(),
  height: z.number(),
  format: z.string(),
  resourceType: z.string(),
  userId: z.string(),
  collectionId: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  user: UserSchema,
  likes: z.array(LikeSchema),
});

export const PostsResponseSchema = z.object({
  posts: z.array(PostSchema),
  nextCursor: z.string().datetime().nullable(),
});

export type Post = z.infer<typeof PostSchema>;
export type PostsResponse = z.infer<typeof PostsResponseSchema>;
