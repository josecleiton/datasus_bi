import { readdirSync } from 'fs';
import { join } from 'path';
import { EntityManager } from 'typeorm';

import loadCsvAndExec from '../helpers/loadCsvAndExec';
import { HealthOrganization } from '../models/health-organization';

interface CNES {
  CNES: string;
  CPF_CNPJ: string;
}

export default async function loadHealthOrganization(manager: EntityManager) {
  const path = join(__dirname, '..', '..', 'datasets', 'dimensions', 'cnes');

  const repo = manager.getRepository(HealthOrganization);

  const healthOrganizationMatrix = await Promise.all(
    readdirSync(path).map(async (file) => {
      const fullPath = join(path, file);
      console.log('Loading file %s', fullPath);

      return loadCsvAndExec<CNES, HealthOrganization>({
        path: fullPath,
        exec: async (value) =>
          repo.create({ id: value.CNES, document: value.CPF_CNPJ }),
      });
    }),
  );

  const organizations: HealthOrganization[] = [];
  for (const orgs of healthOrganizationMatrix) {
    await manager.transaction((tx) => tx.save(orgs));
    console.log('Saved %d', orgs.length);
    organizations.push(...orgs);
  }

  console.log('Saved %d health orgs', organizations.length);

  return organizations;
}
