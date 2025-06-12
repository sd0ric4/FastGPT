import { MongoApp } from '../core/app/schema';
import {
  getSchemaComments,
  getFieldComment,
  getSchemaComment,
  getSchemaDescription,
  withComments
} from '../common/mongo';

// === 方案1：使用工具函数直接获取comment ===

console.log('=== 方案1：工具函数方式 ===');

// 1. 获取所有字段的注释
const allComments = getSchemaComments(MongoApp);
console.log('App Schema 所有注释:', allComments);

// 2. 获取特定字段的注释
const teamIdComment = getFieldComment(MongoApp, 'teamId');
console.log('teamId 字段注释:', teamIdComment);

const nameComment = getFieldComment(MongoApp, 'name');
console.log('name 字段注释:', nameComment);

// 3. 获取Schema整体注释
const schemaComment = getSchemaComment(MongoApp);
console.log('Schema 整体注释:', schemaComment);

// 4. 获取完整的字段描述
const schemaDescription = getSchemaDescription(MongoApp);
console.log('Schema 完整描述:', JSON.stringify(schemaDescription, null, 2));

// === 方案2：使用包装模型 ===

console.log('\n=== 方案2：包装模型方式 ===');

// 包装原模型，使其具有comment访问功能
const AppModelWithComments = withComments(MongoApp);

// 现在可以直接在模型上调用comment相关方法
console.log('Schema 注释:', AppModelWithComments.getSchemaComment());
console.log('teamId 注释:', AppModelWithComments.getFieldComment('teamId'));
console.log('所有注释:', AppModelWithComments.getComments());

// 同时保持原有的所有MongoDB模型功能
// AppModelWithComments.find() // 正常的查询功能
// AppModelWithComments.create() // 正常的创建功能

// === 方案3：创建一个带comment的新模型导出 ===

// 在 schema.ts 文件中，可以这样导出：
const MongoAppWithComments = withComments(MongoApp);

// 然后在其他地方使用：
// import { MongoAppWithComments } from '../core/app/schema';
// const comment = MongoAppWithComments.getFieldComment('name');

// === 实际使用场景示例 ===

/**
 * 生成数据库文档
 */
function generateDbDocs(model: any, tableName: string) {
  const comments = getSchemaComments(model);

  console.log(`\n=== ${tableName} 数据库表设计 ===`);
  if (comments['__schema__']) {
    console.log(`表说明: ${comments['__schema__']}\n`);
  }

  console.log('字段设计:');
  console.log('字段名'.padEnd(20) + ' | ' + '注释');
  console.log('-'.repeat(50));

  Object.entries(comments).forEach(([fieldName, comment]) => {
    if (fieldName === '__schema__') return;
    console.log(`${fieldName.padEnd(20)} | ${comment}`);
  });
}

// 生成文档
generateDbDocs(MongoApp, 'apps');

/**
 * 表单验证消息生成
 */
function generateValidationMessages(model: any) {
  const description = getSchemaDescription(model);
  const messages: Record<string, string> = {};

  Object.entries(description).forEach(([fieldName, fieldInfo]) => {
    if (fieldInfo.required && fieldInfo.comment) {
      messages[`${fieldName}.required`] = `${fieldInfo.comment}为必填项`;
    }
  });

  return messages;
}

const validationMessages = generateValidationMessages(MongoApp);
console.log('\n=== 生成的验证消息 ===');
console.log(validationMessages);

export { getSchemaComments, getFieldComment, getSchemaComment, getSchemaDescription };
