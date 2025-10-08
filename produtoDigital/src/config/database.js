import sqlite3 from "sqlite3";

const db = new sqlite3.Database("library_cb.sqlite", (err) => {
    if (err) {
        console.error("Erro ao conectar ao banco de dados: ", err.message);
    } else {
        console.log("Conectado com sucesso ao banco de dados SQLite");
    }
})

db.run('PRAGMA foreign_keys = ON;', (err) => {
  if (err) {
    console.error('Erro ao ativar chaves estrangeiras:', err);
  }
});

export default db;