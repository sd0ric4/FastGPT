import { z } from 'zod';

// ==================== Collection Name ====================
/**
 * TemplateType 集合名称，对应 MongoDB 集合
 */
export const TEMPLATE_TYPE_COLLECTION_NAME = 'app_template_types' as const;

// ==================== Zod Schema Definitions ====================

/**
 * TemplateType Zod Schema，对应 MongoDB TemplateTypeSchema
 * Collection: app_template_types
 */
//FastGPT/packages/service/core/app/templates/templateTypeSchema.ts
export const ZodTemplateTypeSchema = z
  .object({
    _id: z.string().optional().describe('模板类型的唯一标识符'),

    typeName: z.string().describe('类型名称，模板类型的显示名称'),

    typeId: z.string().describe('类型ID，模板类型的唯一标识符'),

    typeOrder: z.number().default(0).describe('类型排序，用于控制模板类型的显示顺序')
  })
  .describe('模板类型数据模型');
