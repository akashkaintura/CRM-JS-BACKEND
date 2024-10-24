import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuditLog } from './schema/audit.schema';

@Injectable()
export class AuditService {
  constructor(
    @InjectModel(AuditLog.name) private readonly auditLogModel: Model<AuditLog>,
  ) { }

  async logAction(action: string, userId: string, details?: string): Promise<AuditLog> {
    const newLog = new this.auditLogModel({
      action,
      userId,
      details,
      timestamp: new Date(),
    });
    return newLog.save();
  }

  async getAuditLogs(): Promise<AuditLog[]> {
    return this.auditLogModel.find().exec();
  }
}
