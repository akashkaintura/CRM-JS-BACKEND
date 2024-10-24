import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UseGuards } from '@nestjs/common';
import { Roles } from '../auth/decorator/roles.decorator';
import { UserRole } from './enum/user-role.enum';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) { }

  // Fetch all users (admin only)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Query(() => [User])
  async updateUserRole(@Args('input') input: UpdateUserRoleDto) {
    return this.userService.updateUserRole(input);
  }

  // Create a new user (admin only)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Mutation(() => User)
  async createUser(@Args('input') input: CreateUserDto) {
    const role = input.role ?? 'user';
    return this.userService.create({ ...input, role });
  }

  // Fetch current user profile
  @UseGuards(JwtAuthGuard)
  @Query(() => User)
  async me(@Args('id') id: string) {
    return this.userService.findById(id);
  }
}
