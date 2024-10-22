import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { LeavesService } from './leaves.service';
import { Leave } from './leaves.schema';
import { CreateLeaveInput } from './dto/create-leave.input';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Roles } from '../auth/decorator/roles.decorator';
import { UserRole } from '../user/enum/user-role.enum';

@Resolver(() => Leave)
export class LeavesResolver {
  constructor(private readonly leavesService: LeavesService) {}

  // Employees can view their own leaves
  @UseGuards(JwtAuthGuard)
  @Query(() => [Leave])
  async getEmployeeLeaves(@Args('employeeId') employeeId: string) {
    return this.leavesService.findByEmployee(employeeId);
  }

  // Employees can request a new leave
  @UseGuards(JwtAuthGuard)
  @Mutation(() => Leave)
  async requestLeave(@Args('input') input: CreateLeaveInput) {
    return this.leavesService.create(input);
  }

  // Admins or managers can view all leave requests
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN)
  @Query(() => [Leave])
  async allLeaves() {
    return this.leavesService.findAll();
  }
}
