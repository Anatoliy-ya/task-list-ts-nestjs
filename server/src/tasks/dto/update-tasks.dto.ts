export class UpdateTasksDto {
  readonly task: string;
  readonly description: string;
  readonly checker: boolean;
  readonly date?: Date;
}
