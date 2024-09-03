import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { Task } from '@prisma/client';
import { UseCase } from '../../index';
import SaveTaskDto from './SaveTaskDto';
import { PrismaService } from '../../services/prisma.service'; // Assurez-vous que le service Prisma est correctement importé et fourni.

@Injectable()
export default class SaveTaskUseCase implements UseCase<Promise<Task>, [dto: SaveTaskDto]> {
  constructor(private readonly prismaService: PrismaService) {}

  async handle(dto: SaveTaskDto): Promise<Task> {
    // Validation DTO
    if (!dto.name || typeof dto.name !== 'string' || dto.name.trim().length === 0) {
      throw new BadRequestException('Task name is required and must be a non-empty string.');
    }

    try {
      // Data Saving
      const task = await this.prismaService.task.create({
        data: {
          name: dto.name,
          // Ajoutez d'autres champs ici si nécessaire
        },
      });

      return task;
    } catch (error) {
      console.error('Error saving task:', error);
      throw new InternalServerErrorException('An error occurred while saving the task.');
    }
  }
}