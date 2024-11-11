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
    const lettersAllowed = ['A', 'T', 'C', 'G'];
    const dnaToString = dna.join('').toUpperCase();
    if (!lettersAllowed.some((letter) => dnaToString.includes(letter))) {
      return false;
    }
    return dna.every((dnaStr) => dnaStr.length === dna[0].length);
  }

  defaultMessage() {
    return 'All arguments that are part of the dna must have the same length.';
  }
}

@ValidatorConstraint({
  name: 'ValidateTheAllowedLetter',
})
@Injectable()
export class ValidateTheAllowedLetter implements ValidatorConstraintInterface {
  validate(dna: string[]) {
    const DNA_PATTERN = /^[ATCG]+$/;
    return dna.every((row) => DNA_PATTERN.test(row));
  }

  defaultMessage() {
    return 'Only the letters A T C G are allowed.';
  }
}
