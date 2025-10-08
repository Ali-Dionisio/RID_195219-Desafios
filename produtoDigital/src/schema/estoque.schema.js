import { z } from "zod";

const estoqueSchema = z.object({
  id_produto: z.number().int().positive("Produto ID must be a positive integer"),
  quantidade: z.number().int().positive("quantidade ID must be a positive integer"),
});

const estoqueIdSchema = z.object({
  estoqueId: z.number().int().positive("estoque ID must be a positive integer"),
});

export { estoqueSchema, estoqueIdSchema };