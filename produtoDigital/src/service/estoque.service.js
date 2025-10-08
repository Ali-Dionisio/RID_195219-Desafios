import estoqueRepositories from "../repositories/estoque.repositories.js";

async function createEstoqueService(id_produto, quantidade) {
  const createdEstoque = await estoqueRepositories.createEstoqueRepository(
    id_produto,
    quantidade
  );
  if (!createdEstoque) throw new Error("Error creating estoque");
  return createdEstoque;
}

async function findAllEstoquesService() {
  const estoque = await estoqueRepositories.findAllEstoquesRepository();
  return estoque;
}

async function findEstoqueByIdService(estoqueId) {
  const estoque = await estoqueRepositories.findEstoqueByIdRepository(estoqueId);
  if (!estoque) throw new Error("estoque not found");
  return estoque;
}

async function updateEstoqueService(updatedEstoque, estoqueId, userId) {
  const estoque = await estoqueRepositories.findEstoqueByIdRepository(estoqueId);
  if (!estoque) throw new Error("estoque not found");
  if (estoque.userId !== userId) throw new Error("Unauthorized");
  const response = await estoqueRepositories.updateEstoqueRepository(
    updatedEstoque,
    estoqueId
  );
  return response;
}

async function deleteEstoqueService(estoqueId, userId) {
  const estoque = await estoqueRepositories.findEstoqueByIdRepository(estoqueId);
  if (!estoque) throw new Error("estoque not found");
  if (estoque.userId !== userId) throw new Error("Unauthorized");
  const response = await estoqueRepositories.deleteEstoqueRepository(estoqueId);
  return response;
}

export default {
  createEstoqueService,
  findAllEstoquesService,
  findEstoqueByIdService,
  updateEstoqueService,
  deleteEstoqueService,
};