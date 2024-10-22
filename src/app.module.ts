import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './user/user.module';
import { PayrollModule } from './payroll/payroll.module';
import { LeavesModule } from './leaves/leaves.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { RolesGuard } from './auth/roles.guard';
import { DepartmentModule } from './department/department.module';
import { TimesheetModule } from './timesheet/timesheet.module';

@Module({
  imports: [
    // Replace the connection string with your MongoDB URI
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost/crm', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      context: ({ req }) => ({ req }),
    }),
    UserModule,
    PayrollModule,
    LeavesModule,
    AuthModule,
    DepartmentModule,
    TimesheetModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard, // Apply JWT guard globally
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard, // Apply Roles guard globally (optional)
    },
  ],
})
export class AppModule { }
