import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Department } from './department.schema';
import { CreateDepartmentInput } from './dto/create-department.input';

@Injectable()
export class DepartmentsService {
    constructor(
        @InjectModel(Department.name) private departmentModel: Model<Department>,
    ) { }

    async findAll(): Promise<Department[]> {
        return this.departmentModel.find().exec();
    }

    async create(input: CreateDepartmentInput): Promise<Department> {
        const newDepartment = new this.departmentModel(input);
        return newDepartment.save();
    }
}
