import { Router } from "express";
import UserRouters from './user.routes.js';
import ProdutoRouters from './produto.routes.js';
import pedidoRouters from './pedido.routes.js';
import estoqueRouters from './estoque.routes.js';
import vendaRouters from './venda.routes.js';

const routers = Router();

routers.use("/cliente",UserRouters);
routers.use("/produto",ProdutoRouters);
routers.use("/pedido",pedidoRouters);
routers.use("/estoque",estoqueRouters);
routers.use("/venda",vendaRouters);

export { routers };