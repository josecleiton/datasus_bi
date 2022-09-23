require('dotenv/config');

import { dataSource } from './datasource';
import loadCities from './loaders/loadCities';
import loadCids from './loaders/loadCids';
import loadSus from './loaders/loadSus';
import loadProcedures from './loaders/loadProcedures';

async function execute() {
  const ds = await dataSource.initialize();
  const dimensions = await ds.manager.transaction(async (tx) => {
    return {
      cities: await loadCities(tx),
      cids: await loadCids(tx),
      procedures: await loadProcedures(tx),
    };
  });
  console.log(dimensions);
  await ds.manager.transaction((tx) => loadSus(tx, dimensions));
}

execute().catch(console.error);
