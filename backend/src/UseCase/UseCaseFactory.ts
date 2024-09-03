// src/use-case-factory.ts

import { Injectable } from '@nestjs/common';
import CreateTask from './CreateTask/CreateTask';
import UpdateTask from './UpdateTask/UpdateTask'; // Assurez-vous que le chemin est correct

@Injectable()
export class UseCaseFactory {
  constructor(private readonly createTask: CreateTask, private readonly updateTask: UpdateTask) {}

  create<T>(useCase: { new (...args: any[]): T }): T {
    if (useCase === CreateTask) {
      return this.createTask as unknown as T;
    }
    if (useCase === UpdateTask) {
      return this.updateTask as unknown as T;
    }
    throw new Error('Unknown use case');
  }
}