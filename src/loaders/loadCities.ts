import { join } from 'path';
import loadOdsAndExec from '../helpers/loadOdsAndExec';
import { IBGE_STATE_CODE } from '../constants';
import { EntityManager } from 'typeorm';
import { City } from '../models/city';

interface IbgeCity {
  UF: string;
  Município: string;
  Nome_Município: string;
  'Código Município Completo': string;
}

export default async function loadCities(manager: EntityManager) {
  const path = join(
    __dirname,
    '..',
    '..',
    'datasets',
    'dimensions',
    'ibge_cities.ods',
  );
  const repo = manager.getRepository(City);
  const cities: City[] = [];
  await loadOdsAndExec({
    path,
    exec: async (city: IbgeCity) => {
      if (IBGE_STATE_CODE != city.UF) {
        return undefined;
      }

      cities.push(
        repo.create({
          id: city['Código Município Completo'],
          name: city.Nome_Município,
        }),
      );
    },
  });

  return repo.save(cities);
}
