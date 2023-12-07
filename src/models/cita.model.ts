import { Table, Column, Model, DataType, PrimaryKey, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Doctor } from './doctores.model'
import { Paciente } from './paciente.model'

// Decorador @Table: Define las opciones de la tabla para Sequelize
@Table({
  timestamps: false, // Desactiva la inclusión de campos de timestamp (createdAt, updatedAt)
  tableName: 'cita' 
})
export class Cita extends Model {
  // Decorador @Column: Define un campo de la tabla
  @Column({
    type: DataType.DATE, // Tipo de dato de la columna (DATE en este caso)
    allowNull: false, 
    primaryKey: true // Es una clave primaria
  })
  fecha_hora!: Date 
  // Decoradores @PrimaryKey y @ForeignKey: Definen una clave primaria y una clave foránea
  @PrimaryKey
  @ForeignKey(() => Doctor) 
  @Column({
    type: DataType.INTEGER, 
    allowNull: false, 
  })
  id_profesional!: number 

  // Decoradores @PrimaryKey y @ForeignKey: Definen una clave primaria y una clave foránea
  @PrimaryKey
  @ForeignKey(() => Paciente) 
  @Column({
    type: DataType.INTEGER, 
    allowNull: false, // No se permite valor nulo
  })
  id_numeroCedula!: number 
  // Decoradores @BelongsTo: Establecen relaciones de pertenencia con otros modelos
  @BelongsTo(() => Doctor) 
  doctor!: Doctor; // Propiedad que almacena la instancia del Doctor relacionado

  @BelongsTo(() => Paciente) // Relación de pertenencia con el modelo Paciente
  paciente!: Paciente;}
