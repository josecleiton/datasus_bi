require('dotenv/config');

import { dataSource } from './datasource';
import loadCities from './loaders/loadCities';
import loadCids from './loaders/loadCids';
import loadSus from './loaders/loadSus';

async function execute() {
  const dimensions = await dataSource.manager.transaction(async (tx) => {
    return { cities: await loadCities(tx), cids: await loadCids(tx) };
  });
  await dataSource.manager.transaction((tx) => loadSus(tx, dimensions));
}

execute().catch(console.error);
