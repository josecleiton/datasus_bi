import * as XLSX from "xlsx";
import { Readable } from "stream";

XLSX.stream.set_readable(Readable);

interface LoadOdsOptions<TInput, TResult> {
  path: string;
  exec: (row: TInput) => Promise<TResult>;
}

export default function loadOdsAndExec<TInput, TResult = unknown>({
  path,
  exec,
}: LoadOdsOptions<TInput, TResult>) {
  return new Promise<TResult[]>((resolve, reject) => {
    const promises: Promise<TResult>[] = [];
    XLSX.stream
      .to_json(XLSX.readFile(path))
      .on("data", (row: TInput) => promises.push(exec(row)))
      .on("end", async () => {
        try {
          resolve(await Promise.all(promises));
        } catch (e) {
          reject(e);
        }
      });
  });
}
