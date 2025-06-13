import { z } from 'zod';

// ==================== Collection Name ====================
/**
 * TmpData 集合名称，对应 MongoDB 集合
 */
export const TMP_DATA_COLLECTION_NAME = 'tmp_datas' as const;

// ==================== Zod Schema Definitions ====================

/**
 * TmpData Zod Schema，对应 MongoDB TmpDataSchema
 * Collection: tmp_datas
 */
//FastGPT/packages/service/support/tmpData/schema.ts
export const ZodTmpDataSchema = z
  .object({
    _id: z.string().optional().describe('临时数据的唯一标识符'),

    dataId: z.string().describe('数据ID，临时数据的唯一标识符'),

    data: z.record(z.any()).optional().describe('临时数据对象，可以存储任意类型的数据'),

    expireAt: z.date().describe('过期时间，5秒后自动删除')
  })
  .describe('临时数据存储模型');
