import { Router } from 'express'
import pedidoController from "../controller/pedido.controllers.js";
import {  validate,   validatePedidoId, } from "../middlewares/validation.middlewares.js";
import { pedidoSchema } from "../schema/pedido.schema.js";

const router = Router();

router.post("/", 
            validate(pedidoSchema), 
            pedidoController.createPedidoController);
router.get("/", pedidoController.findAllPedidosController);


router.get("/:id", 
            validatePedidoId, 
            pedidoController.findPedidoByIdController);
router.delete("/:id", 
            validatePedidoId, 
            pedidoController.deletePedidoController);

export default router;