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
}

export interface IMatrixHelper {
  hasIndenticalLetters(arrayToVerify: string[]): boolean;
  convertArrayOfStringsToMatrix(array: string[]): string[][];
}

export const MATRIX_HELPER = 'MATRIX_HELPER';

export const matrixHelperProvider: Provider = {
  provide: MATRIX_HELPER,
  useClass: MatrixHelper,
};
