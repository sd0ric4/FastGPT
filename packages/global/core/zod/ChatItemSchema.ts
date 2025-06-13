import { z } from 'zod';
import { ChatRoleEnum } from '../chat/constants';

// ==================== Collection Name ====================
/**
 * ChatItem 集合名称，对应 MongoDB 集合
 */
export const CHAT_ITEM_COLLECTION_NAME = 'chatitems' as const;

// ==================== Zod Schema Definitions ====================

/**
 * 管理员反馈 Zod Schema
 */
export const ZodAdminFeedbackSchema = z
  .object({
    datasetId: z.string().optional().describe('数据集ID'),
    collectionId: z.string().optional().describe('集合ID'),
    dataId: z.string().optional().describe('数据ID'),
    q: z.string().optional().describe('问题内容'),
    a: z.string().optional().describe('答案内容')
  })
  .describe('管理员反馈对象');

/**
 * ChatItem Zod Schema，对应 MongoDB ChatItemSchema
 * Collection: chatitems
 */
//FastGPT/packages/service/core/chat/chatItemSchema.ts
export const ZodChatItemSchema = z
  .object({
    _id: z.string().optional().describe('聊天项的唯一标识符'),

    teamId: z.string().describe('团队ID，标识聊天所属的团队'),

    tmbId: z.string().describe('团队成员ID，标识聊天的创建者或负责人'),

    userId: z.string().optional().describe('用户ID，标识聊天的用户'),

    chatId: z.string().describe('聊天ID，标识特定的聊天会话'),

    dataId: z.string().describe('数据ID，聊天项的唯一标识符，默认生成22位nanoid'),

    appId: z.string().describe('应用ID，标识聊天所关联的应用'),

    time: z
      .date()
      .default(() => new Date())
      .describe('创建时间，聊天项创建的时间戳'),

    hideInUI: z.boolean().default(false).describe('是否在UI中隐藏'),

    obj: z.nativeEnum(ChatRoleEnum).describe('聊天角色，System/Human/AI'),

    value: z.array(z.any()).default([]).describe('聊天内容数组，存储聊天的具体内容'),

    errorMsg: z.string().optional().describe('错误消息，记录聊天过程中的错误'),

    userGoodFeedback: z.string().optional().describe('用户好评反馈'),

    userBadFeedback: z.string().optional().describe('用户差评反馈'),

    customFeedbacks: z.array(z.string()).optional().describe('自定义反馈列表'),

    adminFeedback: ZodAdminFeedbackSchema.optional().describe('管理员反馈对象'),

    responseData: z.array(z.any()).default([]).describe('节点响应数据列表'),

    durationSeconds: z.number().optional().describe('处理耗时，单位秒')
  })
  .describe('聊天项数据模型');
