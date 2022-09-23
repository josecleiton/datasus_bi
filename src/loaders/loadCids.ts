import { join } from 'path';
import { EntityManager } from 'typeorm';
import loadCsvAndExec from '../helpers/loadCsvAndExec';
import { Cid } from '../models/cid';

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
    delimiter: ';',
    exec: async (cid: CidRaw) => {
      console.log(cid);
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
