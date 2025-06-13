import { z } from 'zod';
import { UserAuthTypeEnum } from '../../support/user/auth/constants';

// ==================== Collection Name ====================
/**
 * UserAuth 集合名称，对应 MongoDB 集合
 */
export const USER_AUTH_COLLECTION_NAME = 'auth_codes' as const;

// ==================== Zod Schema Definitions ====================

/**
 * UserAuth Zod Schema，对应 MongoDB UserAuthSchema
 * Collection: auth_codes
 */
//FastGPT/packages/service/support/user/auth/schema.ts
export const ZodUserAuthSchema = z
  .object({
    _id: z.string().optional().describe('用户认证记录的唯一标识符'),

    key: z.string().describe('认证密钥，如手机号或邮箱'),

    code: z.string().optional().describe('认证码，6位数字验证码'),

    openid: z.string().optional().describe('微信openid，用于微信登录'),

    type: z
      .nativeEnum(UserAuthTypeEnum)
      .describe('认证类型：register/findPassword/wxLogin/bindNotification/captcha/login'),

    createTime: z
      .date()
      .default(() => new Date())
      .describe('创建时间，认证记录创建的时间戳'),

    expiredTime: z
      .date()
      .default(() => new Date(Date.now() + 5 * 60 * 1000))
      .describe('过期时间，默认5分钟后过期')
  })
  .describe('用户认证数据模型');
