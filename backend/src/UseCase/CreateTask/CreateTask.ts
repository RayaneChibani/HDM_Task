// src/UseCase/CreateTask/CreateTask.ts

import { Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import TaskRepository from '../../Repositories/TaskRepository'; // Assurez-vous que le chemin est correct
import CreateTaskDto from './CreateTaskDto';

@Injectable()
export default class CreateTask {
  constructor(private readonly taskRepository: TaskRepository) {}

  async handle(dto: CreateTaskDto): Promise<Task> {
    // Implémentez la logique pour créer une tâche
    return this.taskRepository.save({ name: dto.name });
  }
}
