import { Resolver, Query } from '@nestjs/graphql';
import { AuditService } from './audit.service';
import { AuditLog } from './audit.schema';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorator/roles.decorator';
import { UserRole } from '../user/enum/user-role.enum';

@Resolver(() => AuditLog)
export class AuditResolver {
  constructor(private readonly auditService: AuditService) {}

  // Admins can view audit logs
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN)
  @Query(() => [AuditLog])
  async getAuditLogs() {
    return this.auditService.getAuditLogs();
  }
}
