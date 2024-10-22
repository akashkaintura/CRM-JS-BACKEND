import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.entity'; // We'll define this entity next
import { CreateUserInput } from './dto/create-user.input';

@Resolver((of) => User)
export class UserResolver {
    constructor(private readonly userService: UserService) { }

    // Query to fetch all users
    @Query(() => [User])
    async users() {
        return this.userService.findAll();
    }

    // Mutation to create a new user
    @Mutation(() => User)
    async createUser(@Args('input') input: CreateUserInput) {
        return this.userService.create(input);
    }
}
