import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.schema';
import { CreateUserInput } from './dto/create-user.input';
import { UseGuards } from '@nestjs/common';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from './user-role.enum';

@Resolver((of) => User)
export class UserResolver {
    constructor(private readonly userService: UserService) { }

    // Fetch all users (admin only)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @Query(() => [User])
    async users() {
        return this.userService.findAll();
    }

    // Create a new user (admin only)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @Mutation(() => User)
    async createUser(@Args('input') input: CreateUserInput) {
        return this.userService.create(input);
    }

    // Fetch current user profile
    @UseGuards(JwtAuthGuard)
    @Query(() => User)
    async me(@Args('id') id: string) {
        return this.userService.findById(id);
    }
}
