import { z } from 'zod';

// ==================== Collection Name ====================
/**
 * OrgMember 集合名称，对应 MongoDB 集合
 */
export const ORG_MEMBER_COLLECTION_NAME = 'team_org_members' as const;

// ==================== Zod Schema Definitions ====================

/**
 * OrgMember Zod Schema，对应 MongoDB OrgMemberSchema
 * Collection: team_org_members
 */
//FastGPT/packages/service/support/permission/org/orgMemberSchema.ts
export const ZodOrgMemberSchema = z
  .object({
    _id: z.string().optional().describe('组织成员关系的唯一标识符'),

    teamId: z.string().describe('团队ID，标识所属的团队'),

    orgId: z.string().describe('组织ID，标识所属的组织'),

    tmbId: z.string().describe('团队成员ID，标识加入组织的团队成员')

    // role 字段已被注释掉，暂不包含在schema中
    // role: z.nativeEnum(OrgMemberRole).default(OrgMemberRole.member).describe('组织内角色')
  })
  .describe('组织成员数据模型');
