import { Injectable, Provider } from '@nestjs/common';

@Injectable()
export class RowsExtractor implements IRowsExtractor {
  constructor() {}
  getRows(matrix: string[][]) {
    return matrix;
  }
}

export interface IRowsExtractor {
  getRows(matrix: string[][]): string[][];
}

export const ROWS_EXTRACTOR = 'ROWS_EXTRACTOR';

export const rowsExtractorProvider: Provider = {
  provide: 'ROWS_EXTRACTOR',
  useClass: RowsExtractor,
};
