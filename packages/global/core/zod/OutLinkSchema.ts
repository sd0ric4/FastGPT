import { z } from 'zod';
import { PublishChannelEnum } from '../../support/outLink/constant';

// ==================== Collection Name ====================
/**
 * OutLink 集合名称，对应 MongoDB 集合
 */
export const OUT_LINK_COLLECTION_NAME = 'outlinks' as const;

// ==================== Zod Schema Definitions ====================

/**
 * 外链限制配置 Zod Schema
 */
export const ZodOutLinkLimitSchema = z
  .object({
    maxUsagePoints: z.number().default(-1).describe('最大使用积分，-1表示无限制'),
    expiredTime: z.date().optional().describe('过期时间，外链的有效期'),
    QPM: z.number().default(1000).describe('每分钟问题数限制'),
    hookUrl: z.string().optional().describe('验证消息Hook URL')
  })
  .describe('外链限制配置对象');

/**
 * OutLink Zod Schema，对应 MongoDB OutLinkSchema
 * Collection: outlinks
 */
//FastGPT/packages/service/support/outLink/schema.ts
export const ZodOutLinkSchema = z
  .object({
    _id: z.string().optional().describe('外链的唯一标识符'),

    shareId: z.string().describe('分享ID，外链的唯一标识符'),

    teamId: z.string().describe('团队ID，标识外链所属的团队'),

    tmbId: z.string().describe('团队成员ID，标识外链的创建者或负责人'),

    appId: z.string().describe('应用ID，标识外链关联的应用'),

    type: z
      .nativeEnum(PublishChannelEnum)
      .describe('发布渠道类型：share/iframe/apikey/feishu/dingtalk/wecom/officialAccount'),

    name: z.string().describe('外链名称'),

    usagePoints: z.number().default(0).describe('已使用积分'),

    lastTime: z.date().optional().describe('最后使用时间'),

    responseDetail: z.boolean().default(false).describe('是否返回详细响应内容'),

    showNodeStatus: z.boolean().default(true).describe('是否显示节点状态'),

    showRawSource: z.boolean().optional().describe('是否显示完整引用源'),

    limit: ZodOutLinkLimitSchema.optional().describe('使用限制配置'),

    app: z.record(z.any()).optional().describe('第三方应用配置，如飞书、企微等'),

    immediateResponse: z.string().optional().describe('请求时的即时响应'),

    defaultResponse: z.string().optional().describe('错误或其他情况时的默认响应')
  })
  .describe('外链分享数据模型');
