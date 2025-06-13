import { z } from 'zod';
import { TeamMemberStatusEnum } from '../../support/user/team/constant';

// ==================== Collection Name ====================
/**
 * TeamMember 集合名称，对应 MongoDB 集合
 */
export const TEAM_MEMBER_COLLECTION_NAME = 'team_members' as const;

// ==================== Zod Schema Definitions ====================

/**
 * TeamMember Zod Schema，对应 MongoDB TeamMemberSchema
 * Collection: team_members
 */
//FastGPT/packages/service/support/user/team/teamMemberSchema.ts
export const ZodTeamMemberSchema = z
  .object({
    _id: z.string().optional().describe('团队成员的唯一标识符'),

    teamId: z.string().describe('团队ID，标识成员所属的团队'),

    userId: z.string().describe('用户ID，标识团队成员关联的用户'),

    avatar: z.string().describe('成员头像，默认为随机用户头像'),

    name: z.string().default('Member').describe('成员名称，默认为"Member"'),

    status: z
      .nativeEnum(TeamMemberStatusEnum)
      .optional()
      .describe('成员状态：active/leave/forbidden'),

    createTime: z
      .date()
      .default(() => new Date())
      .describe('创建时间，成员加入团队的时间戳'),

    updateTime: z.date().optional().describe('更新时间，成员信息最后更新的时间戳'),

    // 已废弃字段
    role: z.string().optional().describe('成员角色（已废弃）'),
    defaultTeam: z.boolean().optional().describe('是否默认团队（已废弃）')
  })
  .describe('团队成员数据模型');
