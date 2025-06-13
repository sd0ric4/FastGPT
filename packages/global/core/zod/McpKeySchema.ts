import { z } from 'zod';

// ==================== Collection Name ====================
/**
 * MCP 集合名称，对应 MongoDB 集合
 */
export const MCP_COLLECTION_NAME = 'mcp_keys' as const;

// ==================== Zod Schema Definitions ====================

/**
 * MCP 应用 Zod Schema
 */
export const ZodMcpAppSchema = z
  .object({
    appId: z.string().describe('应用ID，关联的应用标识符'),
    appName: z.string().optional().describe('应用名称'),
    toolName: z.string().describe('工具名称，MCP工具的名称'),
    description: z.string().describe('工具描述，MCP工具的功能描述')
  })
  .describe('MCP应用配置对象');

/**
 * MCP Zod Schema，对应 MongoDB McpKeySchema
 * Collection: mcp_keys
 */
//FastGPT/packages/service/support/mcp/schema.ts
export const ZodMcpKeySchema = z
  .object({
    _id: z.string().optional().describe('MCP密钥的唯一标识符'),

    name: z.string().describe('MCP密钥名称'),

    key: z.string().describe('MCP密钥，唯一标识符，默认生成24位nanoid'),

    teamId: z.string().describe('团队ID，标识密钥所属的团队'),

    tmbId: z.string().describe('团队成员ID，标识密钥的创建者或负责人'),

    apps: z.array(ZodMcpAppSchema).default([]).describe('关联的应用列表，配置MCP可访问的应用和工具')
  })
  .describe('MCP密钥数据模型');
