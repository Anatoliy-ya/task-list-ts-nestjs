import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateTasksDto } from './dto/create-tasks.dto';
import { UpdateTasksDto } from './dto/update-tasks.dto';
import { Task, TaskDocument } from './schemas/task.schema';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async create(createTasks: CreateTasksDto): Promise<Task> {
    const newTask = await this.taskModel.create(createTasks);
    return newTask;
  }

  async getAll(): Promise<Task[]> {
    const tasks = await this.taskModel.find();
    return tasks;
  }

  async getOne(id: ObjectId): Promise<Task | null> {
    const task = await this.taskModel.findById(id);
    return task;
  }

  async remove(id: ObjectId) {
    const task = await this.taskModel.findByIdAndDelete(id);
    return task;
  }

  async update(updateTask: UpdateTasksDto, id: string) {
    return this.taskModel.findByIdAndUpdate(id, updateTask);
  }

  async search(query): Promise<Task[]> {
    const tasks = await this.taskModel.find({
      task: { $regex: new RegExp(query, 'i') }
    });
    return tasks;
  }
}
