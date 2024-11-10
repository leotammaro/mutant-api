import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({
  name: 'ValidateThatAllArgumentsHaveTheSameLength',
})
@Injectable()
export class ValidateThatAllArgumentsHaveTheSameLength
  implements ValidatorConstraintInterface
{
  validate(dna: string[]) {
    return dna.every((dnaStr) => dnaStr.length === dna[0].length);
  }

  defaultMessage() {
    return 'All arguments that are part of the dna must have the same length.';
  }
}
