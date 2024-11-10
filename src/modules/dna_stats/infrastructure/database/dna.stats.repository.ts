import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DnaStats, STATS_KEY } from './dna.stats.entity';

@Injectable()
export class DnaStatsRepository {
  constructor(
    @InjectRepository(DnaStats)
    private readonly repository: Repository<DnaStats>,
  ) {}

  async getAllStats() {
    return await this.repository.findOne({
      where: { id: STATS_KEY.stats },
    });
  }

  async updateMutantsCount() {
    const stats = await this.findStats();

    if (!stats) {
      return await this.initializeStats(true);
    }

    return await this.repository.update(
      { id: STATS_KEY.stats },
      {
        mutants_count: () => 'mutants_count + 1',
        ratio: () => '(mutants_count + 1) / (humans_count + mutants_count + 1)',
      },
    );
  }

  async updateHumansCount() {
    const stats = await this.findStats();
    if (!stats) {
      return await this.initializeStats(false);
    }

    return await this.repository.update(
      { id: STATS_KEY.stats },
      {
        humans_count: () => 'humans_count +1',
        ratio: () => 'mutants_count /(humans_count + 1 + mutants_count)',
      },
    );
  }

  private async initializeStats(isMutant: boolean) {
    return await this.repository.save({
      id: STATS_KEY.stats,
      humans_count: !isMutant ? 1 : 0,
      mutants_count: isMutant ? 1 : 0,
      ratio: isMutant ? 1.0 : 0.0,
    });
  }

  private async findStats() {
    return await this.repository.findOne({
      where: { id: STATS_KEY.stats },
    });
  }
}
