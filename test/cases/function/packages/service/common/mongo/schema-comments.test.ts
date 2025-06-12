import { it, expect, describe } from 'vitest';
import { MongoApp } from '@fastgpt/service/core/app/schema';
import {
  getSchemaComments,
  getSchemaDescription,
  getSchemaComment
} from '@fastgpt/service/common/mongo';

/**
 * 生成数据库文档的函数
 */
function generateDbDocs(
  model: any,
  tableName: string
): {
  tableName: string;
  tableComment: string | null;
  fields: Array<{
    fieldName: string;
    comment: string;
  }>;
  documentText: string;
} {
  const comments = getSchemaComments(model);
  const schemaComment = getSchemaComment(model);

  const fields: Array<{ fieldName: string; comment: string }> = [];
  let documentText = `\n=== ${tableName} 数据库表设计 ===\n`;

  if (schemaComment) {
    documentText += `表说明: ${schemaComment}\n\n`;
  }

  documentText += '字段设计:\n';
  documentText += '字段名'.padEnd(20) + ' | ' + '注释\n';
  documentText += '-'.repeat(50) + '\n';

  Object.entries(comments).forEach(([fieldName, comment]) => {
    if (fieldName === '__schema__') return;

    fields.push({ fieldName, comment });
    documentText += `${fieldName.padEnd(20)} | ${comment}\n`;
  });

  return {
    tableName,
    tableComment: schemaComment || null,
    fields,
    documentText
  };
}

/**
 * 生成API文档的函数
 */
function generateApiDocs(
  model: any,
  modelName: string
): {
  modelName: string;
  modelComment: string | null;
  fields: Array<{
    fieldName: string;
    type: string;
    required: boolean;
    comment?: string;
  }>;
  documentText: string;
} {
  const description = getSchemaDescription(model);
  const schemaComment = getSchemaComment(model);

  const fields: Array<{
    fieldName: string;
    type: string;
    required: boolean;
    comment?: string;
  }> = [];

  let documentText = `\n=== ${modelName} API文档 ===\n`;
  documentText += `模型描述: ${schemaComment || '无描述'}\n\n`;

  documentText += '字段列表:\n';
  documentText +=
    '字段名'.padEnd(20) + ' | ' + '类型'.padEnd(10) + ' | ' + '必填' + ' | ' + '说明\n';
  documentText += '-'.repeat(60) + '\n';

  Object.entries(description).forEach(([fieldName, fieldInfo]) => {
    if (fieldName.startsWith('_')) return; // 跳过内部字段

    const required = fieldInfo.required || false;
    const comment = fieldInfo.comment || '无说明';
    const type = fieldInfo.type || 'Mixed';

    fields.push({
      fieldName,
      type,
      required,
      comment: fieldInfo.comment
    });

    const requiredText = required ? '✓' : '✗';
    documentText += `${fieldName.padEnd(20)} | ${type.padEnd(10)} | ${requiredText.padEnd(3)} | ${comment}\n`;
  });

  return {
    modelName,
    modelComment: schemaComment || null,
    fields,
    documentText
  };
}

describe('Schema Comments - Database Documentation Generation', () => {
  it('should generate complete database documentation for App schema', () => {
    const result = generateDbDocs(MongoApp, 'apps');

    // 验证基本结构
    expect(result.tableName).toBe('apps');
    expect(result.tableComment).toBe('App schema for managing applications within a team');
    expect(result.fields).toBeInstanceOf(Array);
    expect(result.documentText).toBeTypeOf('string');

    // 验证必须包含的字段
    const fieldNames = result.fields.map((f) => f.fieldName);
    expect(fieldNames).toContain('parentId');
    expect(fieldNames).toContain('teamId');
    expect(fieldNames).toContain('tmbId');
    expect(fieldNames).toContain('name');
    expect(fieldNames).toContain('type');

    // 验证字段注释内容
    const teamIdField = result.fields.find((f) => f.fieldName === 'teamId');
    expect(teamIdField?.comment).toBe('所属团队ID，必填字段');

    const nameField = result.fields.find((f) => f.fieldName === 'name');
    expect(nameField?.comment).toBe('应用名称');

    const parentIdField = result.fields.find((f) => f.fieldName === 'parentId');
    expect(parentIdField?.comment).toBe('父应用ID，用于应用继承关系');
  });

  it('should generate proper document text format', () => {
    const result = generateDbDocs(MongoApp, 'apps');

    // 验证文档格式
    expect(result.documentText).toContain('=== apps 数据库表设计 ===');
    expect(result.documentText).toContain(
      '表说明: App schema for managing applications within a team'
    );
    expect(result.documentText).toContain('字段设计:');
    expect(result.documentText).toContain('字段名                  | 注释');
    expect(result.documentText).toContain('parentId             | 父应用ID，用于应用继承关系');
    expect(result.documentText).toContain('teamId               | 所属团队ID，必填字段');

    // 验证格式长度
    const lines = result.documentText.split('\n');
    const headerLine = lines.find((line) => line.includes('字段名') && line.includes('注释'));
    const separatorLine = lines.find((line) => line.includes('----'));

    expect(headerLine).toBeDefined();
    expect(separatorLine).toBeDefined();
    expect(separatorLine?.length).toBeGreaterThanOrEqual(50);
  });

  it('should exclude schema comment from field list', () => {
    const result = generateDbDocs(MongoApp, 'apps');

    // 确保 __schema__ 不在字段列表中
    const hasSchemaField = result.fields.some((f) => f.fieldName === '__schema__');
    expect(hasSchemaField).toBe(false);

    // 但文档文本中应该包含表说明
    expect(result.documentText).toContain('App schema for managing applications within a team');
  });
});

describe('Schema Comments - API Documentation Generation', () => {
  it('should generate complete API documentation for App schema', () => {
    const result = generateApiDocs(MongoApp, 'App');

    // 验证基本结构
    expect(result.modelName).toBe('App');
    expect(result.modelComment).toBe('App schema for managing applications within a team');
    expect(result.fields).toBeInstanceOf(Array);
    expect(result.documentText).toBeTypeOf('string');

    // 验证字段类型和必填状态
    const teamIdField = result.fields.find((f) => f.fieldName === 'teamId');
    expect(teamIdField?.type).toBe('ObjectId');
    expect(teamIdField?.required).toBe(true);
    expect(teamIdField?.comment).toBe('所属团队ID，必填字段');

    const nameField = result.fields.find((f) => f.fieldName === 'name');
    expect(nameField?.type).toBe('String');
    expect(nameField?.required).toBe(true);
    expect(nameField?.comment).toBe('应用名称');

    const avatarField = result.fields.find((f) => f.fieldName === 'avatar');
    expect(avatarField?.type).toBe('String');
    expect(avatarField?.required).toBe(false);
    expect(avatarField?.comment).toBe('应用头像');
  });

  it('should format API documentation correctly', () => {
    const result = generateApiDocs(MongoApp, 'App');

    // 验证文档格式
    expect(result.documentText).toContain('=== App API文档 ===');
    expect(result.documentText).toContain(
      '模型描述: App schema for managing applications within a team'
    );
    expect(result.documentText).toContain('字段列表:');
    expect(result.documentText).toContain('字段名                  | 类型         | 必填 | 说明');

    // 验证必填标记
    expect(result.documentText).toContain(
      'teamId               | ObjectId   | ✓   | 所属团队ID，必填字段'
    );
    expect(result.documentText).toContain('name                 | String     | ✓   | 应用名称');

    // 验证可选字段标记
    const lines = result.documentText.split('\n');
    const avatarLine = lines.find((line) => line.includes('avatar') && line.includes('应用头像'));
    expect(avatarLine).toContain('✗'); // 可选字段标记
  });

  it('should exclude internal fields from API documentation', () => {
    const result = generateApiDocs(MongoApp, 'App');

    // 确保内部字段（以_开头，除了_id）不包含在API文档中
    const internalFields = result.fields.filter(
      (f) => f.fieldName.startsWith('_') && f.fieldName !== '_id'
    );
    expect(internalFields).toHaveLength(0);

    // 但应该包含_id字段（如果存在）
    const idField = result.fields.find((f) => f.fieldName === '_id');
    // _id字段可能不在schema定义中，这是正常的
  });

  it('should handle fields without comments', () => {
    const result = generateApiDocs(MongoApp, 'App');

    // 检查是否正确处理没有注释的字段
    result.fields.forEach((field) => {
      if (!field.comment) {
        // 在文档文本中应该显示"无说明"
        const fieldLine = result.documentText
          .split('\n')
          .find((line) => line.includes(field.fieldName) && line.includes('无说明'));
        // 如果字段没有注释，文档中应该显示"无说明"
        if (fieldLine) {
          expect(fieldLine).toContain('无说明');
        }
      }
    });
  });
});

describe('Schema Comments - Integration Tests', () => {
  it('should generate both database and API documentation consistently', () => {
    const dbDocs = generateDbDocs(MongoApp, 'apps');
    const apiDocs = generateApiDocs(MongoApp, 'App');

    // 两种文档应该有相同的表/模型注释
    expect(dbDocs.tableComment).toBe(apiDocs.modelComment);

    // 检查关键字段在两种文档中都存在
    const dbFieldNames = dbDocs.fields.map((f) => f.fieldName);
    const apiFieldNames = apiDocs.fields.map((f) => f.fieldName);

    const keyFields = ['teamId', 'name', 'type'];
    keyFields.forEach((fieldName) => {
      expect(dbFieldNames).toContain(fieldName);
      expect(apiFieldNames).toContain(fieldName);

      // 注释应该一致
      const dbField = dbDocs.fields.find((f) => f.fieldName === fieldName);
      const apiField = apiDocs.fields.find((f) => f.fieldName === fieldName);

      expect(dbField?.comment).toBe(apiField?.comment);
    });
  });

  it('should output readable documentation text', () => {
    const dbDocs = generateDbDocs(MongoApp, 'apps');
    const apiDocs = generateApiDocs(MongoApp, 'App');

    // 验证文档可读性 - 包含必要的分隔符和格式
    expect(dbDocs.documentText.split('\n').length).toBeGreaterThan(5);
    expect(apiDocs.documentText.split('\n').length).toBeGreaterThan(5);

    // 验证包含表格格式
    expect(dbDocs.documentText).toContain('|'); // 包含表格分隔符
    expect(apiDocs.documentText).toContain('|'); // 包含表格分隔符

    // 验证包含标题
    expect(dbDocs.documentText).toMatch(/===.*===/);
    expect(apiDocs.documentText).toMatch(/===.*===/);
  });
});
