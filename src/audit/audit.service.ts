import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuditLog } from './audit.schema';

@Injectable()
export class AuditService {
  constructor(
    @InjectModel(AuditLog.name) private auditLogModel: Model<AuditLog>,
  ) {}

  async logAction(
    action: string,
    userId: string,
    details?: string,
  ): Promise<AuditLog> {
    const auditLog = new this.auditLogModel({
      action,
      userId,
      details,
      timestamp: new Date(),
    });
    return auditLog.save();
  }

  async getAuditLogs(): Promise<AuditLog[]> {
    return this.auditLogModel.find().exec();
  }

  async findAll(): Promise<AuditLog[]> {
    return this.auditLogModel.find().exec();
  }
}
