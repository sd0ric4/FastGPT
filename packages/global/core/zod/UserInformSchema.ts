import { z } from 'zod';
import { InformLevelEnum } from '../../support/user/inform/constants';

// ==================== Collection Name ====================
/**
 * UserInform 集合名称，对应 MongoDB 集合
 */
export const USER_INFORM_COLLECTION_NAME = 'inform' as const;

// ==================== Zod Schema Definitions ====================

/**
 * UserInform Zod Schema，对应 MongoDB InformSchema
 * Collection: inform
 */
//projects/app/src/service/support/user/inform/schema.ts
export const ZodUserInformSchema = z
  .object({
    _id: z.string().optional().describe('用户通知的唯一标识符'),

    userId: z.string().describe('用户ID，标识通知的接收用户'),

    teamId: z.string().optional().describe('团队ID，标识通知相关的团队'),

    time: z
      .date()
      .default(() => new Date())
      .describe('时间，通知创建的时间戳'),

    level: z
      .nativeEnum(InformLevelEnum)
      .default(InformLevelEnum.common)
      .describe('通知级别：common/important/emergency'),

    title: z.string().describe('通知标题'),

    content: z.string().describe('通知内容'),

    read: z.boolean().default(false).describe('是否已读，默认为未读')
  })
  .describe('用户通知数据模型');
