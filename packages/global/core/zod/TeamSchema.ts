import { z } from 'zod';

// ==================== Collection Name ====================
/**
 * Team 集合名称，对应 MongoDB 集合
 */
export const TEAM_COLLECTION_NAME = 'teams' as const;

// ==================== Zod Schema Definitions ====================

/**
 * 团队限制配置 Zod Schema
 */
export const ZodTeamLimitSchema = z
  .object({
    lastExportDatasetTime: z.date().optional().describe('最后导出数据集时间'),
    lastWebsiteSyncTime: z.date().optional().describe('最后网站同步时间')
  })
  .describe('团队限制配置对象');

/**
 * Laf 账户配置 Zod Schema
 */
export const ZodLafAccountSchema = z
  .object({
    token: z.string().optional().describe('Laf令牌'),
    appid: z.string().optional().describe('Laf应用ID'),
    pat: z.string().optional().describe('Laf个人访问令牌')
  })
  .describe('Laf账户配置对象');

/**
 * OpenAI 账户配置 Zod Schema
 */
export const ZodTeamOpenAIAccountSchema = z
  .object({
    key: z.string().optional().describe('OpenAI API密钥'),
    baseUrl: z.string().optional().describe('OpenAI API基础URL')
  })
  .describe('团队OpenAI账户配置对象');

/**
 * Team Zod Schema，对应 MongoDB TeamSchema
 * Collection: teams
 */
//FastGPT/packages/service/support/user/team/teamSchema.ts
export const ZodTeamSchema = z
  .object({
    _id: z.string().optional().describe('团队的唯一标识符'),

    name: z.string().describe('团队名称'),

    ownerId: z.string().optional().describe('团队所有者用户ID'),

    avatar: z.string().default('/icon/logo.svg').describe('团队头像'),

    createTime: z
      .date()
      .default(() => new Date())
      .describe('创建时间，团队创建的时间戳'),

    balance: z.number().optional().describe('团队余额'),

    teamDomain: z.string().optional().describe('团队域名'),

    limit: ZodTeamLimitSchema.optional().describe('团队限制配置'),

    lafAccount: ZodLafAccountSchema.optional().describe('Laf账户配置'),

    openaiAccount: ZodTeamOpenAIAccountSchema.optional().describe('OpenAI账户配置'),

    externalWorkflowVariables: z.record(z.any()).default({}).describe('外部工作流变量'),

    notificationAccount: z.string().optional().describe('通知账户')
  })
  .describe('团队数据模型');
