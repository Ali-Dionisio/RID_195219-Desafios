import produtoController from "../controller/produto.controllers.js";
import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js"
import { validate, validateProdutoId } from "../middlewares/validation.middlewares.js"
import { produtoSchema } from "../schema/produto.schema.js";

const router = Router();
router.get("/", produtoController.findAllProdutosController);

router.use(authMiddleware);
router.post("/", 
            validate(produtoSchema),
            produtoController.createProdutoController
);
router.get("/search", produtoController.searchProdutosController);

router.get("/:id", 
    validateProdutoId, 
    produtoController.findProdutoByIdController);

router.patch("/:id", 
    validateProdutoId, 
    produtoController.updateProdutoController);

router.delete("/:id", 
    validateProdutoId, 
    produtoController.deleteProdutoController);



export default router;