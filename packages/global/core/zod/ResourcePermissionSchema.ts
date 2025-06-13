import { z } from 'zod';
import { PerResourceTypeEnum } from '../../support/permission/constant';

// ==================== Collection Name ====================
/**
 * ResourcePermission 集合名称，对应 MongoDB 集合
 */
export const RESOURCE_PERMISSION_COLLECTION_NAME = 'resource_permissions' as const;

// ==================== Zod Schema Definitions ====================

/**
 * ResourcePermission Zod Schema，对应 MongoDB ResourcePermissionSchema
 * Collection: resource_permissions
 */
//FastGPT/packages/service/support/permission/schema.ts
export const ZodResourcePermissionSchema = z
  .object({
    _id: z.string().optional().describe('资源权限的唯一标识符'),

    teamId: z.string().optional().describe('团队ID，标识权限所属的团队'),

    tmbId: z.string().optional().describe('团队成员ID，权限分配给特定成员'),

    groupId: z.string().optional().describe('成员组ID，权限分配给成员组'),

    orgId: z.string().optional().describe('组织ID，权限分配给组织'),

    resourceType: z.nativeEnum(PerResourceTypeEnum).describe('资源类型：team/app/dataset'),

    permission: z.number().describe('权限值，按位存储不同权限'),

    resourceId: z.string().optional().describe('资源ID，如应用ID或数据集ID，团队类型时为null')
  })
  .describe('资源权限数据模型');
