import 'express-async-errors';

import express from 'express';
import cors from'cors';
import {errorHandler} from './middlewares/error.middleware';

const app = express();

app.use(cors());

app.use(express.json());

app.get("/hello", (req, res) => {
   res.json( "Hello World");

});
app.use(errorHandler);
export {app};