import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Budget } from './budget.entity';

@Injectable()
export class BudgetsService {
  constructor(
    @InjectRepository(Budget)
    private budgetsRepository: Repository<Budget>,
  ) {}

  async create(budget: Budget): Promise<Budget> {
    return this.budgetsRepository.save(budget);
  }

  async findAll(userId: number): Promise<Budget[]> {
    return this.budgetsRepository.find({ where: { user: { id: userId } } });
  }

  async findOne(id: number): Promise<Budget> {
    const budget = await this.budgetsRepository.findOne({ where: { id } });
    if (!budget) {
      throw new NotFoundException(`Budget with ID ${id} not found`);
    }
    return budget;
  }

  async update(id: number, budget: Budget): Promise<Budget> {
    await this.budgetsRepository.update(id, budget);
    const updatedBudget = await this.budgetsRepository.findOne({
      where: { id },
    });
    if (!updatedBudget) {
      throw new NotFoundException(`Budget with ID ${id} not found`);
    }
    return updatedBudget;
  }

  async remove(id: number): Promise<void> {
    const result = await this.budgetsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Budget with ID ${id} not found`);
    }
  }
}
