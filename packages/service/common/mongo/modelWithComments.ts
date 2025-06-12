import type { Model } from 'mongoose';
import type { SchemaWithComment } from './type';

// 方案2：扩展模型类，提供静态方法访问comment

/**
 * 扩展MongoDB Model，添加comment访问功能
 */
export class ModelWithComments<T> {
  constructor(private model: Model<T>) {}

  /**
   * 获取所有字段的注释
   */
  getComments(): Record<string, string> {
    const schema = this.model.schema as unknown as SchemaWithComment;
    const comments: Record<string, string> = {};

    if (schema.comment) {
      comments['__schema__'] = schema.comment;
    }

    schema.eachPath((pathname, schematype) => {
      if ((schematype as any).comment) {
        comments[pathname] = (schematype as any).comment;
      }
    });

    return comments;
  }

  /**
   * 获取指定字段的注释
   */
  getFieldComment(fieldName: string): string | undefined {
    const schemaPath = this.model.schema.path(fieldName);
    if (schemaPath && (schemaPath as any).comment) {
      return (schemaPath as any).comment;
    }
    return undefined;
  }

  /**
   * 获取Schema整体注释
   */
  getSchemaComment(): string | undefined {
    const schema = this.model.schema as unknown as SchemaWithComment;
    return schema.comment;
  }

  /**
   * 获取原始模型
   */
  getModel(): Model<T> {
    return this.model;
  }

  /**
   * 代理模型的所有方法和属性
   */
  [key: string]: any;
}

// 创建代理以便无缝使用原模型的所有功能
function createModelProxy<T>(model: Model<T>): Model<T> & ModelWithComments<T> {
  const wrapper = new ModelWithComments(model);

  return new Proxy(wrapper, {
    get(target, prop, receiver) {
      // 如果是wrapper自己的方法，直接返回
      if (prop in target) {
        return Reflect.get(target, prop, receiver);
      }

      // 否则代理到原模型
      const value = Reflect.get(model, prop, receiver);

      // 如果是函数，绑定正确的this
      if (typeof value === 'function') {
        return value.bind(model);
      }

      return value;
    },

    set(target, prop, value, receiver) {
      // 设置操作代理到原模型
      return Reflect.set(model, prop, value, model);
    }
  }) as Model<T> & ModelWithComments<T>;
}

/**
 * 包装模型以提供comment访问功能
 * @param model 原始MongoDB模型
 * @returns 带有comment访问功能的模型
 */
export function withComments<T>(model: Model<T>): Model<T> & ModelWithComments<T> {
  return createModelProxy(model);
}

// 使用示例类型定义
export type ModelWithCommentsType<T> = Model<T> & ModelWithComments<T>;
