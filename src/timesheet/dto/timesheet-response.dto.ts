export class TimesheetResponseDto {
  id: string;
  employeeId: string;
  date: string;
  hoursWorked: number;
  task: string;
  createdAt: Date;
  updatedAt: Date;
}
