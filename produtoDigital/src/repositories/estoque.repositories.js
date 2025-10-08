import db from "../config/database.js";

db.run(`CREATE TABLE IF NOT EXISTS estoque (
  id_estoque INTEGER PRIMARY KEY AUTOINCREMENT,
  quantidade INTEGER,
  id_produto INTEGER,
  FOREIGN KEY (id_produto) REFERENCES produto(id_produto)
)`);

function createEstoqueRepository(produtoId, quantidade) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO estoque (id_produto, quantidade) 
       VALUES (?, ?)`,
      [produtoId, quantidade],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID,produtoId, quantidade });
        }
      }
    );
  });
}

function findAllEstoquesRepository() {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT e.id_estoque, e.id_produto, p.nome_produto, p.descricao, e.quantidade
       FROM estoque e
       INNER JOIN produto p on p.id_produto = e.id_produto
      `,
      [],
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      }
    );
  });
}

function findEstoqueByIdRepository(estoqueId) {
  return new Promise((resolve, reject) => {
    db.get(`SELECT e.id_estoque, e.id_produto, p.nome_produto, p.descricao, e.quantidade
            FROM estoque e
            INNER JOIN produto p on p.id_produto = e.id_produto 
            WHERE e.id_estoque = ?`, [estoqueId], 
    (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

function findQuantidadeEstoqueByIdRepository(produtoId) {
  return new Promise((resolve, reject) => {
    db.get(`SELECT e.id_produto, e.quantidade
            FROM estoque e
            WHERE e.id_produto = ?`, [produtoId], 
    (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}


function updateEstoqueRepository(updatedEstoque, estoqueId) {
  return new Promise((resolve, reject) => {
    const fields = ["quantidade"];
    let query = "UPDATE estoque SET";
    const values = [];

    fields.forEach((field) => {
      if (updatedEstoque[field] !== undefined) {
        query += ` ${field} = ?,`;
        values.push(updatedEstoque[field]);
      }
    });

    query = query.slice(0, -1);

    query += " WHERE id_estoque = ?";
    values.push(estoqueId);
    db.run(query, values, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ id: estoqueId, ...updatedEstoque });
      }
    });
  });
}

function updateEstoqueByIdProdutoRepository(produtoId, saldo) {
  let updatedEstoque = {
    quantidade: saldo 
  }
  return new Promise((resolve, reject) => {
    const fields = ["quantidade"];
    let query = "UPDATE estoque SET";
    const values = [];

    fields.forEach((field) => {
      if (updatedEstoque[field] !== undefined) {
        query += ` ${field} = ?,`;
        values.push(updatedEstoque[field]);
      }
    });

    query = query.slice(0, -1);

    query += " WHERE id_produto = ?";
    values.push(produtoId);
    db.run(query, values, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ id: produtoId, ...updatedEstoque });
      }
    });
  });
}


function deleteEstoqueRepository(estoqueId) {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM estoque WHERE id_estoque = ?`, [estoqueId], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ message: "estoque deleted successfully", estoqueId });
      }
    });
  });
}

export default {
  createEstoqueRepository,
  findAllEstoquesRepository,
  findEstoqueByIdRepository,
  findQuantidadeEstoqueByIdRepository,
  updateEstoqueByIdProdutoRepository,
  updateEstoqueRepository,
  deleteEstoqueRepository,
};