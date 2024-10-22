import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { JwtPayload } from './interface/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // Validate user credentials
  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user.toObject();
      return result;
    }
    return null;
  }

  // Generate JWT token
  async login(user: any) {
    const payload: JwtPayload = {
      sub: user._id,
      email: user.email,
      role: user.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // Validate user from JWT payload
  async validateUserByJwt(payload: JwtPayload) {
    const user = await this.userService.findById(payload.sub);
    if (user) {
      return user;
    }
    return null;
  }

  // Register a new user
  async register(email: string, password: string, name: string, role: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.userService.create({
      email,
      password: hashedPassword,
      name,
      role,
    });
    return this.login(newUser);
  }
}
