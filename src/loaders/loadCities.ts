import { join } from 'path';
import { EntityManager } from 'typeorm';
import { City } from '../models/city';
import loadCsvAndExec from '../helpers/loadCsvAndExec';

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
    'ibge_cities.csv',
  );
  const repo = manager.getRepository(City);
  const cities: City[] = await loadCsvAndExec({
    path,
    exec: async (city: IbgeCity) =>
      repo.create({
        id: city['Código Município Completo'],
        name: city.Nome_Município,
      }),
  });

  return repo.save(cities);
}
