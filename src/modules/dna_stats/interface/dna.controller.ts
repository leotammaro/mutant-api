import { Controller, Get } from '@nestjs/common';
import { DnaStatsService } from '../application/dna.stats.service';
import { ApiResponse } from '@nestjs/swagger';

@Controller('dna')
export class DnaController {
  constructor(private readonly statsService: DnaStatsService) {}

  @ApiResponse({
    status: 200,
    example: { humans_count: 0, mutants_count: 0, ratio: 0 },
    description: 'The stat from mutant and humans dnas',
  })
  @Get('stats')
  getAllStats() {
    return this.statsService.getStats();
  }
}
