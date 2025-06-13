import { z } from 'zod';
import { UserStatusEnum } from '../../support/user/constant';

// ==================== Collection Name ====================
/**
 * User 集合名称，对应 MongoDB 集合
 */
export const USER_COLLECTION_NAME = 'users' as const;

// ==================== Zod Schema Definitions ====================

/**
 * OpenAI 账户配置 Zod Schema
 */
export const ZodOpenAIAccountSchema = z
  .object({
    key: z.string().optional().describe('OpenAI API密钥'),
    baseUrl: z.string().optional().describe('OpenAI API基础URL')
  })
  .describe('OpenAI账户配置对象');

/**
 * FastGPT SEM 配置 Zod Schema
 */
export const ZodFastGPTSemSchema = z
  .object({
    keyword: z.string().optional().describe('SEM关键词')
  })
  .describe('FastGPT SEM配置对象');

/**
 * User Zod Schema，对应 MongoDB UserSchema
 * Collection: users
 */
//FastGPT/packages/service/support/user/schema.ts
export const ZodUserSchema = z
  .object({
    _id: z.string().optional().describe('用户的唯一标识符'),

    status: z
      .nativeEnum(UserStatusEnum)
      .default(UserStatusEnum.active)
      .describe('用户状态：active/forbidden'),

    username: z.string().describe('用户名，可以是手机或邮箱，具有唯一性'),

    phonePrefix: z.number().optional().describe('手机号前缀'),

    password: z.string().describe('密码，经过哈希处理'),

    passwordUpdateTime: z.date().optional().describe('密码更新时间'),

    createTime: z
      .date()
      .default(() => new Date())
      .describe('创建时间，用户注册的时间戳'),

    promotionRate: z.number().default(0).describe('推广费率，推广返佣比例'),

    openaiAccount: ZodOpenAIAccountSchema.optional().describe('OpenAI账户配置'),

    timezone: z.string().default('Asia/Shanghai').describe('时区设置'),

    lastLoginTmbId: z.string().optional().describe('最后登录的团队成员ID'),

    inviterId: z.string().optional().describe('邀请人用户ID，记录谁邀请注册的'),

    fastgpt_sem: ZodFastGPTSemSchema.optional().describe('FastGPT SEM配置'),

    sourceDomain: z.string().optional().describe('来源域名'),

    contact: z.string().optional().describe('联系方式'),

    // 已废弃字段
    avatar: z.string().optional().describe('用户头像（已废弃）')
  })
  .describe('用户数据模型');
