import { ReadPreference } from './index';
import type { Model } from 'mongoose';
import type { SchemaWithComment } from './type';

export const readFromSecondary = {
  readPreference: ReadPreference.SECONDARY_PREFERRED, // primary | primaryPreferred | secondary | secondaryPreferred | nearest
  readConcern: 'local' as any // local | majority | linearizable | available
};

/**
 * 获取 MongoDB Model 的 Schema 注释信息
 * @param model MongoDB Model 实例
 * @returns 包含字段注释的对象
 */
export function getSchemaComments<T>(model: Model<T>): Record<string, string> {
  const schema = model.schema as unknown as SchemaWithComment;
  const comments: Record<string, string> = {};

  // 获取 schema 整体注释
  if (schema.comment) {
    comments['__schema__'] = schema.comment;
  }

  // 遍历所有字段获取注释
  schema.eachPath((pathname, schematype) => {
    if ((schematype as any).comment) {
      comments[pathname] = (schematype as any).comment;
    }
  });

  return comments;
}

/**
 * 获取指定字段的注释
 * @param model MongoDB Model 实例
 * @param fieldName 字段名
 * @returns 字段注释，如果不存在返回 undefined
 */
export function getFieldComment<T>(model: Model<T>, fieldName: string): string | undefined {
  const schema = model.schema;
  const schemaPath = schema.path(fieldName);

  if (schemaPath && (schemaPath as any).comment) {
    return (schemaPath as any).comment;
  }

  return undefined;
}

/**
 * 获取 Schema 的整体注释
 * @param model MongoDB Model 实例
 * @returns Schema 注释，如果不存在返回 undefined
 */
export function getSchemaComment<T>(model: Model<T>): string | undefined {
  const schema = model.schema as unknown as SchemaWithComment;
  return schema.comment;
}

/**
 * 生成包含注释的字段描述对象
 * @param model MongoDB Model 实例
 * @returns 包含字段类型和注释的描述对象
 */
export function getSchemaDescription<T>(
  model: Model<T>
): Record<string, { type: string; comment?: string; required?: boolean }> {
  const schema = model.schema;
  const description: Record<string, { type: string; comment?: string; required?: boolean }> = {};

  schema.eachPath((pathname, schematype) => {
    // 跳过内部字段
    if (pathname.startsWith('_') && pathname !== '_id') {
      return;
    }

    description[pathname] = {
      type: schematype.instance || 'Mixed',
      comment: (schematype as any).comment,
      required: schematype.isRequired || false
    };
  });

  return description;
}
