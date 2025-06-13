import { z } from 'zod';

// ==================== Collection Name ====================
/**
 * DatasetCollectionTags 集合名称，对应 MongoDB 集合
 */
export const DATASET_COLLECTION_TAGS_COLLECTION_NAME = 'dataset_collection_tags' as const;

// ==================== Zod Schema Definitions ====================

/**
 * DatasetCollectionTags Zod Schema，对应 MongoDB DatasetCollectionTagsSchema
 * Collection: dataset_collection_tags
 */
//FastGPT/packages/service/core/dataset/tag/schema.ts
export const ZodDatasetCollectionTagsSchema = z
  .object({
    _id: z.string().optional().describe('数据集合标签的唯一标识符'),

    teamId: z.string().describe('团队ID，标识标签所属的团队'),

    datasetId: z.string().describe('数据集ID，标识标签所属的数据集'),

    tag: z.string().describe('标签名称，用于标记和分类数据集合')
  })
  .describe('数据集合标签数据模型');
