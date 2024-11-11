import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { MutantModule } from './modules/mutant/mutant.module';
import { DnaModule } from './modules/dna_stats/dna.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      autoLoadEntities: true,
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT!,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: false,
      ssl: true,
    }),
    MutantModule,
    DnaModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
