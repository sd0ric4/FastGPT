import { z } from 'zod';

// ==================== Collection Name ====================
/**
 * InvitationLink 集合名称，对应 MongoDB 集合
 */
export const INVITATION_LINK_COLLECTION_NAME = 'team_invitation_links' as const;

// ==================== Zod Schema Definitions ====================

/**
 * InvitationLink Zod Schema，对应 MongoDB InvitationSchema
 * Collection: team_invitation_links
 */
//projects/app/src/service/support/user/team/invitationLink/schema.ts
export const ZodInvitationLinkSchema = z
  .object({
    _id: z.string().optional().describe('邀请链接的唯一标识符'),

    linkId: z.string().describe('链接ID，邀请链接的唯一标识符，默认生成nanoid'),

    teamId: z.string().describe('团队ID，标识邀请链接所属的团队'),

    usedTimesLimit: z
      .number()
      .default(1)
      .refine((val) => val === 1 || val === -1, {
        message: 'usedTimesLimit must be 1 or -1'
      })
      .describe('使用次数限制：1表示单次使用，-1表示无限制'),

    forbidden: z.boolean().optional().describe('是否被禁用'),

    expires: z.date().optional().describe('过期时间，邀请链接的有效期'),

    description: z.string().optional().describe('邀请链接描述'),

    members: z.array(z.string()).default([]).describe('已通过此链接加入的成员ID列表')
  })
  .describe('团队邀请链接数据模型');
