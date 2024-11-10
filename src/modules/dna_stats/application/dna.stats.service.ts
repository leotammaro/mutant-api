import { Injectable, NotFoundException } from '@nestjs/common';

import { DnaStatsRepository } from '../infrastructure/database/dna.stats.repository';

@Injectable()
export class DnaStatsService implements IDnaStatsService {
  constructor(private readonly repository: DnaStatsRepository) {}
  isHuman(rows: string[][], columns: string[][]) {
    if (
      rows.length !== columns.length ||
      rows.length < 4 ||
      columns.length < 4
    ) {
      throw new NotFoundException('Its not human');
    }

    return true;
  }

  async updateMutantsCount() {
    return await this.repository.updateMutantsCount();
  }

  async updateHumansCount() {
    return await this.repository.updateHumansCount();
  }

  async getStats() {
    return await this.repository.getAllStats();
  }
}

export interface IDnaStatsService {
  isHuman(rows: string[][], columns: string[][]): boolean;
}
