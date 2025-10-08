import { Router } from 'express'
import vendaController from "../controller/venda.controllers.js";
import {  validate,   validateVendaId, } from "../middlewares/validation.middlewares.js";
import { vendaSchema } from "../schema/venda.schema.js";

const router = Router();

router.post("/", 
            validate(vendaSchema), 
            vendaController.createVendaController);
router.get("/", vendaController.findAllVendasController);

router.get("/:id", 
            validateVendaId, 
            vendaController.findVendaByIdController);
router.patch("/:id", 
    validateVendaId, 
    vendaController.updateVendaController);

router.delete("/:id", 
            validateVendaId, 
            vendaController.deleteVendaController);

export default router;