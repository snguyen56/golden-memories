import { z } from "zod";

const PaginationSchema = z.object({
  page: z.number(),
  per_page: z.number(),
  prev_page: z.string().optional(),
  next_page: z.string().optional(),
  total_results: z.number(),
});

const PhotoSchema = z.object({
  id: z.number(),
  width: z.number(),
  height: z.number(),
  url: z.string(),
  photographer: z.string(),
  photographer_url: z.string(),
  src: z.object({
    large: z.string(),
  }),
  alt: z.string(),
});

const VideoSchema = z.object({
  id: z.number(),
  width: z.number(),
  height: z.number(),
  url: z.string(),
  image: z.string(),
  user: z.object({
    name: z.string(),
    url: z.string(),
  }),
});

const CollectionSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
});

export const PhotosSchemaWithPagination = PaginationSchema.extend({
  photos: z.array(PhotoSchema),
});

export const CollectionsSchemaWithPagination = PaginationSchema.extend({
  collections: z.array(CollectionSchema),
});

const MediaPhotoSchema = PhotoSchema.extend({
  type: z.literal("Photo"),
});
const MediaVideoSchema = VideoSchema.extend({
  type: z.literal("Video"),
});

export const MediaSchemaWithPagination = PaginationSchema.extend({
  id: z.string(),
  media: z.array(z.union([MediaPhotoSchema, MediaVideoSchema])),
});

export type Photo = z.infer<typeof PhotoSchema>;

export type Collection = z.infer<typeof CollectionSchema>;

export type ImagesResults = z.infer<typeof PhotosSchemaWithPagination>;

export type CollectionsResults = z.infer<
  typeof CollectionsSchemaWithPagination
>;

export type MediaResults = z.infer<typeof MediaSchemaWithPagination>;
