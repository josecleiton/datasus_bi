import loadCities from "./loaders/loadCities";

async function execute() {
  await Promise.all(loadCities(), loadProcedures(), loadDiagnostics());
  await loadSus();
}
