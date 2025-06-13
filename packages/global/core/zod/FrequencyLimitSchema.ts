import { z } from 'zod';

// ==================== Collection Name ====================
/**
 * FrequencyLimit 集合名称，对应 MongoDB 集合
 */
export const FREQUENCY_LIMIT_COLLECTION_NAME = 'frequency_limit' as const;

// ==================== Zod Schema Definitions ====================

/**
 * FrequencyLimit Zod Schema，对应 MongoDB FrequencyLimitSchema
 * Collection: frequency_limit
 */
//FastGPT/packages/service/common/system/frequencyLimit/schema.ts
export const ZodFrequencyLimitSchema = z
  .object({
    _id: z.string().optional().describe('频率限制记录的唯一标识符'),

    eventId: z.string().describe('事件ID，标识需要进行频率限制的事件'),

    amount: z.number().default(0).describe('当前计数量，记录事件发生的次数'),

    expiredTime: z.date().describe('过期时间，过期后重置计数，支持自动过期删除')
  })
  .describe('频率限制数据模型');
