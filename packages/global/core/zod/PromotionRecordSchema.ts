import { z } from 'zod';

// ==================== Collection Name ====================
/**
 * PromotionRecord 集合名称，对应 MongoDB 集合
 */
export const PROMOTION_RECORD_COLLECTION_NAME = 'promotionRecord' as const;

// ==================== Zod Schema Definitions ====================

/**
 * PromotionRecord Zod Schema，对应 MongoDB PromotionRecordSchema
 * Collection: promotionRecord
 */
//FastGPT/packages/service/support/activity/promotion/schema.ts
export const ZodPromotionRecordSchema = z
  .object({
    _id: z.string().optional().describe('推广记录的唯一标识符'),

    userId: z.string().describe('收益人用户ID，获得推广收益的用户'),

    objUId: z
      .string()
      .optional()
      .describe('目标对象用户ID，推广的目标用户（如果是withdraw则为空）'),

    createTime: z
      .date()
      .default(() => new Date())
      .describe('记录时间，推广记录创建的时间戳'),

    type: z.enum(['pay', 'register']).describe('推广类型：pay-付费推广，register-注册推广'),

    amount: z.number().describe('推广金额，按 PRICE_SCALE 倍数计算')
  })
  .describe('推广记录数据模型');
