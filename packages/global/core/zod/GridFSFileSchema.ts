import { z } from 'zod';

// ==================== Collection Names ====================
/**
 * Dataset 文件集合名称，对应 MongoDB GridFS 集合
 */
export const DATASET_FILE_COLLECTION_NAME = 'dataset.files' as const;

/**
 * Chat 文件集合名称，对应 MongoDB GridFS 集合
 */
export const CHAT_FILE_COLLECTION_NAME = 'chat.files' as const;

// ==================== Zod Schema Definitions ====================

/**
 * Dataset 文件 Zod Schema，对应 MongoDB DatasetFileSchema
 * Collection: dataset.files
 */
//FastGPT/packages/service/common/file/gridfs/schema.ts
export const ZodDatasetFileSchema = z
  .object({
    _id: z.string().optional().describe('文件的唯一标识符'),

    metadata: z.record(z.any()).describe('文件元数据对象'),

    uploadDate: z.date().optional().describe('文件上传时间')
  })
  .describe('数据集文件数据模型');

/**
 * Chat 文件 Zod Schema，对应 MongoDB ChatFileSchema
 * Collection: chat.files
 */
//FastGPT/packages/service/common/file/gridfs/schema.ts
export const ZodChatFileSchema = z
  .object({
    _id: z.string().optional().describe('文件的唯一标识符'),

    metadata: z.record(z.any()).describe('聊天文件元数据对象'),

    uploadDate: z.date().optional().describe('文件上传时间')
  })
  .describe('聊天文件数据模型');
