import { join } from 'path';
import loadCsvAndExec from 'src/helpers/loadCsvAndExec';
import { Cid } from 'src/models/cid';
import { EntityManager } from 'typeorm';

interface CidRaw {
  codigo: string;
  descricao: string;
}

export default async function loadDiagnostics(manager: EntityManager) {
  const path = join(__dirname, '..', '..', 'datasets', 'dimensions', 'cid.csv');
  const repo = manager.getRepository(Cid);
  const cids: Cid[] = [];

  await loadCsvAndExec({
    path,
    exec: async (cid: CidRaw) => {
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
