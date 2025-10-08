import { z } from "zod";

const pedidoSchema = z.object({
  id_produto: z.number().int().positive("Produto ID must be a positive integer"),
  id_cliente: z.number().int().positive("Produto ID must be a positive integer"),
  data_pedido: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .min(10, "Due date must be in the format YYYY-MM-DD"),
});

const pedidoIdSchema = z.object({
  pedidoId: z.number().int().positive("Pedido ID must be a positive integer"),
});

export { pedidoSchema, pedidoIdSchema };