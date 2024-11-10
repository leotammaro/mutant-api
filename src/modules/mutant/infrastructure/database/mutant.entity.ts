import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Mutant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('simple-array')
  dna: string[];
}
