export class CreateTasksDto {
  // Date Transfer Object
  readonly id: string;
  readonly task: string;
  readonly description: string;
  readonly checker: boolean;
  readonly date?: Date;
}
