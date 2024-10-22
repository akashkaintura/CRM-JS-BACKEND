import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Department } from './schemas/department.schema';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { DepartmentResponseDto } from './dto/department-response.dto';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectModel(Department.name) private departmentModel: Model<Department>,
  ) {}

  private toDepartmentResponse(department: Department): DepartmentResponseDto {
    return {
      id: department._id.toString(), // Map _id from Mongoose to id for DTO
      name: department.name,
      description: department.description,
      createdAt: department.createdAt,
      updatedAt: department.updatedAt,
    };
  }

  // Create a new department
  async create(
    createDepartmentDto: CreateDepartmentDto,
  ): Promise<DepartmentResponseDto> {
    const newDepartment = new this.departmentModel({
      ...createDepartmentDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const savedDepartment = await newDepartment.save();
    return this.toDepartmentResponse(savedDepartment);
  }

  // Find all departments
  async findAll(): Promise<DepartmentResponseDto[]> {
    const departments = await this.departmentModel.find().exec();
    return departments.map(this.toDepartmentResponse);
  }

  // Find a specific department by ID
  async findOne(id: string): Promise<DepartmentResponseDto> {
    const department = await this.departmentModel.findById(id).exec();
    if (!department) {
      throw new NotFoundException(`Department with ID ${id} not found`);
    }
    return this.toDepartmentResponse(department);
  }

  // Update a department
  async update(
    id: string,
    updateDepartmentDto: UpdateDepartmentDto,
  ): Promise<DepartmentResponseDto> {
    const updatedDepartment = await this.departmentModel.findByIdAndUpdate(
      id,
      { ...updateDepartmentDto, updatedAt: new Date() },
      { new: true }, // Return the updated document
    );
    if (!updatedDepartment) {
      throw new NotFoundException(`Department with ID ${id} not found`);
    }
    return this.toDepartmentResponse(updatedDepartment);
  }

  // Delete a department
  async remove(id: string): Promise<DepartmentResponseDto> {
    const deletedDepartment = await this.departmentModel
      .findByIdAndDelete(id)
      .exec();
    if (!deletedDepartment) {
      throw new NotFoundException(`Department with ID ${id} not found`);
    }
    return this.toDepartmentResponse(deletedDepartment);
  }
}
