import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { AuditService } from '../audit/audit.service';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly auditService: AuditService,
    // private readonly notificationService: NotificationsService,
  ) {}

  // Update the role of the user
  async updateUserRole(input: UpdateUserRoleDto): Promise<User> {
    const user = await this.userModel.findById(input.userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.role = input.newRole;
    await user.save();

    // Log the role change action
    await this.auditService.logAction(
      'Role Change',
      user.id,
      `Changed role to ${input.newRole}`,
    );

    // await this.notificationService.sendEmail(
    //   user.email,
    //   'Role Update Notification',
    //   `Your role has been updated to ${input.newRole}.`,
    // );

    return user;
  }

  // Retrieve all users
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  // Find user by email
  async findByEmail(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email }).exec();
  }

  // Find user by ID
  async findById(id: string): Promise<User | undefined> {
    return this.userModel.findById(id).exec();
  }

  // Create a new user
  async create(
    input: CreateUserDto & { password: string; role: string },
  ): Promise<User> {
    const newUser = new this.userModel(input);
    return newUser.save();
  }
}
