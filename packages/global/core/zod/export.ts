import fs from 'fs';
import path from 'path';
import zodToJsonSchema from 'zod-to-json-schema';

/**
 * 动态导入所有 schema 文件并提取 Zod schema
 */
async function getAllSchemas() {
  const currentDir = __dirname;
  const files = fs.readdirSync(currentDir);
  const schemaFiles = files.filter(
    (file) =>
      file.endsWith('Schema.ts') &&
      file !== 'export.ts' &&
      !file.includes('test') &&
      !file.includes('spec')
  );

  const schemas: Record<string, any> = {};

  for (const file of schemaFiles) {
    try {
      const modulePath = path.join(currentDir, file);
      const moduleContent = require(modulePath);

      // 提取文件名作为基础名称（去掉 .ts 后缀）
      const baseName = file.replace('.ts', '').replace('Schema', '');
      const expectedSchemaName = `Zod${baseName}Schema`;

      // 只查找与文件名匹配的主要 Schema
      Object.keys(moduleContent).forEach((exportName) => {
        if (exportName === expectedSchemaName) {
          const exportValue = moduleContent[exportName];
          // 检查是否为 Zod schema (具有 _def 属性)
          if (exportValue && typeof exportValue === 'object' && exportValue._def) {
            // 导出时去掉 "Zod" 前缀
            const cleanName = exportName.replace(/^Zod/, '');
            schemas[cleanName] = exportValue;
            console.log(`✅ 找到 Schema: ${exportName} -> ${cleanName} (来自 ${file})`);
          }
        }
      });
    } catch (error: any) {
      console.warn(`⚠️  无法加载文件 ${file}:`, error?.message || error);
    }
  }

  return schemas;
}

/**
 * 导出所有 Zod Schema 为 JSON Schema
 */
export async function exportAllSchemas() {
  console.log('🔍 正在扫描所有 Schema 文件...\n');

  const schemasToExport = await getAllSchemas();
  const outputDir = path.join(__dirname, './jsonschema');

  // 确保输出目录存在
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // 转换并保存每个 schema
  Object.entries(schemasToExport).forEach(([schemaName, zodSchema]) => {
    try {
      // 转换为 JSON Schema
      const jsonSchema = zodToJsonSchema(zodSchema as any, schemaName);

      // 写入文件
      const outputPath = path.join(outputDir, `${schemaName}.json`);
      fs.writeFileSync(outputPath, JSON.stringify(jsonSchema, null, 2), 'utf-8');

      console.log(`✅ ${schemaName} 导出成功: ${outputPath}`);
    } catch (error: any) {
      console.error(`❌ ${schemaName} 导出失败:`, error?.message || error);
    }
  });

  // 创建索引文件
  const indexData = {
    schemas: Object.keys(schemasToExport),
    exportTime: new Date().toISOString(),
    description: 'FastGPT Zod Schemas exported as JSON Schema',
    totalCount: Object.keys(schemasToExport).length
  };

  const indexPath = path.join(outputDir, 'index.json');
  fs.writeFileSync(indexPath, JSON.stringify(indexData, null, 2), 'utf-8');

  console.log(`\n🎉 所有 Schema 导出完成！共导出 ${Object.keys(schemasToExport).length} 个 Schema`);
  console.log(`📁 输出目录: ${outputDir}`);

  return schemasToExport;
}

// 如果直接运行此文件，则执行导出
if (require.main === module) {
  exportAllSchemas().catch(console.error);
}
