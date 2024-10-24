import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { JwtPayload } from './interface/jwt-payload.interface';
import { RegisterDto } from './dto/register.dto';
// import { v4 as uuidv4 } from 'uuid';
// import { UserRole } from 'src/user/enum/user-role.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // Register a new user
  async register(registerDto: RegisterDto) {
    try {
      const hashedPassword = await bcrypt.hash(registerDto.password, 10);
      const employeeId = 'EMP' + Math.floor(Math.random() * 100000);
      const newUser = await this.userService.create({
        email: registerDto.email,
        password: hashedPassword,
        name: registerDto.name,
        role: registerDto.role,
        employeeId,
      });
      return this.login(newUser);
    } catch (error) {
      console.error('Error during registration:', error);
      throw new Error('Registration failed due to server error');
    }
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const result = user.toObject();
      delete result.password;
      return result;
    }
    return null;
  }

  // Generate JWT token
  async login(user: any) {
    try {
      const payload: JwtPayload = {
        sub: user._id,
        email: user.email,
        role: user.role,
        employeeId: user.employeeId,
      };
      return {
        access_token: this.jwtService.sign(payload),
        employeeId: user.employeeId,
      };
    } catch (error) {
      console.error('Error during login:', error);
      throw new Error('Login failed due to server error');
    }
  }

  // Validate user from JWT payload
  async validateUserByJwt(payload: JwtPayload) {
    const user = await this.userService.findById(payload.sub);
    if (user) {
      return user;
    }
    return null;
  }
}
