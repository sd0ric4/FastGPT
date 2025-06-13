import { z } from 'zod';
import { DatasetDataIndexTypeEnum } from '../dataset/data/constants';

// ==================== Collection Name ====================
/**
 * DatasetData 集合名称，对应 MongoDB 集合
 */
export const DATASET_DATA_COLLECTION_NAME = 'dataset_datas' as const;

// ==================== Zod Schema Definitions ====================

/**
 * 数据集索引项 Zod Schema
 */
export const ZodDatasetDataIndexItemSchema = z
  .object({
    defaultIndex: z.boolean().optional().describe('是否为默认索引（已废弃）'),
    type: z
      .nativeEnum(DatasetDataIndexTypeEnum)
      .default(DatasetDataIndexTypeEnum.custom)
      .describe('索引类型'),
    dataId: z.string().describe('PG数据ID'),
    text: z.string().describe('索引文本内容')
  })
  .describe('数据集索引项对象');

/**
 * 数据历史记录 Zod Schema
 */
export const ZodDatasetDataHistorySchema = z
  .object({
    q: z.string().optional().describe('历史问题'),
    a: z.string().optional().describe('历史答案'),
    updateTime: z.date().optional().describe('更新时间')
  })
  .describe('数据历史记录对象');

/**
 * DatasetData Zod Schema，对应 MongoDB DatasetDataSchema
 * Collection: dataset_datas
 */
//FastGPT/packages/service/core/dataset/data/schema.ts
export const ZodDatasetDataSchema = z
  .object({
    _id: z.string().optional().describe('数据集数据的唯一标识符'),

    teamId: z.string().describe('团队ID，标识数据所属的团队'),

    tmbId: z.string().describe('团队成员ID，标识数据的创建者或负责人'),

    datasetId: z.string().describe('数据集ID，标识数据所属的数据集'),

    collectionId: z.string().describe('集合ID，标识数据所属的集合'),

    q: z.string().describe('问题或大块文本内容'),

    a: z.string().optional().describe('答案或自定义内容'),

    history: z.array(ZodDatasetDataHistorySchema).optional().describe('历史记录列表'),

    indexes: z.array(ZodDatasetDataIndexItemSchema).default([]).describe('索引列表，用于向量检索'),

    imageId: z.string().optional().describe('图片ID，关联的图片标识'),

    updateTime: z
      .date()
      .default(() => new Date())
      .describe('更新时间，数据最后更新的时间戳'),

    chunkIndex: z.number().default(0).describe('数据块索引，用于排序'),

    rebuilding: z.boolean().optional().describe('是否正在重建'),

    // 已废弃字段
    fullTextToken: z.string().optional().describe('全文搜索标记（已废弃）'),
    initFullText: z.boolean().optional().describe('是否初始化全文搜索（已废弃）'),
    initJieba: z.boolean().optional().describe('是否初始化结巴分词（已废弃）')
  })
  .describe('数据集数据模型');
