import { z } from 'zod';

// ==================== Collection Name ====================
/**
 * DatasetDataText 集合名称，对应 MongoDB 集合
 */
export const DATASET_DATA_TEXT_COLLECTION_NAME = 'dataset_data_texts' as const;

// ==================== Zod Schema Definitions ====================

/**
 * DatasetDataText Zod Schema，对应 MongoDB DatasetDataTextSchema
 * Collection: dataset_data_texts
 */
//FastGPT/packages/service/core/dataset/data/dataTextSchema.ts
export const ZodDatasetDataTextSchema = z
  .object({
    _id: z.string().optional().describe('数据集文本数据的唯一标识符'),

    teamId: z.string().describe('团队ID，标识文本数据所属的团队'),

    datasetId: z.string().describe('数据集ID，标识文本数据所属的数据集'),

    collectionId: z.string().describe('集合ID，标识文本数据所属的集合'),

    dataId: z.string().describe('数据ID，关联到 dataset_datas 集合的数据项'),

    fullTextToken: z.string().optional().describe('全文搜索标记，用于文本搜索索引')
  })
  .describe('数据集文本数据模型');
