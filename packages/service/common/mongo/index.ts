import { isTestEnv } from '@fastgpt/global/common/system/constants';
import { addLog } from '../../common/system/log';
import type { Model } from 'mongoose';
import mongoose, { Mongoose } from 'mongoose';
import type {
  SchemaDefinitionWithComment,
  SchemaOptionsWithComment,
  SchemaWithComment
} from './type';

export default mongoose;
export * from 'mongoose';

export const MONGO_URL = process.env.MONGODB_URI as string;
export const MONGO_LOG_URL = (process.env.MONGODB_LOG_URI ?? process.env.MONGODB_URI) as string;

export const connectionMongo = (() => {
  if (!global.mongodb) {
    global.mongodb = new Mongoose();
  }
  return global.mongodb;
})();

export const connectionLogMongo = (() => {
  if (!global.mongodbLog) {
    global.mongodbLog = new Mongoose();
  }
  return global.mongodbLog;
})();

// 为 Schema 添加 comment 支持的函数
export const createSchemaWithComment = (
  definition: SchemaDefinitionWithComment,
  options: SchemaOptionsWithComment
): SchemaWithComment => {
  // 创建标准的 mongoose schema
  const schema = new mongoose.Schema(definition, options);

  // 扩展 schema 对象，添加 comment 属性
  const extendedSchema = Object.assign(schema, {
    comment: options.comment
  }) as SchemaWithComment;

  // 为每个字段添加 comment 到 schema path（如果存在）
  Object.keys(definition).forEach((fieldName) => {
    const fieldDef = definition[fieldName];
    if (fieldDef && typeof fieldDef === 'object' && 'comment' in fieldDef && fieldDef.comment) {
      const schemaPath = schema.path(fieldName);
      if (schemaPath) {
        (schemaPath as any).comment = fieldDef.comment;
      }
    }
  });

  return extendedSchema;
};
const addCommonMiddleware = (schema: mongoose.Schema) => {
  const operations = [
    /^find/,
    'save',
    'create',
    /^update/,
    /^delete/,
    'aggregate',
    'count',
    'countDocuments',
    'estimatedDocumentCount',
    'distinct',
    'insertMany'
  ];

  operations.forEach((op: any) => {
    schema.pre(op, function (this: any, next) {
      this._startTime = Date.now();
      this._query = this.getQuery ? this.getQuery() : null;

      next();
    });

    schema.post(op, function (this: any, result: any, next) {
      if (this._startTime) {
        const duration = Date.now() - this._startTime;
        const warnLogData = {
          collectionName: this.collection?.name,
          op: this.op,
          ...(this._query && { query: this._query }),
          ...(this._update && { update: this._update }),
          ...(this._delete && { delete: this._delete }),
          duration
        };

        if (duration > 1000) {
          addLog.warn(`Slow operation ${duration}ms`, warnLogData);
        }
      }
      next();
    });
  });

  return schema;
};

export const getMongoModel = <T>(name: string, schema: mongoose.Schema) => {
  if (connectionMongo.models[name]) return connectionMongo.models[name] as Model<T>;
  if (!isTestEnv) console.log('Load model======', name);
  addCommonMiddleware(schema);

  const model = connectionMongo.model<T>(name, schema);

  // Sync index
  syncMongoIndex(model);

  return model;
};

export const getMongoLogModel = <T>(name: string, schema: mongoose.Schema) => {
  if (connectionLogMongo.models[name]) return connectionLogMongo.models[name] as Model<T>;
  console.log('Load model======', name);
  addCommonMiddleware(schema);

  const model = connectionLogMongo.model<T>(name, schema);

  // Sync index
  syncMongoIndex(model);

  return model;
};

const syncMongoIndex = async (model: Model<any>) => {
  if (process.env.SYNC_INDEX !== '0' && process.env.NODE_ENV !== 'test') {
    try {
      model.syncIndexes({ background: true });
    } catch (error) {
      addLog.error('Create index error', error);
    }
  }
};

export const ReadPreference = connectionMongo.mongo.ReadPreference;

export * from './utils';
export * from './modelWithComments';
