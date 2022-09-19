import { join } from "path";
import loadOdsAndExec from "../helpers/loadOdsAndExec";
import { IBGE_STATE_CODE } from "../constants";

interface IbgeCity {
  UF: string;
  Município: string;
  Nome_Município: string;
}

export default async function loadCities() {
  const path = join(
    __dirname,
    "..",
    "..",
    "datasets",
    "dimensions",
    "ibge_cities.ods"
  );
  await loadOdsAndExec({ path, exec });
}

async function exec(city: IbgeCity) {
  if (IBGE_STATE_CODE != city.UF) {
    return undefined;
  }

  // Save
}
