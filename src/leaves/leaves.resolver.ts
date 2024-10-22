import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { LeavesService } from './leaves.service';
import { Leave } from './leaves.schema';
import { CreateLeaveInput } from './dto/create-leave.input';

@Resolver((of) => Leave)
export class LeavesResolver {
    constructor(private readonly leavesService: LeavesService) { }

    @Query(() => [Leave])
    async leaves() {
        return this.leavesService.findAll();
    }

    @Mutation(() => Leave)
    async createLeave(@Args('input') input: CreateLeaveInput) {
        return this.leavesService.create(input);
    }

    @Query(() => [Leave])
    async getEmployeeLeaves(@Args('employeeId') employeeId: string) {
        return this.leavesService.findByEmployee(employeeId);
    }
}
