import { z } from 'zod';
import { DatasetCollectionTypeEnum } from '../dataset/constants';
import { ZodChunkSettingsSchema } from './DatasetSchema';

// ==================== Collection Name ====================
/**
 * DatasetCollection 集合名称，对应 MongoDB 集合
 */
export const DATASET_COLLECTION_COLLECTION_NAME = 'dataset_collections' as const;

// ==================== Zod Schema Definitions ====================

/**
 * 数据集合元数据 Zod Schema
 */
export const ZodDatasetCollectionMetadataSchema = z
  .object({
    webPageSelector: z.string().optional().describe('网页选择器'),
    relatedImgId: z.string().optional().describe('关联图片集合的ID')
  })
  .catchall(z.any())
  .describe('数据集合元数据对象');

/**
 * DatasetCollection Zod Schema，对应 MongoDB DatasetCollectionSchema
 * Collection: dataset_collections
 */
//FastGPT/packages/service/core/dataset/collection/schema.ts
export const ZodDatasetCollectionSchema = ZodChunkSettingsSchema.extend({
  _id: z.string().optional().describe('数据集合的唯一标识符'),

  parentId: z.string().nullable().optional().describe('父集合ID，用于建立集合的层级关系'),

  teamId: z.string().describe('团队ID，标识集合所属的团队'),

  tmbId: z.string().describe('团队成员ID，标识集合的创建者或负责人'),

  datasetId: z.string().describe('数据集ID，标识集合所属的数据集'),

  // 基础信息
  type: z.nativeEnum(DatasetCollectionTypeEnum).describe('集合类型'),

  name: z.string().describe('集合名称'),

  tags: z.array(z.string()).default([]).describe('标签列表，用于分类和筛选'),

  createTime: z
    .date()
    .default(() => new Date())
    .describe('创建时间，集合创建的时间戳'),

  updateTime: z
    .date()
    .default(() => new Date())
    .describe('更新时间，集合最后更新的时间戳'),

  // 元数据
  fileId: z.string().optional().describe('本地文件ID，关联到 dataset.files 集合'),

  rawLink: z.string().optional().describe('原始链接，网络链接集合的URL'),

  apiFileId: z.string().optional().describe('API文件ID，API集合的文件标识'),

  externalFileId: z.string().optional().describe('外部文件ID（已废弃）'),

  externalFileUrl: z.string().optional().describe('外部导入URL，外部文件的访问地址'),

  rawTextLength: z.number().optional().describe('原始文本长度'),

  hashRawText: z.string().optional().describe('原始文本哈希值'),

  metadata: ZodDatasetCollectionMetadataSchema.default({}).describe('元数据对象'),

  forbid: z.boolean().optional().describe('是否禁用'),

  nextSyncTime: z.date().optional().describe('下次同步时间'),

  // 解析设置
  customPdfParse: z.boolean().optional().describe('自定义PDF解析')
}).describe('数据集合数据模型');
