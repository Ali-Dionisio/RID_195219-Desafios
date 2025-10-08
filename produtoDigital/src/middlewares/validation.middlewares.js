import { userIdSchema } from "../schema/user.schema.js";
import { produtoIdSchema } from "../schema/produto.schema.js";
import { pedidoIdSchema } from "../schema/pedido.schema.js";
import { estoqueIdSchema } from "../schema/estoque.schema.js";
import { vendaIdSchema } from "../schema/venda.schema.js";

const validate = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    } catch (e) {
        res.status(400).json({error: e.errors});
        schema.parse(req.body);
    }
};
const validateUserId = (req, res, next) => {
    try {
        const userId = +req.params.id; //+ = transformar em inteiro
        userIdSchema.parse({userId: userId});
        next();
    } catch (e) {
        res.status(400).json({error: e.errors});
    }
}

const validateProdutoId = (req, res, next) => {
    try {
        produtoIdSchema.parse({ produtoId: +req.params.id });
        next();
    } catch (e) {
        res.status(400).json({ error: e.erros });
    }
};

const validatePedidoId = (req, res, next) => {
  try {
    pedidoIdSchema.parse({ pedidoId: +req.params.id });
    next();
  } catch (e) {
    res.status(400).json({ error: e.errors });
  }
};

const validateEstoqueId = (req, res, next) => {
  try {
    estoqueIdSchema.parse({ estoqueId: +req.params.id });
    next();
  } catch (e) {
    res.status(400).json({ error: e.errors });
  }
};

const validateVendaId = (req, res, next) => {
  try {
    vendaIdSchema.parse({ vendaId: +req.params.id });
    next();
  } catch (e) {
    res.status(400).json({ error: e.errors });
  }
};


export 
{ 
    validate, 
    validateUserId, 
    validateProdutoId, 
    validatePedidoId, 
    validateEstoqueId, 
    validateVendaId 
};