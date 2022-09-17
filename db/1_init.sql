CREATE TABLE IF NOT EXISTS cities (
	id TEXT PRIMARY KEY NOT NULL,
	name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS diagnostics (
  id VARCHAR(8) PRIMARY KEY NOT NULL,
  name TEXT NOT NULL
);

-- Masculino 1 | Feminino 2
CREATE TYPE gender_enum AS ENUM('M', 'F');

CREATE TABLE IF NOT EXISTS pacients (
  id UUID PRIMARY KEY NOT NULL,
  gender gender_enum NOT NULL,
  age INT NOT NULL,
  is_dead BOOLEAN NOT NULL,
  nationality VARCHAR NOT NULL,
  children_count INT NOT NULL,
  ethnic TEXT NOT NULL,
  role TEXT NOT NULL,
  education_level TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS health_organizations (
  id VARCHAR(10) PRIMARY KEY NOT NULL,
  name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS procedures_t (
  id VARCHAR(10) PRIMARY KEY NOT NULL,
  name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS hospitalizations (
  id VARCHAR(10) PRIMARY KEY NOT NULL,
  pacient_id UUID NOT NULL,
  pacient_city_id VARCHAR(8) NOT NULL,
  diagnostic_id VARCHAR(8) NOT NULL,
  health_organization_id VARCHAR(10) NOT NULL,
  procedure_id VARCHAR(10) NOT NULL,
  amount BIGINT NOT NULL,
  daily_internated INT NOT NULL,
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  daily_with_companion INT NOT NULL,
  CONSTRAINT fk_hospitalizations_pacient_id
    FOREIGN KEY(pacient_id)
      REFERENCES pacients(id),
  CONSTRAINT fk_hospitalizations_pacient_city_id
    FOREIGN KEY(pacient_city_id)
      REFERENCES cities(id),
  CONSTRAINT fk_hospitalizations_diagnostic_id
    FOREIGN KEY(diagnostic_id)
      REFERENCES diagnostics(id),
  CONSTRAINT fk_hospitalizations_health_organization_id
    FOREIGN KEY(health_organization_id)
      REFERENCES health_organizations(id),
  CONSTRAINT fk_hospitalizations_procedure_id
    FOREIGN KEY(procedure_id)
      REFERENCES procedures_t(id)
);