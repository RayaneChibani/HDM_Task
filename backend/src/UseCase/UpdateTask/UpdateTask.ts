// src/UseCase/UpdateTask/UpdateTask.ts

import { Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import TaskRepository from '../../Repositories/TaskRepository';
import UpdateTaskDto

@Injectable()
export default class UpdateTask {
  constructor(private readonly taskRepository: TaskRepository) {}

  async handle(id: number, dto: UpdateTaskDto): Promise<Task> {
    // Utilisez le repository pour mettre à jour la tâche
    return this.taskRepository.save({
      id,
      ...dto, // Étendre avec les données de mise à jour
    });
  }
}
