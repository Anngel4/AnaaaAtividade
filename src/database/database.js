import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('missoes.db');

export function criarTabela() {
  try {
    db.execSync(`
      CREATE TABLE IF NOT EXISTS missoes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT NOT NULL,
        xp INTEGER NOT NULL
      );
    `);

    console.log('Tabela missoes criada/verificada.');
  } catch (erro) {
    console.log('Erro ao criar tabela:', erro);
  }
}

export default db;