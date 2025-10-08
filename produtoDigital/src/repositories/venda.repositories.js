import db from "../config/database.js";

db.run(`CREATE TABLE IF NOT EXISTS venda (
  id_venda INTEGER PRIMARY KEY AUTOINCREMENT,
  data_venda DATE,
  id_pedido INTEGER,
  FOREIGN KEY (id_pedido) REFERENCES pedido(id_pedido)
)`);
function createVendaRepository(pedidoId, data_venda) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO venda (id_pedido, data_venda) 
       VALUES (?, ?)`,
      [pedidoId, data_venda],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID,pedidoId, data_venda });
        }
      }
    );
  });
}

function findAllVendasRepository() {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT v.id_venda, v.id_pedido, p.nome_produto, p.descricao,
              ped.data_pedido, v.data_venda, ped.quantidade_pedido, ped.status_pedido
       FROM venda v
       INNER JOIN pedido ped on ped.id_pedido = v.id_pedido
       INNER JOIN produto p on p.id_produto = ped.id_produto
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

function findVendaByIdRepository(vendaId) {
  return new Promise((resolve, reject) => {
    db.get(`SELECT v.id_venda, v.id_pedido, p.nome_produto, p.descricao,
              ped.data_pedido, v.data_venda, ped.quantidade_pedido, ped.status_pedido
            FROM venda v
            INNER JOIN pedido ped on ped.id_pedido = v.id_pedido
            INNER JOIN produto p on p.id_produto = ped.id_produto
            WHERE v.id_venda = ?`, [vendaId], 
    (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

function updateVendaRepository(updatedVenda, vendaId) {
  return new Promise((resolve, reject) => {
    const fields = ["data_venda"];
    let query = "UPDATE venda SET";
    const values = [];

    fields.forEach((field) => {
      if (updatedVenda[field] !== undefined) {
        query += ` ${field} = ?,`;
        values.push(updatedVenda[field]);
      }
    });

    query = query.slice(0, -1);

    query += " WHERE id_venda = ?";
    values.push(vendaId);
    db.run(query, values, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ id: vendaId, ...updatedVenda });
      }
    });
  });
}


function deleteVendaRepository(vendaId) {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM venda WHERE id_venda = ?`, [vendaId], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ message: "venda deleted successfully", vendaId });
      }
    });
  });
}

function updateStatusPedidoRepository(pedidoId, updatedVenda) {
  updatedVenda = {
    status_pedido: "concluido" // ou qualquer valor necessário
  }
  return new Promise((resolve, reject) => {
    const fields = ["status_pedido"];
    let query = "UPDATE pedido SET ";
    const values = [];
    
    fields.forEach((field) => {
      if (updatedVenda[field] !== undefined) {
        query += ` ${field} = ?,`;
        values.push(updatedVenda[field]);
      }
    });
    
    query = query.slice(0, -1);
    query += " WHERE id_pedido = ?";

    values.push(pedidoId);
    db.run(query, values, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ id: pedidoId, ...updatedVenda  });
      }
    });
  });
}

export default {
  createVendaRepository,
  findAllVendasRepository,
  findVendaByIdRepository,
  updateVendaRepository,
  deleteVendaRepository,
  updateStatusPedidoRepository
};