import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login-response.dto';
import { LoginInput } from './dto/login.input';
import { RegisterInput } from './dto/register.input';
import { Public } from './public.decorator';

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) { }

    // Login mutation (public)
    @Public()
    @Mutation(() => LoginResponse)
    async login(@Args('loginInput') loginInput: LoginInput) {
        const user = await this.authService.validateUser(
            loginInput.email,
            loginInput.password,
        );
        if (!user) {
            throw new Error('Invalid credentials');
        }
        return this.authService.login(user);
    }

    // Register mutation (public)
    @Public()
    @Mutation(() => LoginResponse)
    async register(@Args('registerInput') registerInput: RegisterInput) {
        return this.authService.register(
            registerInput.email,
            registerInput.password,
            registerInput.name,
            registerInput.role,
        );
    }
}
