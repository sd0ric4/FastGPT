import { z } from 'zod';

// ==================== Collection Name ====================
/**
 * TeamInvoice 集合名称，对应 MongoDB 集合
 */
export const TEAM_INVOICE_COLLECTION_NAME = 'team_Invoice_titles' as const;

// ==================== Zod Schema Definitions ====================

/**
 * TeamInvoice Zod Schema，对应 MongoDB TeamInvoiceSchema
 * Collection: team_Invoice_titles
 */
//projects/app/src/service/support/user/team/invoiceAccount/teamInvoiceSchema.ts
export const ZodTeamInvoiceSchema = z
  .object({
    _id: z.string().optional().describe('发票抬头的唯一标识符'),

    teamId: z.string().describe('团队ID，标识发票抬头所属的团队'),

    teamName: z.string().describe('团队名称，发票抬头中的公司名称'),

    unifiedCreditCode: z.string().describe('统一社会信用代码，企业的唯一标识码'),

    companyAddress: z.string().optional().describe('公司地址'),

    companyPhone: z.string().optional().describe('公司电话'),

    bankName: z.string().optional().describe('开户银行名称'),

    bankAccount: z.string().optional().describe('银行账号'),

    needSpecialInvoice: z.boolean().default(false).describe('是否需要专用发票，默认为普通发票'),

    contactPhone: z.string().optional().describe('联系电话'),

    emailAddress: z.string().email().describe('邮箱地址，用于接收电子发票')
  })
  .describe('团队发票抬头数据模型');
