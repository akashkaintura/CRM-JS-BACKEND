import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PayrollService } from './payroll.service';
import { Payroll } from './payroll.schema';
import { CreatePayrollInput } from './dto/create-payroll.input';

@Resolver((of) => Payroll)
export class PayrollResolver {
    constructor(private readonly payrollService: PayrollService) { }

    @Query(() => [Payroll])
    async payrolls() {
        return this.payrollService.findAll();
    }

    @Mutation(() => Payroll)
    async createPayroll(@Args('input') input: CreatePayrollInput) {
        return this.payrollService.create(input);
    }

    @Query(() => [Payroll])
    async getEmployeePayroll(@Args('employeeId') employeeId: string) {
        return this.payrollService.findByEmployee(employeeId);
    }
}
