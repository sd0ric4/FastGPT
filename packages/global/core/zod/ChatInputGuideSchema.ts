import { z } from 'zod';

// ==================== Collection Name ====================
/**
 * ChatInputGuide 集合名称，对应 MongoDB 集合
 */
export const CHAT_INPUT_GUIDE_COLLECTION_NAME = 'chat_input_guides' as const;

// ==================== Zod Schema Definitions ====================

/**
 * ChatInputGuide Zod Schema，对应 MongoDB ChatInputGuideSchema
 * Collection: chat_input_guides
 */
//FastGPT/packages/service/core/chat/inputGuide/schema.ts
export const ZodChatInputGuideSchema = z
  .object({
    _id: z.string().optional().describe('聊天输入引导的唯一标识符'),

    appId: z.string().describe('应用ID，标识输入引导所属的应用'),

    text: z.string().default('').describe('引导文本，聊天输入的提示或引导内容')
  })
  .describe('聊天输入引导数据模型');
