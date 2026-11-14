import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express'; // <-- NOVO
import { swaggerSpec } from './swagger'; // <-- NOVO

import medicoRoutes from './routes/medicoRoutes';
import pacienteRoutes from './routes/pacienteRoutes';
import consultaRoutes from './routes/consultaRoutes';
import usuarioRoutes from './routes/usuarioRoutes';

const app = express();

app.use(cors());
app.use(express.json());

// Rota do Swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // <-- NOVO

app.get('/', (req, res) => {
  res.json({ message: 'Clínica API funcionando! 🏥' });
});

app.use('/medicos', medicoRoutes);
app.use('/pacientes', pacienteRoutes);
app.use('/consultas', consultaRoutes);
app.use('/usuarios', usuarioRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});