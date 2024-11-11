import { Injectable, NotFoundException } from '@nestjs/common';

import { DnaStatsRepository } from '../infrastructure/database/dna.stats.repository';
import { DnaStats } from '../infrastructure/database/dna.stats.entity';

@Injectable()
export class DnaStatsService implements IDnaStatsService {
  constructor(private readonly repository: DnaStatsRepository) {}
  isvalidDna(rows: string[][], columns: string[][]) {
    if (rows.length !== columns.length) {
      throw new NotFoundException(
        'This dna is not valid for a human or a mutant. Verify that it is an NXN type dna.',
      );
    }

    return true;
  }

  async updateMutantsCount() {
    return await this.repository.updateMutantsCount();
  }

  async updateHumansCount() {
    return await this.repository.updateHumansCount();
  }

  async getStats(): Promise<Partial<DnaStats> | DnaStats> {
    const stats = await this.repository.getAllStats();
    if (!stats) {
      return {
        humans_count: 0,
        mutants_count: 0,
        ratio: 0,
      };
    }
    return stats;
  }
}

export interface IDnaStatsService {
  isvalidDna(rows: string[][], columns: string[][]): boolean;
}
