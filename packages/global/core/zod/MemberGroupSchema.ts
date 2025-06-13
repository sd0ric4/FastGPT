import { z } from 'zod';

// ==================== Collection Name ====================
/**
 * MemberGroup 集合名称，对应 MongoDB 集合
 */
export const MEMBER_GROUP_COLLECTION_NAME = 'team_member_groups' as const;

// ==================== Zod Schema Definitions ====================

/**
 * MemberGroup Zod Schema，对应 MongoDB MemberGroupSchema
 * Collection: team_member_groups
 */
//FastGPT/packages/service/support/permission/memberGroup/memberGroupSchema.ts
export const ZodMemberGroupSchema = z
  .object({
    _id: z.string().optional().describe('成员组的唯一标识符'),

    teamId: z.string().describe('团队ID，标识成员组所属的团队'),

    name: z.string().describe('成员组名称'),

    avatar: z.string().optional().describe('成员组头像'),

    updateTime: z
      .date()
      .default(() => new Date())
      .describe('更新时间，成员组最后更新的时间戳')
  })
  .describe('成员组数据模型');
