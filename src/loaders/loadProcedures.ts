import { join } from 'path';
import loadCsvAndExec from 'src/helpers/loadCsvAndExec';
import { Procedure } from 'src/models/procedure';
import { EntityManager } from 'typeorm';

interface RawProcedure {
  codproc: string;
  nome: string;
}

export default async function loadProcedures(manager: EntityManager) {
  const path = join(
    __dirname,
    '..',
    '..',
    'datasets',
    'dimensions',
    'procedures.csv',
  );
  const repo = manager.getRepository(Procedure);
  const procedures: Procedure[] = [];

  await loadCsvAndExec({
    path,
    exec: async (value: RawProcedure) => {
      procedures.push(
        repo.create({
          id: value.codproc,
          name: value.nome,
        }),
      );
    },
  });

  return repo.save(procedures);
}
