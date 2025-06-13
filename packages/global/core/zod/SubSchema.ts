import { z } from 'zod';
import { SubTypeEnum, SubModeEnum, StandardSubLevelEnum } from '../../support/wallet/sub/constants';

// ==================== Collection Name ====================
/**
 * Sub 集合名称，对应 MongoDB 集合
 */
export const SUB_COLLECTION_NAME = 'team_subscriptions' as const;

// ==================== Zod Schema Definitions ====================

/**
 * Sub Zod Schema，对应 MongoDB SubSchema
 * Collection: team_subscriptions
 */
//FastGPT/packages/service/support/wallet/sub/schema.ts
export const ZodSubSchema = z
  .object({
    _id: z.string().optional().describe('订阅计划的唯一标识符'),

    teamId: z.string().describe('团队ID，标识订阅所属的团队'),

    type: z.nativeEnum(SubTypeEnum).describe('订阅类型：standard/extraDatasetSize/extraPoints'),

    startTime: z
      .date()
      .default(() => new Date())
      .describe('开始时间，订阅计划开始的时间戳'),

    expiredTime: z.date().describe('过期时间，订阅计划到期的时间戳'),

    // 标准订阅相关字段
    currentMode: z.nativeEnum(SubModeEnum).optional().describe('当前订阅模式：month/year'),

    nextMode: z.nativeEnum(SubModeEnum).optional().describe('下次订阅模式：month/year'),

    currentSubLevel: z
      .nativeEnum(StandardSubLevelEnum)
      .optional()
      .describe('当前订阅级别：free/experience/team/enterprise/custom'),

    nextSubLevel: z
      .nativeEnum(StandardSubLevelEnum)
      .optional()
      .describe('下次订阅级别：free/experience/team/enterprise/custom'),

    maxTeamMember: z.number().optional().describe('最大团队成员数'),

    maxApp: z.number().optional().describe('最大应用数'),

    maxDataset: z.number().optional().describe('最大数据集数'),

    // 标准订阅和额外积分订阅的总积分
    totalPoints: z.number().optional().describe('总积分，计划包含的积分总数'),

    surplusPoints: z.number().optional().describe('剩余积分，计划剩余的可用积分'),

    // 额外数据集大小
    currentExtraDatasetSize: z.number().optional().describe('当前额外数据集大小')
  })
  .describe('团队订阅计划数据模型');
