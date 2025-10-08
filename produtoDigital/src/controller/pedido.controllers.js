import pedidoService from "../service/pedido.service.js";

async function createPedidoController(req, res) {
  const { id_produto, id_cliente, data_pedido, quantidade_pedido } = req.body;
  try {
    const validaQuantidadeEstoque = await pedidoService.validaQuantidadeEstoque(
      id_produto, 
      quantidade_pedido
    );
    const createdPedido = await pedidoService.createPedidoService(
      id_cliente,
      id_produto,
      data_pedido,
      quantidade_pedido
    );

    res.status(201).send(createdPedido);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function findAllPedidosController(req, res) {
  try {
    const pedidos = await pedidoService.findAllPedidosService();
    res.send(pedidos);
  } catch (error) {
    res.status(404).send(error.message);
  }
}

async function findPedidoByIdController(req, res) {
  const pedidoId = req.params.id;
  
  try {
    const pedido = await pedidoService.findPedidoByIdService(pedidoId);
    return res.send(pedido);
  } catch (error) {
    return res.status(400).send(error.message);
  }
}

async function deletePedidoController(req, res) {
  const pedidoId = req.params.id;
  const userId = req.userId
  
  try {
    const response = await pedidoService.deletePedidoService(pedidoId, userId);
    return res.send(response);
  } catch (error) {
    return res.status(400).send(error.message);
  }
}

export default {
  createPedidoController,
  findAllPedidosController,
  findPedidoByIdController,
  deletePedidoController
};