import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Public } from './decorator/public.decorator';
import { AuthResponseDto } from './dto/auth-response.dto';
import { RegisterDto } from './dto/register.dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  // Login mutation (public)
  @Public()
  @Mutation(() => AuthResponseDto)
  async login(@Args('loginDto') loginDto: LoginDto): Promise<AuthResponseDto> {
    try {
      const user = await this.authService.validateUser(
        loginDto.email,
        loginDto.password,
      );
      if (!user) {
        throw new Error('Invalid credentials');
      }
      return this.authService.login(user);
    } catch (error) {
      console.error('Error during login:', error);
      throw new Error('Login failed due to server error');
    }
  }

  // Register mutation (public)
  @Public()
  @Mutation(() => AuthResponseDto)
  async register(
    @Args('registerDto') registerDto: RegisterDto,
  ): Promise<AuthResponseDto> {
    try {
      // Call the authService to register the user
      return this.authService.register(registerDto);
    } catch (error) {
      console.error('Error during registration:', error);
      throw new Error('Registration failed due to server error');
    }
  }
}
