import { z } from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';

// ==================== Collection Name ====================
/**
 * AppVersion 集合名称，对应 MongoDB 集合
 */
export const APP_VERSION_COLLECTION_NAME = 'app_versions' as const;

// ==================== Zod Schema Definitions ====================

/**
 * 聊天配置 Zod Schema（复用 App 的 chatConfig 结构）
 */
export const ZodAppVersionChatConfigSchema = z
  .object({
    welcomeText: z.string().optional().describe('欢迎文本'),
    variables: z.array(z.any()).optional().describe('聊天变量列表'),
    questionGuide: z.record(z.any()).optional().describe('问题引导配置'),
    ttsConfig: z.record(z.any()).optional().describe('文本转语音配置'),
    whisperConfig: z.record(z.any()).optional().describe('语音识别配置'),
    scheduledTriggerConfig: z.record(z.any()).optional().describe('定时触发配置'),
    chatInputGuide: z.record(z.any()).optional().describe('聊天输入引导配置'),
    fileSelectConfig: z.record(z.any()).optional().describe('文件选择配置'),
    instruction: z.string().optional().describe('聊天指令'),
    autoExecute: z.record(z.any()).optional().describe('自动执行配置')
  })
  .optional()
  .describe('应用版本聊天配置对象');

/**
 * AppVersion Zod Schema，对应 MongoDB AppVersionSchema
 * Collection: app_versions
 */
//FastGPT/packages/service/core/app/version/schema.ts
export const ZodAppVersionSchema = z
  .object({
    _id: z.string().optional().describe('应用版本的唯一标识符'),

    tmbId: z.string().describe('团队成员ID，标识版本的创建者'),

    appId: z.string().describe('应用ID，关联的应用标识符'),

    time: z
      .date()
      .default(() => new Date())
      .describe('创建时间，版本创建的时间戳'),

    nodes: z.array(z.any()).default([]).describe('节点列表，版本的工作流模块组件'),

    edges: z.array(z.any()).default([]).describe('连接边列表，版本的工作流模块连接关系'),

    chatConfig: ZodAppVersionChatConfigSchema.describe('聊天配置，版本的聊天相关配置'),

    isPublish: z.boolean().optional().describe('是否发布，标识版本的发布状态'),

    versionName: z.string().optional().describe('版本名称，版本的显示名称')
  })
  .describe('应用版本数据模型');

export const jsonZodAppVersionSchema = zodToJsonSchema(ZodAppVersionSchema);
