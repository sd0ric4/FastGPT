import { z } from 'zod';

// ==================== Collection Name ====================
/**
 * OpenApi 集合名称，对应 MongoDB 集合
 */
export const OPEN_API_COLLECTION_NAME = 'openapi' as const;

// ==================== Zod Schema Definitions ====================

/**
 * OpenApi 限制配置 Zod Schema
 */
export const ZodOpenApiLimitSchema = z
  .object({
    expiredTime: z.date().optional().describe('过期时间，API密钥的有效期'),
    maxUsagePoints: z.number().default(-1).describe('最大使用积分，-1表示无限制')
  })
  .describe('OpenApi限制配置对象');

/**
 * OpenApi Zod Schema，对应 MongoDB OpenApiSchema
 * Collection: openapi
 */
//FastGPT/packages/service/support/openapi/schema.ts
export const ZodOpenApiSchema = z
  .object({
    _id: z.string().optional().describe('OpenApi密钥的唯一标识符'),

    teamId: z.string().describe('团队ID，标识密钥所属的团队'),

    tmbId: z.string().describe('团队成员ID，标识密钥的创建者或负责人'),

    apiKey: z.string().describe('API密钥，用于接口认证'),

    createTime: z
      .date()
      .default(() => new Date())
      .describe('创建时间，密钥创建的时间戳'),

    lastUsedTime: z.date().optional().describe('最后使用时间，密钥最后一次使用的时间戳'),

    appId: z.string().optional().describe('应用ID，关联的应用标识符'),

    name: z.string().default('Api Key').describe('密钥名称，用于标识和管理'),

    usagePoints: z.number().default(0).describe('已使用积分，记录密钥的积分消耗'),

    limit: ZodOpenApiLimitSchema.optional().describe('限制配置，控制密钥的使用限制')
  })
  .describe('OpenApi密钥数据模型');
