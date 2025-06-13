import { z } from 'zod';
import { SubTypeEnum, StandardSubLevelEnum } from '../../support/wallet/sub/constants';

// ==================== Collection Name ====================
/**
 * Coupon 集合名称，对应 MongoDB 集合
 */
export const COUPON_COLLECTION_NAME = 'team_sub_coupons' as const;

// ==================== Zod Schema Definitions ====================

/**
 * 团队优惠券订阅 Zod Schema
 */
export const ZodTeamCouponSubSchema = z
  .object({
    type: z.nativeEnum(SubTypeEnum).describe('订阅类型：standard/extraDatasetSize/extraPoints'),
    durationDay: z.number().describe('持续天数'),
    level: z
      .nativeEnum(StandardSubLevelEnum)
      .optional()
      .describe('标准订阅级别：free/experience/team/enterprise/custom'),
    extraDatasetSize: z.number().optional().describe('额外数据集大小'),
    totalPoints: z.number().optional().describe('总积分（额外积分或标准订阅）')
  })
  .describe('团队优惠券订阅配置对象');

/**
 * Coupon Zod Schema，对应 MongoDB CouponSchema
 * Collection: team_sub_coupons
 */
//FastGPT/packages/service/support/wallet/coupon/schema.ts
export const ZodCouponSchema = z
  .object({
    _id: z.string().optional().describe('优惠券的唯一标识符'),

    key: z.string().describe('优惠券密钥，优惠券的唯一标识符'),

    subscriptions: z.array(ZodTeamCouponSubSchema).describe('订阅配置列表，优惠券包含的订阅内容'),

    redeemedAt: z.date().optional().describe('兑换时间，优惠券被兑换的时间戳'),

    expiredAt: z
      .date()
      .default(() => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000))
      .describe('过期时间，默认7天后过期')
  })
  .describe('团队优惠券数据模型');
