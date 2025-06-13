import { z } from 'zod';

// ==================== Collection Name ====================
/**
 * TimerLock 集合名称，对应 MongoDB 集合
 */
export const TIMER_LOCK_COLLECTION_NAME = 'systemtimerlocks' as const;

// ==================== Zod Schema Definitions ====================

/**
 * TimerLock Zod Schema，对应 MongoDB TimerLockSchema
 * Collection: systemtimerlocks
 */
//FastGPT/packages/service/common/system/timerLock/schema.ts
export const ZodTimerLockSchema = z
  .object({
    _id: z.string().optional().describe('定时锁记录的唯一标识符'),

    timerId: z.string().describe('定时器ID，唯一标识一个定时器锁'),

    expiredTime: z.date().describe('过期时间，锁的有效期限，5秒后自动过期删除')
  })
  .describe('定时器锁数据模型');
