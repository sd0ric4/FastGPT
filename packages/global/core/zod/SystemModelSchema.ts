import { z } from 'zod';

// ==================== Collection Name ====================
/**
 * SystemModel 集合名称，对应 MongoDB 集合
 */
export const SYSTEM_MODEL_COLLECTION_NAME = 'system_models' as const;

// ==================== Zod Schema Definitions ====================

/**
 * SystemModel Zod Schema，对应 MongoDB SystemModelSchema
 * Collection: system_models
 */
//FastGPT/packages/service/core/ai/config/schema.ts
export const ZodSystemModelSchema = z
  .object({
    _id: z.string().optional().describe('系统模型的唯一标识符'),

    model: z.string().describe('模型名称，系统中唯一的模型标识'),

    metadata: z.record(z.any()).default({}).describe('模型元数据对象，包含模型配置信息')
  })
  .describe('系统AI模型配置数据模型');
