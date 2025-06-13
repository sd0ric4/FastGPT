import { z } from 'zod';

// ==================== Collection Name ====================
/**
 * Image 集合名称，对应 MongoDB 集合
 */
export const IMAGE_COLLECTION_NAME = 'image' as const;

// ==================== Zod Schema Definitions ====================

/**
 * Image Zod Schema，对应 MongoDB ImageSchema
 * Collection: image
 */
//FastGPT/packages/service/common/file/image/schema.ts
export const ZodImageSchema = z
  .object({
    _id: z.string().optional().describe('图片的唯一标识符'),

    teamId: z.string().describe('团队ID，标识图片所属的团队'),

    createTime: z
      .date()
      .default(() => new Date())
      .describe('创建时间，图片上传的时间戳'),

    expiredTime: z.date().optional().describe('过期时间，图片的有效期限（60分钟后自动过期）'),

    binary: z.instanceof(Buffer).describe('图片二进制数据'),

    metadata: z
      .object({
        mime: z.string().optional().describe('图片MIME类型'),
        relatedId: z.string().optional().describe('关联ID，用于关联一组图片')
      })
      .optional()
      .describe('图片元数据对象')
  })
  .describe('图片文件数据模型');
