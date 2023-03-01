import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Redirect,
  Header,
  HttpCode,
  Query,
  Req
} from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { CreateTasksDto } from './dto/create-tasks.dto';
import { UpdateTasksDto } from './dto/update-tasks.dto';
import { Task } from './schemas/task.schema';
import { TasksService } from './tasks.service';

@Controller('/tasks') //Decorator tasks
export class TasksController {
  constructor(private tasksService: TasksService) {} //injecte. Delegate our service from ./tasks.service

  @Post()
  @HttpCode(HttpStatus.CREATED) //output status CREATED it 201
  @Header('Cache-Control', 'none') //Adds Header
  create(@Body() createTasks: CreateTasksDto): Promise<Task> {
    return this.tasksService.create(createTasks);
  }

  @Get()
  getAll() {
    return this.tasksService.getAll();
  }

  // @Get()
  // // @Redirect('https://youtube.com', 301) //Redirect in case of an error 301
  // getAll() {
  //   return 'getAll'
  // }

  @Get(':id') //Get dinamic param id from Request Route Parameters
  getOne(@Param('id') id: ObjectId) {
    return this.tasksService.getOne(id);
  }

  @Delete(':id') //Get dinamic param id from Request Route Parameters
  remove(@Param('id') id: ObjectId) {
    return this.tasksService.remove(id);
  }

  @Put(':id')
  update(@Body() updateTask: UpdateTasksDto, @Param('id') id: string) {
    // For update we creat separately update DTO ./dto/update-tasks.dto
    return this.tasksService.update(updateTask, id);
  }

  @Get('search')
  search(@Query('query') query: string): Promise<Task[]> {
    return this.tasksService.search(query);
  }
}
