import { z } from 'zod';

// ==================== Collection Name ====================
/**
 * SystemPlugin 集合名称，对应 MongoDB 集合
 */
export const SYSTEM_PLUGIN_COLLECTION_NAME = 'app_system_plugins' as const;

// ==================== Zod Schema Definitions ====================

/**
 * 系统插件自定义配置 Zod Schema
 */
export const ZodSystemPluginCustomConfigSchema = z
  .object({
    name: z.string().describe('插件名称'),
    avatar: z.string().describe('插件头像'),
    intro: z.string().optional().describe('插件介绍'),
    version: z.string().describe('插件版本'),
    weight: z.number().optional().describe('插件权重'),
    workflow: z.record(z.any()).describe('工作流配置'),
    templateType: z.string().describe('模板类型'),
    associatedPluginId: z.string().describe('关联插件ID'),
    userGuide: z.string().describe('用户指南'),
    author: z.string().optional().describe('插件作者')
  })
  .describe('系统插件自定义配置对象');

/**
 * SystemPlugin Zod Schema，对应 MongoDB SystemPluginSchema
 * Collection: app_system_plugins
 */
//FastGPT/packages/service/core/app/plugin/systemPluginSchema.ts
export const ZodSystemPluginSchema = z
  .object({
    _id: z.string().optional().describe('系统插件的唯一标识符'),

    pluginId: z.string().describe('插件ID，标识特定的系统插件'),

    isActive: z.boolean().optional().describe('是否激活，控制插件的启用状态'),

    inputConfig: z.array(z.any()).default([]).describe('输入配置列表，定义插件的输入参数'),

    originCost: z.number().default(0).describe('原始成本，插件的基础费用点数'),

    currentCost: z.number().default(0).describe('当前成本，插件的实际费用点数'),

    hasTokenFee: z.boolean().default(false).describe('是否有Token费用，标识插件是否按Token计费'),

    pluginOrder: z.number().default(0).describe('插件排序，用于控制插件的显示顺序'),

    customConfig:
      ZodSystemPluginCustomConfigSchema.optional().describe('自定义配置，插件的个性化配置信息')
  })
  .describe('系统插件配置数据模型');
