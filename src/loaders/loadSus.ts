import { parse } from 'date-fns';
import { readdirSync } from 'fs';
import { join } from 'path';
import { EntityManager } from 'typeorm';

import loadCsvAndExec from '../helpers/loadCsvAndExec';
import { City } from '../models/city';
import { Cid } from '../models/cid';
import { Gender } from '../models/enums/gender.enum';
import { Hospitalization } from '../models/hospitalization';
import { Pacient } from '../models/pacient';
import { Procedure } from '../models/procedure';

interface Dimensions {
  cities: City[];
  cids: Cid[];
  procedures: Procedure[];
}

interface RawHospitalization {
  IDADE: string;
  MORTE: string;
  NACIONAL: string;
  INSTRU: string;
  CBOR: string;
  CNES: string;
  RACA_COR: string;
  VAL_TOT: string;
  PROC_REA: string;
  DIAR_ACOM: string;
  QT_DIARIAS: string;
  N_AIH: string;
  SEXO: string;
  NASC: string;
  DI_INTER: string;
  NUM_FILHOS: string;
  DIAG_PRINC: string;
  MUNIC_RES: string;
}

export default async function loadSus(
  manager: EntityManager,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  dimensions: Dimensions,
) {
  const path = join(__dirname, '..', '..', 'datasets', 'sus');

  const repo = manager.getRepository(Hospitalization);
  const pacientRepo = manager.getRepository(Pacient);

  const hospitalizationsMatrix = await Promise.all(
    readdirSync(path).map(async (file) => {
      const result: Hospitalization[] = [];
      await loadCsvAndExec<RawHospitalization, Hospitalization>({
        path: file,
        exec: async (value) =>
          repo.create({
            id: value.N_AIH,
            amount: Math.trunc(parseFloat(value.VAL_TOT) * 100),
            date: parse(value.DI_INTER, 'YYYYmmdd', 0),
            dailyInternated: parseInt(value.QT_DIARIAS),
            dailyWithCompanion: parseInt(value.DIAR_ACOM),
            procedureId: value.PROC_REA,
            diagnosticId: value.DIAG_PRINC,
            pacientCityId: value.MUNIC_RES,
            pacient: pacientRepo.create({
              age: parseInt(value.IDADE),
              childCount: parseInt(value.NUM_FILHOS),
              educationLevel: value.INSTRU,
              ethnic: value.RACA_COR,
              gender: value.SEXO === '1' ? Gender.male : Gender.female,
              isDead: value.MORTE === '1' ? true : false,
              nationality: value.NACIONAL,
              role: value.CBOR,
            }),
          }),
      });

      return result;
    }),
  );

  return repo.save(hospitalizationsMatrix.flat());
}
