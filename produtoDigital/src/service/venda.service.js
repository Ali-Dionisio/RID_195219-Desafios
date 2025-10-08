import estoqueRepositories from "../repositories/estoque.repositories.js";
import pedidoRepositories from "../repositories/pedido.repositories.js";
import vendaRepositories from "../repositories/venda.repositories.js";

async function atualizaStatusPedido(id_pedido, status_pedido){
  const statusPedido = await vendaRepositories.updateStatusPedidoRepository(
    id_pedido,
    status_pedido
  )
  if (!statusPedido) throw new Error("Erro ao atualizar pedido");
  return statusPedido;
}

async function atualizaQuantidadeEstoque(id_pedido, id_produto, quantidade_pedido){
  const consultaPedido = await pedidoRepositories.findPedidoProdutoByIdRepository(
    id_pedido,
    id_produto,
    quantidade_pedido
  )
  const consultaEstoque = await estoqueRepositories.findQuantidadeEstoqueByIdRepository(
    consultaPedido.id_produto,
    quantidade_pedido
  )

  let saldo
  if (consultaEstoque.quantidade - consultaPedido.quantidade_pedido >= 0 ){
    saldo = consultaEstoque.quantidade - consultaPedido.quantidade_pedido
   
    const saldoEstoque = await estoqueRepositories.updateEstoqueByIdProdutoRepository(
    consultaEstoque.id_produto,
    saldo
  )
  }else {

    throw new Error("Erro ao atualizar estoque");
  } 

  
}

async function createVendaService(id_pedido, data_venda) {
  const createdVenda = await vendaRepositories.createVendaRepository(
    id_pedido,
    data_venda
  );
  if (!createdVenda) throw new Error("Error creating venda");
  return createdVenda;
}

async function findAllVendasService() {
  const venda = await vendaRepositories.findAllVendasRepository();
  return venda;
}

async function findVendaByIdService(vendaId) {
  const venda = await vendaRepositories.findVendaByIdRepository(vendaId);
  if (!venda) throw new Error("venda not found");
  return venda;
}

async function updateVendaService(updatedVenda, vendaId, userId) {
  const venda = await vendaRepositories.findVendaByIdRepository(vendaId);
  if (!venda) throw new Error("venda not found");
  if (venda.userId !== userId) throw new Error("Unauthorized");
  const response = await vendaRepositories.updateVendaRepository(
    updatedVenda,
    vendaId
  );
  return response;
}

async function deleteVendaService(vendaId, userId) {
  const venda = await vendaRepositories.findVendaByIdRepository(vendaId);
  if (!venda) throw new Error("venda not found");
  if (venda.userId !== userId) throw new Error("Unauthorized");
  const response = await vendaRepositories.deleteVendaRepository(vendaId);
  return response;
}

export default {
  createVendaService,
  atualizaStatusPedido,
  atualizaQuantidadeEstoque,
  findAllVendasService,
  findVendaByIdService,
  updateVendaService,
  deleteVendaService,
};