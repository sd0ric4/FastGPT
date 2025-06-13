import { z } from 'zod';
import { ChatSourceEnum } from '../chat/constants';

// ==================== Collection Name ====================
/**
 * Chat 集合名称，对应 MongoDB 集合
 */
export const CHAT_COLLECTION_NAME = 'chat' as const;

// ==================== Zod Schema Definitions ====================

/**
 * 变量项 Zod Schema
 */
export const ZodVariableItemSchema = z
  .object({
    id: z.string().describe('变量ID'),
    key: z.string().describe('变量键名'),
    label: z.string().describe('变量标签'),
    type: z.string().describe('变量类型'),
    required: z.boolean().optional().describe('是否必需'),
    maxLen: z.number().optional().describe('最大长度'),
    enums: z.array(z.any()).optional().describe('枚举值')
  })
  .describe('聊天变量项对象');

/**
 * Chat Zod Schema，对应 MongoDB ChatSchema
 * Collection: chat
 */
//FastGPT/packages/service/core/chat/chatSchema.ts
export const ZodChatSchema = z
  .object({
    _id: z.string().optional().describe('聊天的唯一标识符'),

    chatId: z.string().describe('聊天ID，标识特定的聊天会话'),

    userId: z.string().optional().describe('用户ID，标识聊天的用户'),

    teamId: z.string().describe('团队ID，标识聊天所属的团队'),

    tmbId: z.string().describe('团队成员ID，标识聊天的创建者或负责人'),

    appId: z.string().describe('应用ID，标识聊天所关联的应用'),

    createTime: z
      .date()
      .default(() => new Date())
      .describe('创建时间，聊天创建的时间戳'),

    updateTime: z
      .date()
      .default(() => new Date())
      .describe('更新时间，聊天最后更新的时间戳'),

    title: z.string().default('历史记录').describe('聊天标题，默认为"历史记录"'),

    customTitle: z.string().default('').describe('自定义标题，用户设置的个性化标题'),

    top: z.boolean().default(false).describe('是否置顶，控制聊天在列表中的显示位置'),

    source: z
      .nativeEnum(ChatSourceEnum)
      .describe('聊天来源，test/online/share/api/cronJob/team/feishu/official_account/wecom/mcp'),

    sourceName: z.string().optional().describe('来源名称，聊天来源的具体名称'),

    shareId: z.string().optional().describe('分享ID，用于分享链接的标识'),

    outLinkUid: z.string().optional().describe('外链用户ID，外部链接访问的用户标识'),

    variableList: z
      .array(ZodVariableItemSchema)
      .optional()
      .describe('变量列表，聊天中可用的变量定义'),

    welcomeText: z.string().optional().describe('欢迎文本，聊天开始时的欢迎消息'),

    variables: z.record(z.any()).default({}).describe('变量值对象，存储变量的实际值'),

    pluginInputs: z.array(z.any()).optional().describe('插件输入列表，插件相关的输入配置'),

    metadata: z.record(z.any()).default({}).describe('元数据对象，用于特殊存储需求')
  })
  .describe('聊天会话数据模型');
