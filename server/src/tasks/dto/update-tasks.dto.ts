export class UpdateTasksDto {
  readonly id: string;
  readonly task: string;
  readonly description: string;
  readonly checker: boolean;
  readonly date?: Date;
}
