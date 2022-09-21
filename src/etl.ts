require('dotenv/config');

import { dataSource } from './datasource';
import loadCities from './loaders/loadCities';
import loadDiagnostics from './loaders/loadDiagnostics';
import loadProcedures from './loaders/loadProcedures';
import loadSus from './loaders/loadSus';

async function execute() {
  const dimensions = await dataSource.manager.transaction(async (tx) => {
    const cities = await loadCities(tx);
    const procedures = await loadProcedures(tx);
    const diagnostics = await loadDiagnostics(tx);

    return { cities, procedures, diagnostics };
  });
  await dataSource.manager.transaction((tx) => loadSus(tx, dimensions));
}

execute().catch(console.error);
