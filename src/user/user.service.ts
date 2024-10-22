import { Injectable } from '@nestjs/common';
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

    // Create a new user
    async create(input: CreateUserInput): Promise<User> {
        const newUser = new this.userModel(input);
        return newUser.save();
    }
}
