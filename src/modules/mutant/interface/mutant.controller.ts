import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { MutantDto } from '../application/dto/mutant.dto';
import { MutantService } from '../application/services/mutant.service';

@Controller('mutant')
export class MutantController {
  constructor(private readonly mutantService: MutantService) {}

  @HttpCode(200)
  @Get('')
  getallMutants() {
    return this.mutantService.getAll();
  }

  @HttpCode(200)
  @Post()
  create(@Body() mutantDto: MutantDto) {
    return this.mutantService.validateMutant(mutantDto.dna);
  }

  @HttpCode(200)
  @Get('stats')
  getMutantStats(@Body() mutantDto: MutantDto) {
    return this.mutantService.validateMutant(mutantDto.dna);
  }
}
