import { z } from 'zod';

// ==================== Bucket Name ====================
/**
 * DatasetImage 桶名称，对应 MongoDB GridFS 桶
 */
export const DATASET_IMAGE_BUCKET_NAME = 'dataset_image' as const;

// ==================== Zod Schema Definitions ====================

/**
 * 数据集图片元数据 Zod Schema
 */
export const ZodDatasetImageMetadataSchema = z
  .object({
    teamId: z.string().describe('团队ID，标识图片所属的团队'),
    datasetId: z.string().describe('数据集ID，标识图片所属的数据集'),
    collectionId: z.string().optional().describe('集合ID，标识图片所属的集合'),
    expiredTime: z.date().describe('过期时间，图片的有效期限')
  })
  .describe('数据集图片元数据对象');

/**
 * DatasetImage Zod Schema，对应 MongoDB DatasetImageSchema
 * GridFS Bucket: dataset_image.files
 */
//FastGPT/packages/service/core/dataset/image/schema.ts
export const ZodDatasetImageSchema = z
  .object({
    _id: z.string().optional().describe('数据集图片的唯一标识符'),

    length: z.number().describe('文件大小，单位字节'),

    chunkSize: z.number().describe('数据块大小，GridFS分块大小'),

    uploadDate: z.date().describe('上传时间，图片上传的时间戳'),

    filename: z.string().describe('文件名，图片的原始文件名'),

    contentType: z.string().describe('内容类型，图片的MIME类型'),

    metadata: ZodDatasetImageMetadataSchema.describe(
      '元数据对象，包含团队、数据集、集合信息和过期时间'
    )
  })
  .describe('数据集图片文件数据模型');
