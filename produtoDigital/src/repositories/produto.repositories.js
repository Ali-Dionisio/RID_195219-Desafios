import db from "../config/database.js";

db.run(`
    CREATE TABLE IF NOT EXISTS 'produto' (
    id_produto INTEGER PRIMARY KEY AUTOINCREMENT,
    nome_produto TEXT NOT NULL ,
    descricao TEXT,
    preco FLOAT,
    UNIQUE (nome_produto)
)`);

function createProdutoRepository(newProduto){
    return new Promise((resolve, reject) => {
        const {nome_produto, descricao, preco} = newProduto;
        db.run(`
            INSERT INTO produto (nome_produto, descricao, preco) 
            VALUES (?, ?, ?)`,
            [nome_produto, descricao, preco],
        function (err) {
            if (err) {
                reject(err);
            } else {
                resolve({id: this.lastID, ...newProduto});
            }
        }
       );
    });
}

function findAllProdutosRepository() {
    return new Promise((resolve, reject) => {
        db.all(`
            SELECT * FROM produto`, [],
        (err, rows) =>{
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        })
    })
}

function findProdutoByIdRepository(produtoId) {
    return new Promise((resolve, reject) => {
        db.get(`
            SELECT * FROM produto WHERE id_produto = ?`, 
            [produtoId],
            (err, row) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            }
        )
    })
}

function updateProdutoRepository(updatedProduto, produtoId) {
  return new Promise((resolve, reject) => {
    const fields = ["nome_produto", "descricao", "preco"];
    let query = "UPDATE produto SET";
    const values = [];

    fields.forEach((field) => {
      if (updatedProduto[field] !== undefined) {
        query += ` ${field} = ?,`;
        values.push(updatedProduto[field]);
      }
    });

    query = query.slice(0, -1);

    query += " WHERE id_produto = ?";
    values.push(produtoId);
    db.run(query, values, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ id: produtoId, ...updatedProduto });
      }
    });
  });
}

function deleteProdutoRepository(produtoId){
    return new Promise((resolve, reject) => {
        db.run(`
            DELETE FROM produto WHERE id_produto = ?`,
            [produtoId],
            function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({message: "produto deleted successfully: ", produtoId})
                }
            }
        )
    })
}

function searchProdutosRepository(search) {
  return new Promise((resolve, reject) => {
    db.all(
      `
        SELECT * FROM produto WHERE nome_produto LIKE ? OR author LIKE ?
      `,
      [`%${search}%`, `%${search}%`],
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

export default {
    createProdutoRepository,
    findAllProdutosRepository,
    findProdutoByIdRepository,
    updateProdutoRepository,
    deleteProdutoRepository,
    searchProdutosRepository,  
}