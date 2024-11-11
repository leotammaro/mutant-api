import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import {
  IRowsExtractor,
  ROWS_EXTRACTOR,
} from '../validators/sequences/rows.validators';
import {
  COLUMNS_EXTRACTOR,
  IColumnsExtractor,
} from '../validators/sequences/columns.validators';
import {
  DIAGONALS_EXTRACTOR,
  IDiagonalsExtractor,
} from '../validators/sequences/diagonals.validators';
import { IMatrixHelper, MATRIX_HELPER } from '../validators/matrix.helper';
import { DnaStatsService } from '../../../dna_stats/application/dna.stats.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Mutant } from '../../infrastructure/database/mutant.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MutantService {
  constructor(
    @Inject(ROWS_EXTRACTOR)
    private readonly rowsExtractor: IRowsExtractor,
    @Inject(COLUMNS_EXTRACTOR)
    private readonly columnsExtractor: IColumnsExtractor,
    @Inject(DIAGONALS_EXTRACTOR)
    private readonly diagonalsExtractor: IDiagonalsExtractor,
    @Inject(MATRIX_HELPER)
    private readonly matrixHelper: IMatrixHelper,
    private readonly statsService: DnaStatsService,
    @InjectRepository(Mutant)
    private readonly repository: Repository<Mutant>,
  ) {}

  async getAll() {
    return await this.repository.find();
  }
  isMutant(dna: string[]): boolean {
    const matrix = this.matrixHelper.convertArrayOfStringsToMatrix(dna);
    const MIN_SEQUENCE_TO_BE_MUTANT = 2;
    const rows = this.rowsExtractor.getRows(matrix);
    const columns = this.columnsExtractor.getColumns(matrix);

    this.statsService.isvalidDna(rows, columns);

    const diagonals = this.diagonalsExtractor.getDiagonals(matrix);
    let totalOfSequences = 0;

    for (let i = 0; i < dna.length; i++) {
      if (
        this.matrixHelper.hasIndenticalLetters(rows[i]) ||
        this.matrixHelper.hasIndenticalLetters(columns[i]) ||
        this.matrixHelper.hasIndenticalLetters(diagonals[i])
      ) {
        totalOfSequences += 1;

        if (totalOfSequences >= MIN_SEQUENCE_TO_BE_MUTANT) {
          return true;
        }
      }
    }
    return false;
  }

  async validateMutant(dna: string[]): Promise<string[]> {
    if (this.isMutant(dna)) {
      await this.repository.save({
        dna,
      });
      await this.statsService.updateMutantsCount();
      return dna;
    }
    await this.statsService.updateHumansCount();
    throw new ForbiddenException();
  }
}
