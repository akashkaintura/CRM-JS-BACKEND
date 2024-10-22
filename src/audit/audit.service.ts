import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuditLog } from './audit.schema';

@Injectable()
export class AuditService {
  constructor(
    @InjectModel(AuditLog.name) private auditModel: Model<AuditLog>,
  ) {}

  // Log an action
  async logAction(
    action: string,
    userId: string,
    details?: string,
  ): Promise<AuditLog> {
    const log = new this.auditModel({
      action,
      userId,
      timestamp: new Date(),
      details,
    });
    return log.save();
  }

  // Retrieve audit logs
  async getAuditLogs(): Promise<AuditLog[]> {
    return this.auditModel.find().exec();
  }
}
