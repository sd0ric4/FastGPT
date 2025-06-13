import { z } from 'zod';
import {
  DatasetTypeEnum,
  ChunkSettingModeEnum,
  ChunkTriggerConfigTypeEnum,
  DataChunkSplitModeEnum,
  DatasetCollectionDataProcessModeEnum,
  ParagraphChunkAIModeEnum
} from '../dataset/constants';

// ==================== Collection Name ====================
/**
 * Dataset 集合名称，对应 MongoDB 集合
 */
export const DATASET_COLLECTION_NAME = 'datasets' as const;

// ==================== Zod Schema Definitions ====================

/**
 * 网站配置 Zod Schema
 */
export const ZodWebsiteConfigSchema = z
  .object({
    url: z.string().describe('网站URL'),
    selector: z.string().default('body').describe('CSS选择器，默认为body')
  })
  .describe('网站配置对象');

/**
 * 数据块设置 Zod Schema
 */
export const ZodChunkSettingsSchema = z
  .object({
    trainingType: z
      .nativeEnum(DatasetCollectionDataProcessModeEnum)
      .optional()
      .describe('训练类型'),
    chunkTriggerType: z
      .nativeEnum(ChunkTriggerConfigTypeEnum)
      .optional()
      .describe('数据块触发类型'),
    chunkTriggerMinSize: z.number().optional().describe('数据块触发最小大小'),
    dataEnhanceCollectionName: z.boolean().optional().describe('是否增强集合名称'),
    imageIndex: z.boolean().optional().describe('是否开启图片索引'),
    autoIndexes: z.boolean().optional().describe('是否自动索引'),
    chunkSettingMode: z.nativeEnum(ChunkSettingModeEnum).optional().describe('数据块设置模式'),
    chunkSplitMode: z.nativeEnum(DataChunkSplitModeEnum).optional().describe('数据块分割模式'),
    paragraphChunkAIMode: z
      .nativeEnum(ParagraphChunkAIModeEnum)
      .optional()
      .describe('段落块AI模式'),
    paragraphChunkDeep: z.number().optional().describe('段落块深度'),
    paragraphChunkMinSize: z.number().optional().describe('段落块最小大小'),
    chunkSize: z.number().optional().describe('数据块大小'),
    chunkSplitter: z.string().optional().describe('数据块分割器'),
    indexSize: z.number().optional().describe('索引大小'),
    qaPrompt: z.string().optional().describe('问答提示词')
  })
  .describe('数据块设置对象');

/**
 * Dataset Zod Schema，对应 MongoDB DatasetSchema
 * Collection: datasets
 */
//FastGPT/packages/service/core/dataset/schema.ts
export const ZodDatasetSchema = z
  .object({
    _id: z.string().optional().describe('数据集的唯一标识符'),

    parentId: z.string().nullable().optional().describe('父数据集ID，用于建立数据集的层级关系'),

    userId: z.string().optional().describe('用户ID（已废弃）'),

    teamId: z.string().describe('团队ID，标识数据集所属的团队'),

    tmbId: z.string().describe('团队成员ID，标识数据集的创建者或负责人'),

    type: z.nativeEnum(DatasetTypeEnum).default(DatasetTypeEnum.dataset).describe('数据集类型'),

    avatar: z.string().default('/icon/logo.svg').describe('数据集头像'),

    name: z.string().describe('数据集名称'),

    updateTime: z
      .date()
      .default(() => new Date())
      .describe('更新时间，数据集最后一次修改的时间戳'),

    vectorModel: z.string().default('text-embedding-3-small').describe('向量模型'),

    agentModel: z.string().default('gpt-4o-mini').describe('智能体模型'),

    vlmModel: z.string().optional().describe('视觉语言模型'),

    intro: z.string().default('').describe('数据集介绍'),

    websiteConfig: ZodWebsiteConfigSchema.optional().describe('网站配置'),

    chunkSettings: ZodChunkSettingsSchema.optional().describe('数据块设置'),

    inheritPermission: z.boolean().default(true).describe('继承权限'),

    apiDatasetServer: z.record(z.any()).optional().describe('API数据集服务器配置'),

    // 已废弃字段
    autoSync: z.boolean().optional().describe('自动同步（已废弃）'),
    externalReadUrl: z.string().optional().describe('外部读取URL（已废弃）'),
    defaultPermission: z.number().optional().describe('默认权限（已废弃）'),
    apiServer: z.record(z.any()).optional().describe('API服务器（已废弃）'),
    feishuServer: z.record(z.any()).optional().describe('飞书服务器（已废弃）'),
    yuqueServer: z.record(z.any()).optional().describe('语雀服务器（已废弃）')
  })
  .describe('数据集数据模型');
