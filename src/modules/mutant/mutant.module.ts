import { Module } from '@nestjs/common';
import { MutantController } from './interface/mutant.controller';
import { MutantService } from './application/services/mutant.service';
import { matrixHelperProvider } from './application/validators/matrix.helper';
import { rowsExtractorProvider } from './application/validators/sequences/rows.validators';
import { columnsExtractorProvider } from './application/validators/sequences/columns.validators';
import { diagonalsExtractorProvider } from './application/validators/sequences/diagonals.validators';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mutant } from './infrastructure/database/mutant.entity';
import { DnaModule } from '../dna_stats/dna.module';

@Module({
  imports: [TypeOrmModule.forFeature([Mutant]), DnaModule],
  controllers: [MutantController],
  providers: [
    MutantService,
    matrixHelperProvider,
    rowsExtractorProvider,
    columnsExtractorProvider,
    diagonalsExtractorProvider,
  ],
  exports: [
    MutantService,
    matrixHelperProvider,
    rowsExtractorProvider,
    columnsExtractorProvider,
    diagonalsExtractorProvider,
  ],
})
export class MutantModule {}
