import { AppTypeEnum } from 'core/app/constants';
import { z } from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';

// ==================== Collection Name ====================
/**
 * App 集合名称，对应 MongoDB 集合
 */
export const APP_COLLECTION_NAME = 'apps' as const;

// ==================== Zod Schema Definitions ====================

/**
 * 应用Zod Schema，对应 MongoDB AppSchema
 * Collection: apps
 */
//FastGPT/packages/service/core/app/schema.ts
export const ZodAppSchema = z
  .object({
    _id: z.string().optional().describe('应用的唯一标识符'),

    parentId: z.string().nullable().optional().describe('父应用ID，用于建立应用的层级关系'),

    teamId: z.string().describe('团队ID，标识应用所属的团队'),

    tmbId: z.string().describe('团队成员ID，标识应用的创建者或负责人'),

    name: z.string().describe('应用名称，用于标识和显示应用'),

    type: z
      .nativeEnum(AppTypeEnum)
      .default(AppTypeEnum.workflow)
      .describe('应用类型，默认为工作流类型'),

    version: z.enum(['v1', 'v2']).optional().describe('应用版本，可选的版本标识'),

    avatar: z.string().default('/icon/logo.svg').describe('应用头像，应用的图标或头像图片路径'),

    intro: z.string().default('').describe('应用介绍，应用的详细描述和说明'),

    updateTime: z
      .date()
      .default(() => new Date())
      .describe('更新时间，应用最后一次修改的时间戳'),

    teamTags: z.array(z.string()).optional().describe('团队标签，用于应用分类和权限管理的标签列表'),

    modules: z.array(z.any()).default([]).describe('模块列表，工作流中的功能模块组件'),

    edges: z.array(z.any()).default([]).describe('连接边列表，定义工作流模块之间的连接关系'),

    chatConfig: z
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
      .describe('聊天配置对象'),

    pluginData: z
      .object({
        nodeVersion: z.string().optional().describe('Node.js版本'),
        pluginUniId: z.string().optional().describe('插件唯一标识符'),
        apiSchemaStr: z.string().optional().describe('API模式字符串'),
        customHeaders: z.string().optional().describe('自定义请求头')
      })
      .optional()
      .describe('插件配置数据'),

    scheduledTriggerConfig: z
      .object({
        cronString: z.string().optional().describe('Cron表达式'),
        timezone: z.string().optional().describe('时区设置'),
        defaultPrompt: z.string().optional().describe('默认提示词')
      })
      .optional()
      .describe('定时触发配置'),

    scheduledTriggerNextTime: z.date().optional().describe('下次定时触发时间'),

    inited: z.boolean().optional().describe('初始化状态'),

    inheritPermission: z.boolean().default(true).describe('继承权限'),

    defaultPermission: z.number().optional().describe('默认权限（已废弃）')
  })
  .describe('FastGPT应用数据模型');

export const jsonZodAppSchema = zodToJsonSchema(ZodAppSchema, 'ZodAppSchema');
