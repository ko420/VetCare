import { Router } from 'express';
import clienteRoutes from './cliente.routes';
import animalRoutes from './animal.routes';
import veterinarioRoutes from './animal.routes';
import consultaRoutes from './consulta.routes';
import prontuarioRoutes from './prontuario.routes';


const routes = Router();

routes.use('/clientes', clienteRoutes);
routes.use('/animais', animalRoutes);
routes.use('/veterinarios', veterinarioRoutes);
routes.use('/prontuarios', prontuarioRoutes);
routes.use('/consultas', consultaRoutes);

export { routes };