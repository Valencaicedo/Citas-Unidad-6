import * as dotenv from 'dotenv';
import { Sequelize } from 'sequelize-typescript';
import { Cita } from '../models/cita.model';
import { Doctor } from '../models/doctores.model';
import { Paciente } from '../models/paciente.model';

dotenv.config();

// Configuración de la conexión a la base de datos utilizando Sequelize
const connection = new Sequelize({
  dialect: 'mysql', // Tipo de base de datos
  host: process.env.HOST, // Host de la base de datos
  username: 'root', // Nombre de usuario
  port: Number(process.env.DATABASE_PORT), // Puerto de la base de datos (convertido a número)
  password: process.env.PASSWORD, // Contraseña de la base de datos
  database: process.env.DATABASE, // Nombre de la base de datos
  logging: false, // Desactivar los registros de consultas SQL en la consola
  models: [Paciente, Cita, Doctor], // Especificar modelos a utilizar en la conexión
  dialectOptions: {
    insecureAuth: true // Opción específica para MySQL (insecureAuth)
  }
});

export default connection;
