import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { CreateUserInput } from './dto/create-user.input';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

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
        input: CreateUserInput & { password: string; role: string },
    ): Promise<User> {
        const newUser = new this.userModel(input);
        return newUser.save();
    }
}
