import { json, urlencoded } from "body-parser";
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Request, Response } from "express";
import connection from './db/config';
import citaRoutes from './routes/citas.routes';
import doctorRoutes from './routes/doctor.routes';
import pacienteRoutes from './routes/paciente.routes';

dotenv.config();

const app = express();

// Middleware para parsear solicitudes JSON y codificar URL
app.use(json());
app.use(urlencoded({ extended: true }));

// Middleware para permitir solicitudes desde diferentes dominios (CORS)
app.use(cors());

// Ruta base
app.get('/', (req: Request, res: Response) => {
  res.send('Bienvenido a mi API!');
});

// Rutas específicas para pacientes, doctores y citas
app.use('/api/pacientes', pacienteRoutes);
app.use('/api/doctores', doctorRoutes);
app.use('/api/citas', citaRoutes);

// Middleware para manejar error de rutas no encontradas (404)
app.use((req: Request, res: Response) => {
  res.status(404).send('404: Página no encontrada');
});

// Middleware para manejar errores internos del servidor (500)
app.use((req: Request, res: Response) => {
  res.status(500).send('500: Error interno del servidor');
});

// Sincronizar la conexión con la base de datos
connection.sync()
  .then(() => {
    console.log('Base de datos en línea');
  })
  .catch((err) => {
    console.log(`Error en la conexión ${err}`);
  });

// Iniciar el servidor en el puerto especificado en el archivo .env
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en: http://${process.env.HOST}/${process.env.PORT}`);
});
