import estoqueRepositories from "../repositories/estoque.repositories.js";
import pedidoRepositories from "../repositories/pedido.repositories.js";

async function validaQuantidadeEstoque (id_produto, quantidade){
  const validaQuantidade = await estoqueRepositories.findQuantidadeEstoqueByIdRepository(
    id_produto,
    quantidade
  )
  if (id_produto == validaQuantidade.id_produto)
    if (validaQuantidade.quantidade >= quantidade)
        return validaQuantidade;
    else
      throw new Error("Quantidade insuficiente em estoque");
}

async function createPedidoService(userId, id_produto, data_pedido, quantidade_pedido) {
  const createdPedido = await pedidoRepositories.createPedidoRepository(
    userId,
    id_produto,
    data_pedido,
    quantidade_pedido
  );

  if (!createdPedido) throw new Error("Error creating pedido");
  return createdPedido;
}

async function findAllPedidosService() {
  const pedido = await pedidoRepositories.findAllPedidosRepository();
  return pedido;
}

async function findPedidoByIdService(pedidoId) {
  const pedido = await pedidoRepositories.findPedidoByIdRepository(pedidoId);
  if (!pedido) throw new Error("pedido not found");
  return pedido;
}



async function deletePedidoService(pedidoId, userId) {
  const pedido = await pedidoRepositories.findPedidoByIdRepository(pedidoId);
  if (!pedido) throw new Error("pedido not found");
  if (pedido.userId !== userId) throw new Error("Unauthorized");
  const response = await pedidoRepositories.deletePedidoRepository(pedidoId);
  return response;
}

export default {
  createPedidoService,
  validaQuantidadeEstoque,
  findAllPedidosService,
  findPedidoByIdService,
  deletePedidoService,
};