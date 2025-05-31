import { z } from "zod";

export const CoverImageSchema = z.object({
  name: z.string(),
  url: z.string().url(),
  width: z.number(),
  height: z.number(),
});

export const CollectionSchema = z.object({
  id: z.string(),
  userId: z.string(),
  createdAt: z.string().or(z.date()),
  updatedAt: z.string().or(z.date()),
  cover: CoverImageSchema,
});

export const CollectionsResultsSchema = z.object({
  collections: z.array(CollectionSchema),
});

export type Collection = z.infer<typeof CollectionSchema>;
export type CollectionResponse = z.infer<typeof CollectionsResultsSchema>;
