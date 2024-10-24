import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './user/user.module';
import { PayrollModule } from './payroll/payroll.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { LeavesModule } from './leaves/leaves.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import { DepartmentsModule } from './department/department.module';
import { TimesheetModule } from './timesheet/timesheet.module';
import {
  Timesheet,
  TimesheetSchema,
} from './timesheet/schema/timesheet.schema';
import { AuditModule } from './audit/audit.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

require('dotenv').config()

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const mongoUri = configService.get<string>('DATABASE_PORT');
        try {
          console.log('Connecting to MongoDB...', mongoUri);
          return {
            uri: mongoUri,
            useNewUrlParser: true,
            useUnifiedTopology: true,
          };
        } catch (error) {
          console.error('MongoDB connection error:', error);
        }
      },
    }),
    AuditModule,
    MongooseModule.forFeature([
      { name: Timesheet.name, schema: TimesheetSchema },
    ]),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
      context: ({ req }) => ({ req }),
    }),
    UserModule,
    PayrollModule,
    LeavesModule,
    AuthModule,
    DepartmentsModule,
    TimesheetModule,
    AuditModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule { }
