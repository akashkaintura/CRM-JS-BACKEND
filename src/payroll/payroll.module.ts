import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PayrollService } from './payroll.service';
import { PayrollResolver } from './payroll.resolver';
import { Payroll, PayrollSchema } from './payroll.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Payroll.name, schema: PayrollSchema }]),
  ],
  providers: [PayrollService, PayrollResolver],
})
export class PayrollModule { }
