import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { MutantDto } from '../application/dto/mutant.dto';
import { MutantService } from '../application/services/mutant.service';
import { ApiResponse } from '@nestjs/swagger';
import { MUTANT_DNA } from './__test__/helpers/mutant.constants';

@Controller('mutant')
export class MutantController {
  constructor(private readonly mutantService: MutantService) {}

  @ApiResponse({
    status: 200,
    description: 'Mutant or non-mutant DNA',
    example: MUTANT_DNA,
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @HttpCode(200)
  @Post()
  create(@Body() mutantDto: MutantDto) {
    return this.mutantService.validateMutant(mutantDto.dna);
  }
}
