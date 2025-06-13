import { z } from 'zod';

// ==================== Collection Name ====================
/**
 * RawTextBuffer 集合名称，对应 MongoDB GridFS 集合
 */
export const RAW_TEXT_BUFFER_BUCKET_NAME = 'buffer_rawtext' as const;

// ==================== Zod Schema Definitions ====================

/**
 * RawTextBuffer Zod Schema，对应 MongoDB RawTextBufferSchema
 * GridFS Bucket: buffer_rawtext
 */
//FastGPT/packages/service/common/buffer/rawText/schema.ts
export const ZodRawTextBufferSchema = z
  .object({
    _id: z.string().optional().describe('缓冲区文件的唯一标识符'),

    metadata: z
      .object({
        sourceId: z.string().describe('源ID，标识数据来源'),
        sourceName: z.string().describe('源名称，数据来源的名称'),
        expiredTime: z.date().describe('过期时间，数据的有效期限')
      })
      .describe('元数据对象，包含源信息和过期时间')
  })
  .describe('原始文本缓冲区数据模型');
