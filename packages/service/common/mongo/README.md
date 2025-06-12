# MongoDB Schema Comment 支持

为了解决 MongoDB model 无法直接获取 comment 的问题，我们提供了以下解决方案：

## 问题描述

虽然我们在定义 Schema 时添加了 `comment` 字段：

```typescript
const AppSchema = createSchemaWithComment({
  name: {
    type: String,
    required: true,
    comment: '应用名称'
  },
  teamId: {
    type: Schema.Types.ObjectId,
    ref: TeamCollectionName,
    required: true,
    comment: '所属团队ID，必填字段'
  }
  // ...
}, {
  comment: 'App schema for managing applications within a team'
});
```

但从 `MongoApp` 模型实例无法直接访问这些 comment 信息。

## 解决方案

### 方案1：工具函数（推荐用于一次性获取）

```typescript
import { 
  getSchemaComments, 
  getFieldComment, 
  getSchemaComment, 
  getSchemaDescription 
} from '@fastgpt/service/common/mongo';
import { MongoApp } from '@fastgpt/service/core/app/schema';

// 获取所有字段注释
const allComments = getSchemaComments(MongoApp);
console.log(allComments);
/*
{
  "__schema__": "App schema for managing applications within a team",
  "name": "应用名称",
  "teamId": "所属团队ID，必填字段",
  // ...
}
*/

// 获取单个字段注释
const nameComment = getFieldComment(MongoApp, 'name');
console.log(nameComment); // "应用名称"

// 获取Schema整体注释
const schemaComment = getSchemaComment(MongoApp);
console.log(schemaComment); // "App schema for managing applications within a team"

// 获取完整字段描述（类型+注释+必填状态）
const description = getSchemaDescription(MongoApp);
console.log(description);
/*
{
  "name": {
    "type": "String",
    "comment": "应用名称",
    "required": true
  },
  // ...
}
*/
```

### 方案2：包装模型（推荐用于频繁访问）

```typescript
import { withComments } from '@fastgpt/service/common/mongo';
import { MongoApp } from '@fastgpt/service/core/app/schema';

// 包装原模型，使其具有comment访问功能
const AppModel = withComments(MongoApp);

// 现在可以直接调用comment方法
console.log(AppModel.getSchemaComment());
console.log(AppModel.getFieldComment('name'));
console.log(AppModel.getComments());

// 同时保持所有原有功能
const apps = await AppModel.find({ teamId: 'xxx' });
const newApp = await AppModel.create({ ... });
```

### 方案3：预包装模型（最便捷）

直接使用已包装的模型：

```typescript
import { MongoAppWithComments } from '@fastgpt/service/core/app/schema';

// 直接使用，无需额外包装
const nameComment = MongoAppWithComments.getFieldComment('name');
const allComments = MongoAppWithComments.getComments();

// 正常的数据库操作
const apps = await MongoAppWithComments.find({ teamId: 'xxx' });
```

## 实际应用场景

### 1. 生成API文档

```typescript
function generateApiDocs(model: any, modelName: string) {
  const description = getSchemaDescription(model);
  const schemaComment = getSchemaComment(model);
  
  console.log(`### ${modelName} 模型`);
  console.log(`描述: ${schemaComment}\n`);
  
  console.log('| 字段名 | 类型 | 必填 | 说明 |');
  console.log('|--------|------|------|------|');
  
  Object.entries(description).forEach(([fieldName, fieldInfo]) => {
    const required = fieldInfo.required ? '✓' : '✗';
    const comment = fieldInfo.comment || '无说明';
    console.log(`| ${fieldName} | ${fieldInfo.type} | ${required} | ${comment} |`);
  });
}

generateApiDocs(MongoApp, 'App');
```

### 2. 生成数据库文档

```typescript
function generateDbDocs(model: any, tableName: string) {
  const comments = getSchemaComments(model);
  
  console.log(`-- ${tableName} 表注释`);
  if (comments['__schema__']) {
    console.log(`-- ${comments['__schema__']}`);
  }
  
  Object.entries(comments).forEach(([fieldName, comment]) => {
    if (fieldName !== '__schema__') {
      console.log(`-- ${fieldName}: ${comment}`);
    }
  });
}
```

### 3. 生成表单验证消息

```typescript
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
// { "name.required": "应用名称为必填项", "teamId.required": "所属团队ID，必填字段为必填项" }
```

### 4. 运行时字段说明

```typescript
// 在API响应中包含字段说明
app.get('/api/app/schema', (req, res) => {
  const fieldComments = getSchemaComments(MongoApp);
  res.json({
    schema: getSchemaDescription(MongoApp),
    comments: fieldComments
  });
});
```

## 性能说明

- 工具函数每次调用都会遍历schema，适合一次性获取
- 包装模型会创建代理对象，但不影响数据库操作性能
- 推荐在应用启动时生成文档，避免运行时频繁调用

## 类型支持

所有函数都提供完整的TypeScript类型支持：

```typescript
import type { ModelWithCommentsType } from '@fastgpt/service/common/mongo';

const AppModel: ModelWithCommentsType<AppType> = withComments(MongoApp);
```
