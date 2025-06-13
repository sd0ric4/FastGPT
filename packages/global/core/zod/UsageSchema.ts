import { z } from 'zod';
import { UsageSourceEnum } from '../../support/wallet/usage/constants';

// ==================== Collection Name ====================
/**
 * Usage 集合名称，对应 MongoDB 集合
 */
export const USAGE_COLLECTION_NAME = 'usages' as const;

// ==================== Zod Schema Definitions ====================

/**
 * 使用量列表项计数 Zod Schema
 */
export const ZodUsageListItemCountSchema = z
  .object({
    inputTokens: z.number().optional().describe('输入令牌数'),
    outputTokens: z.number().optional().describe('输出令牌数'),
    charsLength: z.number().optional().describe('字符长度'),
    duration: z.number().optional().describe('持续时间'),
    pages: z.number().optional().describe('页数'),
    // 已废弃字段
    tokens: z.number().optional().describe('令牌数（已废弃）')
  })
  .describe('使用量列表项计数对象');

/**
 * 使用量列表项 Zod Schema
 */
export const ZodUsageListItemSchema = ZodUsageListItemCountSchema.extend({
  moduleName: z.string().describe('模块名称'),
  amount: z.number().describe('费用金额'),
  model: z.string().optional().describe('使用的模型')
}).describe('使用量列表项对象');

/**
 * Usage Zod Schema，对应 MongoDB UsageSchema
 * Collection: usages
 */
//FastGPT/packages/service/support/wallet/usage/schema.ts
export const ZodUsageSchema = z
  .object({
    _id: z.string().optional().describe('使用量记录的唯一标识符'),

    teamId: z.string().describe('团队ID，标识使用量所属的团队'),

    tmbId: z.string().describe('团队成员ID，标识产生使用量的团队成员'),

    source: z
      .nativeEnum(UsageSourceEnum)
      .describe(
        '使用来源：fastgpt/api/shareLink/training/cronJob/share/wecom/feishu/dingtalk/official_account/pdfParse/mcp'
      ),

    appName: z.string().default('').describe('应用名称，使用量的应用名称'),

    appId: z.string().optional().describe('应用ID，关联的应用标识符'),

    pluginId: z.string().optional().describe('插件ID，关联的插件标识符'),

    time: z
      .date()
      .default(() => new Date())
      .describe('时间，使用量产生的时间戳'),

    totalPoints: z.number().describe('总积分，本次使用消耗的总积分'),

    list: z
      .array(ZodUsageListItemSchema)
      .default([])
      .describe('使用量详细列表，包含各个模块的使用详情')
  })
  .describe('使用量记录数据模型');
