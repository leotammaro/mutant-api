import { Controller, Get } from '@nestjs/common';
import { DnaStatsService } from '../application/dna.stats.service';

@Controller('dna')
export class DnaController {
  constructor(private readonly statsService: DnaStatsService) {}

  @Get('stats')
  getAllStats() {
    return this.statsService.getStats();
  }
}
