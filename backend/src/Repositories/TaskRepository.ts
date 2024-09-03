import { Injectable } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service'; // Assurez-vous que le chemin est correct
import { Prisma } from '@prisma/client';

@Injectable()
export default class TaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.task.findMany();
  }

  async delete(id: number) {
    return this.prisma.task.delete({
      where: { id },
    });
  }

  async save(
    data: Prisma.XOR<Prisma.TaskCreateInput, Prisma.TaskUncheckedCreateInput> |
          Prisma.XOR<Prisma.TaskUpdateInput, Prisma.TaskUncheckedUpdateInput>,
  ) {
    if (data.id) {
      return this.prisma.task.update({
        where: { id: data.id },
        data,
      });
    } else {
      return this.prisma.task.create({ data });
    }
  }
}