import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { DepartmentsService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { DepartmentResponseDto } from './dto/department-response.dto';

@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  // Create a new department
  @Post()
  async create(
    @Body() createDepartmentDto: CreateDepartmentDto,
  ): Promise<DepartmentResponseDto> {
    return this.departmentsService.create(createDepartmentDto);
  }

  // Get all departments
  @Get()
  async findAll(): Promise<DepartmentResponseDto[]> {
    return this.departmentsService.findAll();
  }

  // Get a department by its ID
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<DepartmentResponseDto> {
    return this.departmentsService.findOne(id);
  }

  // Update a department by its ID
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ): Promise<DepartmentResponseDto> {
    return this.departmentsService.update(id, updateDepartmentDto);
  }

  // Delete a department by its ID
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<DepartmentResponseDto> {
    return this.departmentsService.remove(id);
  }
}
