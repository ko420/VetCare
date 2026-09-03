import { Router } from 'express';
import authRoutes from './auth.routes';
import clienteRoutes from './cliente.routes';
import animalRoutes from './animal.routes';
import veterinarioRoutes from './veterinario.routes';
import consultaRoutes from './consulta.routes';
import prontuarioRoutes from './prontuario.routes';


const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/clientes', clienteRoutes);
routes.use('/animais', animalRoutes);
routes.use('/veterinarios', veterinarioRoutes);
routes.use('/prontuarios', prontuarioRoutes);
routes.use('/consultas', consultaRoutes);

export { routes };