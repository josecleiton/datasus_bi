import { join } from 'path';
import loadCsvAndExec from 'src/helpers/loadCsvAndExec';
import { Diagnostic } from 'src/models/diagnostic';
import { EntityManager } from 'typeorm';

interface Cid {
  codigo: string;
  descricao: string;
}

export default async function loadDiagnostics(manager: EntityManager) {
  const path = join(__dirname, '..', '..', 'datasets', 'dimensions', 'cid.csv');
  const repo = manager.getRepository(Diagnostic);
  const cids: Diagnostic[] = [];

  await loadCsvAndExec({
    path,
    exec: async (cid: Cid) => {
      cids.push(
        repo.create({
          id: cid.codigo,
          name: cid.descricao,
        }),
      );
    },
  });

  return repo.save(cids);
}
