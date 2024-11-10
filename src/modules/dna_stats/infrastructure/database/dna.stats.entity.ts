import { Column, Entity, PrimaryColumn } from 'typeorm';

export enum STATS_KEY {
  stats = 'STATS',
}

@Entity()
export class DnaStats {
  @PrimaryColumn({ default: STATS_KEY.stats })
  id: string;

  @Column({ default: 0, nullable: false })
  humans_count: number;

  @Column({ default: 0, nullable: false })
  mutants_count: number;

  @Column({ type: 'decimal', scale: 2, precision: 5 })
  ratio: number;
}
