import { readdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import loadCsvAndExec from './helpers/loadCsvAndExec';

async function execute() {
  const path = join(__dirname, '..', 'datasets', 'sus');

  let result = '';
  for (const file of readdirSync(path)) {
    const fullpath = join(path, file);
    const registers = await loadCsvAndExec<{ N_AIH: string }, string>({
      path: fullpath,
      exec: async (value) => value.N_AIH,
    });
    result += `${file} ${registers.length}\n`;
  }

  writeFileSync(join(__dirname, '..', 'report.log'), result);
}

execute().catch(console.error);
