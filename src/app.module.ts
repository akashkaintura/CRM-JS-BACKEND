import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './user/user.module';
import { PayrollModule } from './payroll/payroll.module';
import { LeavesModule } from './leaves/leaves.module';

@Module({
  imports: [
    // Replace the connection string with your MongoDB URI
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost/crm', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    UserModule,
    PayrollModule,
    LeavesModule,
  ],
})
export class AppModule {}
