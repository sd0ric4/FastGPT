import { z } from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';

// ==================== Collection Name ====================
/**
 * AppTemplate 集合名称，对应 MongoDB 集合
 */
export const APP_TEMPLATE_COLLECTION_NAME = 'app_templates' as const;

// ==================== Zod Schema Definitions ====================

/**
 * 用户指南 Zod Schema
 */
export const ZodUserGuideSchema = z
  .object({
    type: z.enum(['markdown', 'link']).describe('指南类型，markdown文档或链接'),
    content: z.string().optional().describe('markdown内容'),
    link: z.string().optional().describe('链接地址')
  })
  .describe('用户指南对象');

/**
 * AppTemplate Zod Schema，对应 MongoDB AppTemplateSchema
 * Collection: app_templates
 */
//FastGPT/packages/service/core/app/templates/templateSchema.ts
export const ZodAppTemplateSchema = z
  .object({
    _id: z.string().optional().describe('应用模板的唯一标识符'),

    templateId: z.string().describe('模板ID，标识特定的应用模板'),

    name: z.string().optional().describe('模板名称'),

    intro: z.string().optional().describe('模板介绍'),

    avatar: z.string().optional().describe('模板头像'),

    author: z.string().optional().describe('模板作者'),

    tags: z.array(z.string()).optional().describe('模板标签列表，用于分类和搜索'),

    type: z.string().optional().describe('模板类型'),

    isActive: z.boolean().optional().describe('是否激活，控制模板的可用状态'),

    userGuide: ZodUserGuideSchema.optional().describe('用户指南，提供模板使用说明'),

    isQuickTemplate: z.boolean().optional().describe('是否为快速模板'),

    order: z.number().default(-1).describe('排序顺序，用于控制模板的显示顺序'),

    workflow: z.record(z.any()).optional().describe('工作流配置对象')
  })
  .describe('应用模板数据模型');

export const jsonZodAppTemplateSchema = zodToJsonSchema(ZodAppTemplateSchema);
