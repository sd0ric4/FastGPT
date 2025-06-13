import { z } from 'zod';
import { BillStatusEnum, BillTypeEnum, BillPayWayEnum } from '../../support/wallet/bill/constants';
import { SubModeEnum, StandardSubLevelEnum } from '../../support/wallet/sub/constants';
import zodToJsonSchema from 'zod-to-json-schema';

// ==================== Collection Name ====================
/**
 * Bill 集合名称，对应 MongoDB 集合
 */
export const BILL_COLLECTION_NAME = 'pays' as const;

// ==================== Zod Schema Definitions ====================

/**
 * 账单元数据 Zod Schema
 */
export const ZodBillMetadataSchema = z
  .object({
    payWay: z.nativeEnum(BillPayWayEnum).describe('支付方式：balance/wx/alipay/bank/coupon'),
    subMode: z.nativeEnum(SubModeEnum).optional().describe('订阅模式：month/year'),
    standSubLevel: z
      .nativeEnum(StandardSubLevelEnum)
      .optional()
      .describe('标准订阅级别：free/experience/team/enterprise/custom'),
    month: z.number().optional().describe('订阅月数'),
    datasetSize: z.number().optional().describe('数据集大小'),
    extraPoints: z.number().optional().describe('额外积分')
  })
  .describe('账单元数据对象');

/**
 * 账单退款数据 Zod Schema
 */
export const ZodBillRefundDataSchema = z
  .object({
    amount: z.number().describe('退款金额'),
    refundId: z.string().describe('退款ID'),
    refundTime: z.date().describe('退款时间')
  })
  .describe('账单退款数据对象');

/**
 * Bill Zod Schema，对应 MongoDB BillSchema
 * Collection: pays
 */
//projects/app/src/service/support/wallet/bill/schema.ts
export const ZodBillSchema = z
  .object({
    _id: z.string().optional().describe('账单的唯一标识符'),

    teamId: z.string().describe('团队ID，标识账单所属的团队'),

    tmbId: z.string().describe('团队成员ID，标识创建账单的团队成员'),

    createTime: z
      .date()
      .default(() => new Date())
      .describe('创建时间，账单创建的时间戳'),

    orderId: z.string().describe('订单ID，账单的唯一订单标识符'),

    status: z
      .nativeEnum(BillStatusEnum)
      .default(BillStatusEnum.NOTPAY)
      .describe('账单状态：SUCCESS/REFUND/NOTPAY/CLOSED'),

    type: z
      .nativeEnum(BillTypeEnum)
      .describe('账单类型：balance/standSubPlan/extraDatasetSub/extraPoints'),

    price: z.number().describe('总价格，1 * PRICE_SCALE = 1RMB'),

    hasInvoice: z.boolean().default(false).describe('是否已开发票'),

    metadata: ZodBillMetadataSchema.describe('元数据对象，包含支付方式和订阅信息'),

    refundData: ZodBillRefundDataSchema.optional().describe('退款数据，包含退款相关信息')
  })
  .describe('账单数据模型');

export const jsonZodBillSchema = zodToJsonSchema(ZodBillSchema);
