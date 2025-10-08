import { z } from "zod";

const produtoSchema = z.object({
    nome_produto: z.string().min(1, "Title Required"),
    descricao: z.string().min(1, "Author is required"),
    preco: z.float64().min(1, "Preco is required"),
});

const produtoIdSchema = z.object({
    id_produto: z.number().int().positive("Book ID must be a positive integer"),
})

export { produtoSchema, produtoIdSchema };