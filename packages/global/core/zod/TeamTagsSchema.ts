import { z } from 'zod';

// ==================== Collection Name ====================
/**
 * TeamTags 集合名称，对应 MongoDB 集合
 */
export const TEAM_TAGS_COLLECTION_NAME = 'team_tags' as const;

// ==================== Zod Schema Definitions ====================

/**
 * TeamTags Zod Schema，对应 MongoDB TeamTagSchema
 * Collection: team_tags
 */
//FastGPT/packages/service/support/user/team/teamTagsSchema.ts
export const ZodTeamTagsSchema = z
  .object({
    _id: z.string().optional().describe('团队标签的唯一标识符'),

    teamId: z.string().describe('团队ID，标识标签所属的团队'),

    key: z.string().describe('标签键名，标签的唯一标识符'),

    label: z.string().describe('标签标签，标签的显示名称'),

    createTime: z
      .date()
      .default(() => new Date())
      .describe('创建时间，标签创建的时间戳')
  })
  .describe('团队标签数据模型');
