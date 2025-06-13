import { z } from 'zod';

// ==================== Collection Name ====================
/**
 * TTS Buffer 集合名称，对应 MongoDB 集合
 */
export const TTS_BUFFER_COLLECTION_NAME = 'buffer_tts' as const;

// ==================== Zod Schema Definitions ====================

/**
 * TTS Buffer Zod Schema，对应 MongoDB TTSBufferSchema
 * Collection: buffer_tts
 */
//FastGPT/packages/service/common/buffer/tts/schema.ts
export const ZodTTSBufferSchema = z
  .object({
    _id: z.string().optional().describe('TTS缓冲区的唯一标识符'),

    bufferId: z.string().describe('缓冲区ID，用于标识特定的TTS缓冲区'),

    text: z.string().describe('待转换的文本内容'),

    buffer: z.instanceof(Buffer).describe('TTS生成的音频数据缓冲区'),

    createTime: z
      .date()
      .default(() => new Date())
      .describe('创建时间，缓冲区创建的时间戳，24小时后自动过期')
  })
  .describe('TTS语音合成缓冲区数据模型');
