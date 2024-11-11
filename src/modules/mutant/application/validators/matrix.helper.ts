import { Injectable, Provider } from '@nestjs/common';

@Injectable()
export class MatrixHelper implements IMatrixHelper {
  hasIndenticalLetters(arrayToVerify: string[]): boolean {
    for (let i = 0; i < arrayToVerify.length - 3; i++) {
      if (
        arrayToVerify[i] === arrayToVerify[i + 1] &&
        arrayToVerify[i] === arrayToVerify[i + 2] &&
        arrayToVerify[i] === arrayToVerify[i + 3]
      ) {
        return true;
      }
    }
    return false;
  }

  convertArrayOfStringsToMatrix(array: string[]): string[][] {
    return array.map((row) => row.split(''));
  }

  hasSufficientIdenticalSequences(
    dna: string[],
    rows: string[][],
    columns: string[][],
    diagonals: string[][],
  ): boolean {
    const MIN_SEQUENCE_TO_BE_MUTANT = 2;
    let totalOfSequences = 0;

    for (let i = 0; i < dna.length; i++) {
      if (this.hasIndenticalLetters(rows[i])) {
        totalOfSequences += 1;
      }
      if (this.hasIndenticalLetters(columns[i])) {
        totalOfSequences += 1;
      }
      if (this.hasIndenticalLetters(diagonals[i])) {
        totalOfSequences += 1;
      }
      console.log(totalOfSequences);

      if (totalOfSequences >= MIN_SEQUENCE_TO_BE_MUTANT) {
        return true;
      }
    }
    return false;
  }
}

export interface IMatrixHelper {
  hasIndenticalLetters(arrayToVerify: string[]): boolean;
  convertArrayOfStringsToMatrix(array: string[]): string[][];
  hasSufficientIdenticalSequences(
    dna: string[],
    columns: string[][],
    rows: string[][],
    diagonals: string[][],
  ): boolean;
}

export const MATRIX_HELPER = 'MATRIX_HELPER';

export const matrixHelperProvider: Provider = {
  provide: MATRIX_HELPER,
  useClass: MatrixHelper,
};
