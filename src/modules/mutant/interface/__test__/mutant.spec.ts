import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';

import * as request from 'supertest';
import {
  INVALID_DNA_TYPE,
  MUTANT_DNA,
  NON_MUTANT_DNA,
  NOT_HUMAN_DNA,
} from './helpers/mutant.constants';
import { DnaStatsRepository } from 'src/modules/dna_stats/infrastructure/database/dna.stats.repository';

const dnaStatsMockProvider = {
  findStats: jest.fn(),
  updateMutantsCount: jest.fn(),
  updateHumansCount: jest.fn(),
  getAllStats: jest.fn(),
};

describe('Mutants module', () => {
  let app: INestApplication;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(DnaStatsRepository)
      .useValue(dnaStatsMockProvider)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  describe('POST [mutant]', () => {
    it('should validate mutant dna and return mutant dna value on response', () => {
      return request(app.getHttpServer())
        .post('/mutant')
        .send({
          dna: MUTANT_DNA,
        })
        .expect(200)
        .then(({ body }) => {
          const dnaResponseExpected = expect.arrayContaining(MUTANT_DNA);
          expect(body).toEqual(dnaResponseExpected);
        });
    });
    it('should validate the dna length and type of each argument', async () => {
      return request(app.getHttpServer())
        .post('/mutant')
        .send({
          dna: INVALID_DNA_TYPE,
        })
        .expect(400)
        .then(({ body }) => {
          expect(body.message[0]).toBe(
            'All arguments that are part of the dna must have the same length.',
          );
          expect(body.message[1]).toBe('each value in dna must be a string');
        });
    });

    it('should validate the dna length to be human', () => {
      return request(app.getHttpServer())
        .post('/mutant')
        .send({
          dna: NOT_HUMAN_DNA,
        })
        .expect(404)
        .then(({ body }) => {
          expect(body.message).toBe(
            'This dna is not valid for a human or a mutant. Verify that it is an NXN type dna.',
          );
        });
    });
    it('should return fordbidden response because its non-mutant', () => {
      return request(app.getHttpServer())
        .post('/mutant')
        .send({
          dna: NON_MUTANT_DNA,
        })
        .expect(403);
    });
  });

  describe('GET [mutant stats]', () => {
    it('should get stats from ', async () => {
      dnaStatsMockProvider.getAllStats.mockResolvedValue({
        mutants_count: 0,
        humans_count: 0,
        ratio: 0,
      });
      return request(app.getHttpServer())
        .get('/dna/stats')
        .expect(200)
        .then(({ body }) => {
          expect(body).toEqual({
            mutants_count: 0,
            humans_count: 0,
            ratio: 0,
          });
        });
    });
  });

  afterEach(async () => {
    await app.close();
  });
});
