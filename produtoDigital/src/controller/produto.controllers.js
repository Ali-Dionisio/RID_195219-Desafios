import produtoService from "../service/produto.service.js";

async function createProdutoController(req, res) {
    const newProduto = req.body
    const userId = req.userId

   try {
    const createdProduto = await produtoService.createProdutoService(newProduto, userId);
    res.status(201).send(createdProduto);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function findAllProdutosController(req, res) {
  try {
    const produtos = await produtoService.findAllProdutosService();
    res.send(produtos);
  } catch (error) {
    res.status(404).send(error.message);
  }
}

async function findProdutoByIdController(req, res) {
  const produtoId = req.params.id;

  try {
    const produto = await produtoService.findProdutoByIdService(produtoId);
    return res.send(produto);
  } catch (error) {
    return res.status(404).send(error.message);
  }
}

async function updateProdutoController(req, res) {
  const updatedProduto = req.body;
  const produtoId = req.params.id;
  const userId = req.userId;

  try {
    const response = await produtoService.updateProdutoService(
      updatedProduto,
      produtoId,
      userId
    );
    return res.send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function deleteProdutoController(req, res) {
  const produtoId = req.params.id;
  const userId = req.userId;

  try {
    const response = await produtoService.deleteProdutoService(produtoId, userId);
    return res.send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function searchProdutosController(req, res) {
  const { search } = req.query;

  try {
    const produtos = await produtoService.searchProdutosService(search);
    return res.send(produtos);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

export default {
    createProdutoController,
    findAllProdutosController,
    findProdutoByIdController,
    updateProdutoController,
    deleteProdutoController,
    searchProdutosController
}