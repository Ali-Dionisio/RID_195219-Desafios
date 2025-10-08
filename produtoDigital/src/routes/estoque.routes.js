import { Router } from 'express'
import estoqueController from "../controller/estoque.controllers.js";
import {  validate,   validateEstoqueId, } from "../middlewares/validation.middlewares.js";
import { estoqueSchema } from "../schema/estoque.schema.js";

const router = Router();

router.post("/", 
            validate(estoqueSchema), 
            estoqueController.createEstoqueController);
router.get("/", estoqueController.findAllEstoquesController);


router.get("/:id", 
            validateEstoqueId, 
            estoqueController.findEstoqueByIdController);
router.patch("/:id", 
    validateEstoqueId, 
    estoqueController.updateEstoqueController);
router.delete("/:id", 
            validateEstoqueId, 
            estoqueController.deleteEstoqueController);

export default router;