import { z } from 'zod';
import { GroupMemberRole } from '../../support/permission/memberGroup/constant';

// ==================== Collection Name ====================
/**
 * GroupMember 集合名称，对应 MongoDB 集合
 */
export const GROUP_MEMBER_COLLECTION_NAME = 'team_group_members' as const;

// ==================== Zod Schema Definitions ====================

/**
 * GroupMember Zod Schema，对应 MongoDB GroupMemberSchema
 * Collection: team_group_members
 */
//FastGPT/packages/service/support/permission/memberGroup/groupMemberSchema.ts
export const ZodGroupMemberSchema = z
  .object({
    _id: z.string().optional().describe('组成员关系的唯一标识符'),

    groupId: z.string().describe('成员组ID，标识所属的成员组'),

    tmbId: z.string().describe('团队成员ID，标识加入组的团队成员'),

    role: z
      .nativeEnum(GroupMemberRole)
      .default(GroupMemberRole.member)
      .describe('组内角色：owner/admin/member')
  })
  .describe('成员组成员数据模型');
