import { z } from "zod";

const vendaSchema = z.object({
  id_pedido: z.number().int().positive("Produto ID must be a positive integer"),
  data_venda: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .min(10, "Due date must be in the format YYYY-MM-DD"),
});

const vendaIdSchema = z.object({
  vendaId: z.number().int().positive("venda ID must be a positive integer"),
});

export { vendaSchema, vendaIdSchema };