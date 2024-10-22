import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { LeavesService } from './leaves.service';
import { CreateLeaveDto } from './dto/create-leave.dto';
import { UpdateLeaveDto } from './dto/update-leave.dto';
import { Leave } from './leaves.schema';

@Controller('leaves') // This sets the base route to /leaves
export class LeavesController {
  constructor(private readonly leavesService: LeavesService) {}

  @Post()
  async create(@Body() createLeaveDto: CreateLeaveDto): Promise<Leave> {
    return this.leavesService.create(createLeaveDto);
  }

  @Get()
  async findAll(): Promise<Leave[]> {
    return this.leavesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Leave> {
    return this.leavesService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLeaveDto: UpdateLeaveDto,
  ): Promise<Leave> {
    return this.leavesService.update(id, updateLeaveDto);
  }
}
