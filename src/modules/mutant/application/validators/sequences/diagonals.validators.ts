import { Injectable, Provider } from '@nestjs/common';

@Injectable()
export class DiagonalsExtractor implements IDiagonalsExtractor {
  MIN_DIAGONAL_LENGTH = 4;
  constructor() {}

  getDiagonals(matriz: string[][]): string[][] {
    const diagonals: string[][] = [];
    this.getDiagonalsFromTopLeftToBottomRight(diagonals, matriz);
    this.getDiagonalsFromTopRightToBottomLeft(diagonals, matriz);

    return diagonals;
  }
  private getDiagonalsFromTopLeftToBottomRight(
    accumulator: string[][],
    matrix: string[][],
  ): string[][] {
    const MATRIX_SIZE = matrix.length;
    const TOTAL_POSSIBLE_DIAGONALS = 2 * MATRIX_SIZE - 1;

    for (
      let diagonalIndex = 0;
      diagonalIndex < TOTAL_POSSIBLE_DIAGONALS;
      diagonalIndex++
    ) {
      const currentDiagonal: string[] = [];

      for (let row = 0; row < MATRIX_SIZE; row++) {
        const col = diagonalIndex - (MATRIX_SIZE - 1 - row);

        if (col >= 0 && col < MATRIX_SIZE) {
          currentDiagonal.push(matrix[row][col]);
        }
      }

      if (currentDiagonal.length >= this.MIN_DIAGONAL_LENGTH) {
        accumulator.push(currentDiagonal);
      }
    }
    return accumulator;
  }

  private getDiagonalsFromTopRightToBottomLeft(
    accumulator: string[][],
    matrix: string[][],
  ): string[][] {
    const MATRIX_SIZE = matrix.length;
    const TOTAL_POSSIBLE_DIAGONALS = 2 * MATRIX_SIZE - 1;

    for (
      let diagonalIndex = 0;
      diagonalIndex < TOTAL_POSSIBLE_DIAGONALS;
      diagonalIndex++
    ) {
      const currentDiagonal: string[] = [];

      for (let row = 0; row < MATRIX_SIZE; row++) {
        const col = diagonalIndex - row;

        if (col >= 0 && col < MATRIX_SIZE) {
          currentDiagonal.push(matrix[row][col]);
        }
      }

      if (currentDiagonal.length >= this.MIN_DIAGONAL_LENGTH) {
        accumulator.push(currentDiagonal);
      }
    }
    return accumulator;
  }
}

export interface IDiagonalsExtractor {
  getDiagonals(matrix: string[][]): string[][];
}
export const DIAGONALS_EXTRACTOR = 'DIAGONALS_EXTRACTOR';

export const diagonalsExtractorProvider: Provider = {
  provide: DIAGONALS_EXTRACTOR,
  useClass: DiagonalsExtractor,
};
