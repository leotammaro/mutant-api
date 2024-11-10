import { Module } from '@nestjs/common';
import { DnaStatsService } from './application/dna.stats.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DnaStats } from './infrastructure/database/dna.stats.entity';
import { DnaStatsRepository } from './infrastructure/database/dna.stats.repository';
import { DnaController } from './interface/dna.controller';

@Module({
  controllers: [DnaController],
  imports: [TypeOrmModule.forFeature([DnaStats])],
  providers: [DnaStatsService, DnaStatsRepository],
  exports: [DnaStatsService],
})
export class DnaModule {}
