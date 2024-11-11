import { IsArray, IsString, Validate } from 'class-validator';
import { ValidateThatAllArgumentsHaveTheSameLength } from '../validators/dna.arguments.validator';
import { ApiProperty } from '@nestjs/swagger';
import { MUTANT_DNA } from '../../interface/__test__/helpers/mutant.constants';

export class MutantDto {
  @ApiProperty({ example: MUTANT_DNA, description: 'Mutant or non-mutant DNA' })
  @IsArray()
  @IsString({ each: true })
  @Validate(ValidateThatAllArgumentsHaveTheSameLength)
  dna: string[];
}
