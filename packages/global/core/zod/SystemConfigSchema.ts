import { z } from 'zod';
import { SystemConfigsTypeEnum } from '../../common/system/config/constants';

// ==================== Collection Name ====================
/**
 * SystemConfig 集合名称，对应 MongoDB 集合
 */
export const SYSTEM_CONFIG_COLLECTION_NAME = 'systemConfigs' as const;

// ==================== Zod Schema Definitions ====================

/**
 * SystemConfig Zod Schema，对应 MongoDB systemConfigSchema
 * Collection: systemConfigs
 */
//FastGPT/packages/service/common/system/config/schema.ts
export const ZodSystemConfigSchema = z
  .object({
    _id: z.string().optional().describe('系统配置的唯一标识符'),

    type: z
      .nativeEnum(SystemConfigsTypeEnum)
      .describe('配置类型，枚举值包括fastgpt、fastgptPro、systemMsgModal、license'),

    value: z.record(z.any()).describe('配置值对象，存储具体的配置内容'),

    createTime: z
      .date()
      .default(() => new Date())
      .describe('创建时间，配置项创建的时间戳')
  })
  .describe('系统配置数据模型');
