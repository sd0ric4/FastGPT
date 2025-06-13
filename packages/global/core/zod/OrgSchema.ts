import { z } from 'zod';

// ==================== Collection Name ====================
/**
 * Org 集合名称，对应 MongoDB 集合
 */
export const ORG_COLLECTION_NAME = 'orgs' as const;

// ==================== Zod Schema Definitions ====================

/**
 * Org Zod Schema，对应 MongoDB OrgSchema
 * Collection: orgs
 */
//FastGPT/packages/service/support/permission/org/orgSchema.ts
export const ZodOrgSchema = z
  .object({
    _id: z.string().optional().describe('组织的唯一标识符'),

    teamId: z.string().describe('团队ID，标识组织所属的团队'),

    pathId: z.string().describe('路径ID，用于路径标识的唯一标识符，默认生成nanoid'),

    path: z.string().describe('组织路径，用于表示组织的层级结构'),

    name: z.string().describe('组织名称'),

    avatar: z.string().optional().describe('组织头像'),

    description: z.string().optional().describe('组织描述'),

    updateTime: z
      .date()
      .default(() => new Date())
      .describe('更新时间，组织最后更新的时间戳')
  })
  .describe('组织数据模型');
