import { Request, Response, NextFunction } from 'express';
import { ZodError, ZodTypeAny } from 'zod';

export const validarBody = (schema: ZodTypeAny) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // O safeParse tenta validar o req.body com o schema
      const resultado = schema.safeParse(req.body);

      if (!resultado.success) {
        // Se der erro, formatamos a lista de erros do Zod
        const errosFormatados = resultado.error.issues.map((issue) => ({
          campo: issue.path.join('.'),
          mensagem: issue.message,
        }));

        // Retorna 400 com a lista de erros
        return res.status(400).json({ 
          error: "Erro de validação", 
          detalhes: errosFormatados 
        });
      }

      // Se der certo, sobrescrevemos o req.body com os dados validados e limpos
      req.body = resultado.data;
      
      // Manda seguir para o controller
      next();
    } catch (error) {
      return res.status(500).json({ error: "Erro interno na validação" });
    }
  };
};