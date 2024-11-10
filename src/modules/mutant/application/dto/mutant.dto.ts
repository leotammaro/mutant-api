import { IsArray, IsString, Validate } from 'class-validator';
import { ValidateThatAllArgumentsHaveTheSameLength } from '../validators/dna.arguments.validator';

export class MutantDto {
  @IsArray()
  @IsString({ each: true })
  @Validate(ValidateThatAllArgumentsHaveTheSameLength)
  dna: string[];
}
