import * as fs from 'fs';
import csv from 'csv-parse';

interface LoadCsvOptions<TInput, TResult> {
  path: string;
  delimiter?: string;
  exec: (value: TInput) => Promise<TResult>;
}

export default function loadCsvAndExec<TInput, TResult = unknown>({
  path,
  exec,
  delimiter = ',',
}: LoadCsvOptions<TInput, TResult>) {
  return new Promise<TResult[]>((resolve, reject) => {
    const promises: Promise<TResult>[] = [];
    fs.createReadStream(path)
      .pipe(csv.parse({ delimiter }))
      .on('data', (serializedRow: TInput) => promises.push(exec(serializedRow)))
      .on('end', async () => {
        try {
          resolve(await Promise.all(promises));
        } catch (e) {
          reject(e);
        }
      });
  });
}
