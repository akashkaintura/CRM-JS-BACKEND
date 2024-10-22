import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { DepartmentsService } from './department.service';
import { Department } from './schemas/department.schema';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Roles } from '../auth/decorator/roles.decorator';
import { UserRole } from '../user/enum/user-role.enum';

@Resolver(() => Department)
export class DepartmentsResolver {
  constructor(private readonly departmentsService: DepartmentsService) {}

  // Admins can create a new department
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN)
  @Mutation(() => Department)
  async createDepartment(@Args('input') input: CreateDepartmentDto) {
    return this.departmentsService.create(input);
  }

  // Anyone can view the list of departments
  @UseGuards(JwtAuthGuard)
  @Query(() => [Department])
  async departments() {
    return this.departmentsService.findAll();
  }
}
