-- 1. create DB
sqlite3 mySQLiteDB.db

-- 2. create tables 
CREATE TABLE IF NOT EXISTS Jours (
    date_id TEXT PRIMARY KEY,
    vente_piece INT,
    bouteille_vente INT,
    total_eaux INT,
    group_use 
);