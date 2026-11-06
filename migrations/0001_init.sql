CREATE TABLE panel (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE CHECK (length(email) <= 254),
  country TEXT NOT NULL CHECK (length(country) = 2),
  assistants TEXT NOT NULL CHECK (length(assistants) <= 80),
  consent_at TEXT NOT NULL CHECK (length(consent_at) <= 30),
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) CHECK (length(created_at) <= 30)
);

CREATE TABLE buyers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL CHECK (length(name) <= 100),
  org TEXT NOT NULL CHECK (length(org) <= 120),
  role TEXT NOT NULL CHECK (length(role) <= 100),
  email TEXT NOT NULL UNIQUE CHECK (length(email) <= 254),
  segment TEXT NOT NULL CHECK (length(segment) <= 20),
  budget TEXT NOT NULL DEFAULT '' CHECK (length(budget) <= 20),
  note TEXT NOT NULL DEFAULT '' CHECK (length(note) <= 500),
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) CHECK (length(created_at) <= 30)
);
