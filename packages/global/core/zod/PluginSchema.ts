import { z } from 'zod';
import { PluginTypeEnum } from '../plugin/constants';

// ==================== Collection Name ====================
/**
 * Plugin 集合名称，对应 MongoDB 集合
 */
export const PLUGIN_COLLECTION_NAME = 'plugins' as const;

// ==================== Zod Schema Definitions ====================

/**
 * 插件元数据 Zod Schema
 */
export const ZodPluginMetadataSchema = z
  .object({
    pluginUid: z.string().optional().describe('插件唯一标识符'),
    apiSchemaStr: z.string().optional().describe('API模式字符串'),
    customHeaders: z.string().optional().describe('自定义请求头')
  })
  .describe('插件元数据对象');

/**
 * Plugin Zod Schema，对应 MongoDB PluginSchema
 * Collection: plugins
 */
//FastGPT/packages/service/core/plugin/schema.ts
export const ZodPluginSchema = z
  .object({
    _id: z.string().optional().describe('插件的唯一标识符'),

    parentId: z.string().nullable().optional().describe('父插件ID，用于建立插件的层级关系'),

    teamId: z.string().describe('团队ID，标识插件所属的团队'),

    tmbId: z.string().describe('团队成员ID，标识插件的创建者或负责人'),

    type: z.nativeEnum(PluginTypeEnum).describe('插件类型：folder/custom/http'),

    name: z.string().describe('插件名称'),

    avatar: z.string().default('/icon/logo.svg').describe('插件头像'),

    intro: z.string().default('').describe('插件介绍'),

    updateTime: z
      .date()
      .default(() => new Date())
      .describe('更新时间，插件最后一次修改的时间戳'),

    modules: z.array(z.any()).default([]).describe('模块列表，插件的工作流模块组件'),

    edges: z.array(z.any()).default([]).describe('连接边列表，定义插件模块之间的连接关系'),

    metadata: ZodPluginMetadataSchema.optional().describe('插件元数据'),

    version: z.enum(['v1', 'v2']).optional().describe('插件版本'),

    nodeVersion: z.string().default('').describe('Node.js版本'),

    inited: z.boolean().optional().describe('是否已初始化')
  })
  .describe('插件数据模型');
