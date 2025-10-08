import db from "../config/database.js";

db.run(`CREATE TABLE IF NOT EXISTS pedido (
  id_pedido INTEGER PRIMARY KEY AUTOINCREMENT,
  id_produto INTEGER,
  id_cliente INTEGER,
  quantidade_pedido INTEGER,
  data_pedido DATE,
  status_pedido TEXT,
  FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente),
  FOREIGN KEY (id_produto) REFERENCES produto(id_produto)
)`);

function createPedidoRepository(id_cliente, produtoId, datapedido, quantidade_pedido) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO pedido (id_cliente, id_produto, data_pedido, quantidade_pedido, status_pedido) 
       VALUES (?, ?, ?, ?, ?)`,
      [id_cliente, produtoId, datapedido, quantidade_pedido, "Andamento"],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, id_cliente, produtoId });
        }
      }
    );
  });
}
function findAllPedidosRepository() {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT pedido.id_pedido, pedido.data_pedido, pedido.id_cliente, 
              pedido.id_produto, pedido.quantidade_pedido, status_pedido
       FROM pedido 
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

function findPedidoByIdRepository(pedidoId) {
  return new Promise((resolve, reject) => {
    db.get(`SELECT id_cliente, id_produto, data_pedido, quantidade_pedido, status_pedido
            FROM pedido WHERE 
            id_pedido = ?`, [pedidoId], 
    (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}
function findPedidoProdutoByIdRepository(pedidoId) {
  return new Promise((resolve, reject) => {
    db.get(`SELECT id_pedido, id_produto, quantidade_pedido
            FROM pedido WHERE 
            id_pedido = ?`, [pedidoId], 
    (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

function deletePedidoRepository(pedidoId) {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM pedido WHERE id_pedido = ?`, [pedidoId], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ message: "pedido deleted successfully", pedidoId });
      }
    });
  });
}

export default {
  createPedidoRepository,
  findAllPedidosRepository,
  findPedidoByIdRepository,
  deletePedidoRepository,
  findPedidoProdutoByIdRepository
};