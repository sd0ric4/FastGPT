import { z } from 'zod';
import { OperationLogEventEnum } from '../../support/operationLog/constants';

// ==================== Collection Name ====================
/**
 * OperationLog 集合名称，对应 MongoDB 集合
 */
export const OPERATION_LOG_COLLECTION_NAME = 'operationLog' as const;

// ==================== Zod Schema Definitions ====================

/**
 * OperationLog Zod Schema，对应 MongoDB OperationLogSchema
 * Collection: operationLog
 */
//FastGPT/packages/service/support/operationLog/schema.ts
export const ZodOperationLogSchema = z
  .object({
    _id: z.string().optional().describe('操作日志的唯一标识符'),

    tmbId: z.string().describe('团队成员ID，标识执行操作的用户'),

    teamId: z.string().describe('团队ID，标识操作所属的团队'),

    timestamp: z
      .date()
      .default(() => new Date())
      .describe('时间戳，操作发生的时间'),

    event: z
      .nativeEnum(OperationLogEventEnum)
      .describe('操作事件类型，如LOGIN、CREATE_APP、DELETE_APP等'),

    metadata: z.record(z.string()).default({}).describe('元数据对象，存储操作的额外信息')
  })
  .describe('操作日志数据模型');
