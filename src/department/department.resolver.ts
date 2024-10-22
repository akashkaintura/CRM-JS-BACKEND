import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { DepartmentsService } from './departments.service';
import { Department } from './department.schema';
import { CreateDepartmentInput } from './dto/create-department.input';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../user/user-role.enum';

@Resolver((of) => Department)
export class DepartmentsResolver {
    constructor(private readonly departmentsService: DepartmentsService) { }

    // Admins can create a new department
    @UseGuards(JwtAuthGuard)
    @Roles(UserRole.ADMIN)
    @Mutation(() => Department)
    async createDepartment(@Args('input') input: CreateDepartmentInput) {
        return this.departmentsService.create(input);
    }

    // Anyone can view the list of departments
    @UseGuards(JwtAuthGuard)
    @Query(() => [Department])
    async departments() {
        return this.departmentsService.findAll();
    }
}
