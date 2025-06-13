import { z } from 'zod';

// ==================== Collection Name ====================
/**
 * PluginGroup 集合名称，对应 MongoDB 集合
 */
export const PLUGIN_GROUP_COLLECTION_NAME = 'app_plugin_groups' as const;

// ==================== Zod Schema Definitions ====================

/**
 * 插件组类型 Zod Schema
 */
export const ZodGroupTypeSchema = z
  .object({
    typeName: z.string().describe('类型名称'),
    typeId: z.string().describe('类型ID标识符')
  })
  .describe('插件组类型对象');

/**
 * PluginGroup Zod Schema，对应 MongoDB PluginGroupSchema
 * Collection: app_plugin_groups
 */
//FastGPT/packages/service/core/app/plugin/pluginGroupSchema.ts
export const ZodPluginGroupSchema = z
  .object({
    _id: z.string().optional().describe('插件组的唯一标识符'),

    groupId: z.string().describe('组ID，唯一标识一个插件组'),

    groupAvatar: z.string().default('').describe('组头像，插件组的图标路径'),

    groupName: z.string().describe('组名称，插件组的显示名称'),

    groupTypes: z
      .array(ZodGroupTypeSchema)
      .default([])
      .describe('组类型列表，定义插件组支持的类型'),

    groupOrder: z.number().default(0).describe('组排序，用于控制插件组的显示顺序')
  })
  .describe('插件组数据模型');
