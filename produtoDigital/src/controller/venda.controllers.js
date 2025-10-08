import { id } from "zod/locales";
import vendaService from "../service/venda.service.js";


async function createVendaController(req, res) {
  const { id_pedido, data_venda } = req.body;
  let status_pedido = "concluido";
  try {
    const atualizaStatusPedido = await vendaService.atualizaStatusPedido(
      id_pedido, 
      status_pedido
    );
    const atualizaQuantidadeEstoque = await vendaService.atualizaQuantidadeEstoque(
      id_pedido, 
    );
    const createdVenda = await vendaService.createVendaService(
      id_pedido,
      data_venda
    );

    res.status(201).send(createdVenda);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function findAllVendasController(req, res) {
  try {
    const venda = await vendaService.findAllVendasService();
    res.send(venda);
  } catch (error) {
    res.status(404).send(error.message);
  }
}

async function findVendaByIdController(req, res) {
  const vendaId = req.params.id;
  
  try {
    const venda = await vendaService.findVendaByIdService(vendaId);
    return res.send(venda);
  } catch (error) {
    return res.status(400).send(error.message);
  }
}
async function updateVendaController(req, res) {
  const updatedVenda = req.body;
  const vendaId = req.params.id;
  const userId = req.userId;

  try {
    const response = await vendaService.updateVendaService(
      updatedVenda,
      vendaId,
      userId
    );
    return res.send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function deleteVendaController(req, res) {
  const vendaId = req.params.id;
  const userId = req.userId
  
  try {
    const response = await vendaService.deleteVendaService(vendaId, userId);
    return res.send(response);
  } catch (error) {
    return res.status(400).send(error.message);
  }
}

export default {
  createVendaController,
  findAllVendasController,
  findVendaByIdController,
  updateVendaController,
  deleteVendaController
};