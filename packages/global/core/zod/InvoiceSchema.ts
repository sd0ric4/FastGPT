import { z } from 'zod';
import { InvoiceStatusEnum } from '../../support/wallet/bill/invoice/constants';
import { ZodTeamInvoiceSchema } from './TeamInvoiceSchema';

// ==================== Collection Name ====================
/**
 * Invoice 集合名称，对应 MongoDB 集合
 */
export const INVOICE_COLLECTION_NAME = 'bill_invoices' as const;

// ==================== Zod Schema Definitions ====================

/**
 * Invoice Zod Schema，对应 MongoDB InvoiceSchema
 * Collection: bill_invoices
 */
//projects/app/src/service/support/wallet/bill/invoiceSchema.ts
export const ZodInvoiceSchema = ZodTeamInvoiceSchema.extend({
  amount: z.number().describe('发票金额，开票的总金额'),

  status: z.nativeEnum(InvoiceStatusEnum).describe('发票状态：1-已提交，2-已完成'),

  billIdList: z.array(z.string()).describe('账单ID列表，包含在此发票中的账单ID'),

  createTime: z
    .date()
    .default(() => new Date())
    .describe('创建时间，发票申请的时间戳'),

  finishTime: z.date().optional().describe('完成时间，发票开具完成的时间戳'),

  file: z.instanceof(Buffer).optional().describe('发票文件，PDF格式的发票文件二进制数据')
}).describe('发票数据模型');
