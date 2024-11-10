import { Injectable, Provider } from '@nestjs/common';

@Injectable()
export class ColumnsExtractor implements IColumnsExtractor {
  getColumns(matrix: string[][]): string[][] {
    return matrix[0].map((_, i) => matrix.map((row) => row[i]));
  }
}

export interface IColumnsExtractor {
  getColumns(matrix: string[][]): string[][];
}

export const COLUMNS_EXTRACTOR = 'COLUMNS_EXTRACTOR';

export const columnsExtractorProvider: Provider = {
  provide: 'COLUMNS_EXTRACTOR',
  useClass: ColumnsExtractor,
};
