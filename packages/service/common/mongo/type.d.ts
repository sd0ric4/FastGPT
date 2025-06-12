import type { Mongoose } from 'mongoose';
import type { Logger } from 'winston';
import type mongoose from 'mongoose';

declare global {
  var mongodb: Mongoose | undefined;
  var mongodbLog: Mongoose | undefined;
}

// 扩展字段定义类型，支持 comment
export interface FieldDefinitionWithComment extends mongoose.SchemaTypeOptions<any> {
  comment: string;
}

// 扩展 Schema 定义类型
export type SchemaDefinitionWithComment = {
  [path: string]: FieldDefinitionWithComment | mongoose.SchemaTypeOptions<any>;
};

// 扩展 mongoose.Schema，添加必选的 comment 属性
export interface SchemaWithComment extends mongoose.Schema {
  comment: string;
}

// Schema 选项类型，包含必选的 comment
export interface SchemaOptionsWithComment extends mongoose.SchemaOptions {
  comment: string;
}
