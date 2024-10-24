import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Public } from './decorator/public.decorator';
import { AuthResponse } from './dto/auth-response.dto';
import { RegisterDto } from './dto/register.dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  // Login mutation (public)
  @Public()
  @Mutation(() => AuthResponse)
  async login(@Args('loginDto') loginDto: LoginDto) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    if (!user) {
      throw new Error('Invalid credentials');
    }
    return this.authService.login(user);
  }

  // Register mutation (public)
  @Public()
  @Mutation(() => AuthResponse)
  async register(@Args('registerDto') registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
}
