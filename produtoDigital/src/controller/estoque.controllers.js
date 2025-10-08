import estoqueService from "../service/estoque.service.js";

async function createEstoqueController(req, res) {
  const { id_produto, quantidade } = req.body;
  try {
    const createdEstoque = await estoqueService.createEstoqueService(
      id_produto,
      quantidade
    );

    res.status(201).send(createdEstoque);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function findAllEstoquesController(req, res) {
  try {
    const estoque = await estoqueService.findAllEstoquesService();
    res.send(estoque);
  } catch (error) {
    res.status(404).send(error.message);
  }
}

async function findEstoqueByIdController(req, res) {
  const estoqueId = req.params.id;
  
  try {
    const estoque = await estoqueService.findEstoqueByIdService(estoqueId);
    return res.send(estoque);
  } catch (error) {
    return res.status(400).send(error.message);
  }
}
async function updateEstoqueController(req, res) {
  const updatedEstoque = req.body;
  const estoqueId = req.params.id;
  const userId = req.userId;

  try {
    const response = await estoqueService.updateEstoqueService(
      updatedEstoque,
      estoqueId,
      userId
    );
    return res.send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function deleteEstoqueController(req, res) {
  const estoqueId = req.params.id;
  const userId = req.userId
  
  try {
    const response = await estoqueService.deleteEstoqueService(estoqueId, userId);
    return res.send(response);
  } catch (error) {
    return res.status(400).send(error.message);
  }
}

export default {
  createEstoqueController,
  findAllEstoquesController,
  findEstoqueByIdController,
  updateEstoqueController,
  deleteEstoqueController
};