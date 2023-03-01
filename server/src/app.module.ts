import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TasksModuls } from './tasks/tasks.module';

@Module({
  imports: [
    TasksModuls,
    MongooseModule.forRoot(
      `mongodb+srv://user:user@cluster0.jnfe8z1.mongodb.net/?retryWrites=true&w=majority`,
    ),
  ], // Creat separatly Module ./tasks/tasks.module
})
export class AppModule {}
