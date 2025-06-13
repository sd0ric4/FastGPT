import { z } from 'zod';
import { TrainingModeEnum } from '../dataset/constants';
import { DatasetDataIndexTypeEnum } from '../dataset/data/constants';

// ==================== Collection Name ====================
/**
 * DatasetTraining 集合名称，对应 MongoDB 集合
 */
export const DATASET_TRAINING_COLLECTION_NAME = 'dataset_trainings' as const;

// ==================== Zod Schema Definitions ====================

/**
 * 训练数据索引项 Zod Schema
 */
export const ZodTrainingDataIndexSchema = z
  .object({
    type: z.nativeEnum(DatasetDataIndexTypeEnum).optional().describe('索引类型'),
    text: z.string().optional().describe('索引文本内容')
  })
  .describe('训练数据索引项对象');

/**
 * DatasetTraining Zod Schema，对应 MongoDB DatasetTrainingSchema
 * Collection: dataset_trainings
 */
//FastGPT/packages/service/core/dataset/training/schema.ts
export const ZodDatasetTrainingSchema = z
  .object({
    _id: z.string().optional().describe('训练数据的唯一标识符'),

    teamId: z.string().describe('团队ID，标识训练数据所属的团队'),

    tmbId: z.string().describe('团队成员ID，标识训练数据的创建者或负责人'),

    datasetId: z.string().describe('数据集ID，标识训练数据所属的数据集'),

    collectionId: z.string().describe('集合ID，标识训练数据所属的集合'),

    billId: z.string().optional().describe('账单ID，关联的计费记录'),

    mode: z.nativeEnum(TrainingModeEnum).describe('训练模式：parse/chunk/qa/auto/image/imageParse'),

    expireAt: z
      .date()
      .default(() => new Date())
      .describe('过期时间，7天后自动删除'),

    lockTime: z
      .date()
      .default(() => new Date('2000/1/1'))
      .describe('锁定时间，防止重复处理'),

    retryCount: z.number().default(5).describe('重试次数，默认5次'),

    model: z.string().optional().describe('使用的模型名称'),

    prompt: z.string().optional().describe('训练提示词'),

    q: z.string().default('').describe('问题文本'),

    a: z.string().default('').describe('答案文本'),

    imageId: z.string().optional().describe('图片ID，图片训练时使用'),

    chunkIndex: z.number().default(0).describe('数据块索引'),

    indexSize: z.number().optional().describe('索引大小'),

    weight: z.number().default(0).describe('权重，用于训练排序'),

    dataId: z.string().optional().describe('关联的数据ID'),

    indexes: z.array(ZodTrainingDataIndexSchema).default([]).describe('索引列表'),

    errorMsg: z.string().optional().describe('错误消息，训练失败时的错误信息')
  })
  .describe('数据集训练数据模型');
