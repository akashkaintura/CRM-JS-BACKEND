import { IsString, IsNotEmpty, IsDateString, IsNumber } from 'class-validator';

export class CreateTimesheetDto {
  @IsString()
  @IsNotEmpty()
  employeeId: string; // Employee or user ID associated with the timesheet

  @IsDateString()
  @IsNotEmpty()
  date: string; // Date of the timesheet entry

  @IsNumber()
  @IsNotEmpty()
  hoursWorked: number; // Hours worked

  @IsString()
  @IsNotEmpty()
  task: string; // Task description or project name
}
