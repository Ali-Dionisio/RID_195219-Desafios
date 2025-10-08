 import produtoRepositories from "../repositories/produto.repositories.js";

 async function createProdutoService(newProduto, userId) {
    const createProduto = await produtoRepositories.createProdutoRepository(
        newProduto,
        userId
    );
    if (!createProduto) throw new Error("Error creating Produto!");
    return createProduto;
 }

async function findAllProdutosService(){
    const produtos = await produtoRepositories.findAllProdutosRepository();
    return produtos;
}

async function findProdutoByIdService(produtoId) {
  const produto = await produtoRepositories.findProdutoByIdRepository(produtoId);
  if (!produto) throw new Error("Produto not found");
  return produto;
}

async function updateProdutoService(updatedProduto, produtoId, userId) {
  const produto = await produtoRepositories.findProdutoByIdRepository(produtoId);
  if (!produto) throw new Error("Produto not found");
  if (produto.userId !== userId) throw new Error("Unauthorized");
  const response = await produtoRepositories.updateProdutoRepository(
    updatedProduto,
    produtoId
  );
  return response;
}

async function deleteProdutoService(produtoId, userId) {
  const produto = await produtoRepositories.findProdutoByIdRepository(produtoId);
  if (!produto) throw new Error("Produto not found");
  if (produto.userId !== userId) throw new Error("Unauthorized");
  const response = await produtoRepositories.deleteProdutoRepository(produtoId);
  return response;
}

async function searchProdutosService(search) {
  if (!search) return await produtoRepositories.findAllProdutosRepository();
  const produtos = await produtoRepositories.searchProdutosRepository(search);
  return produtos;
}

 export default {
    createProdutoService,
    findAllProdutosService,
    findProdutoByIdService,
    updateProdutoService,
    deleteProdutoService,
    searchProdutosService,
 }