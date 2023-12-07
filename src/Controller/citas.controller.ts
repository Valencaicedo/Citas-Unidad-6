import { RequestHandler } from 'express';
import { Cita } from '../models/cita.model';

// Obtener todas las citas
export const getCitas: RequestHandler = async (req, res) => {
  try {
    const citas = await Cita.findAll()

    res.status(200).json({
      message: 'Operación exitosa',
      data: citas
    })
  } catch (error) {
    const err = error as Error
    res.status(500).json({
      message: 'Error al obtener las citas',
      error: err.message
    })
  }
}

// Obtener una cita por parámetros
export const getOneCita: RequestHandler = async (req, res) => {
  try {
    const { profesional, paciente, fecha } = req.query

    const cita = await Cita.findOne({
      where: {
        fecha_hora: fecha,
        id_profesional: profesional,
        id_numeroCedula: paciente
      }
    })

    if (cita) {
      res.status(200).json({
        message: 'Cita encontrada',
        data: cita
      })
    } else {
      res.status(404).json({
        message: 'Cita no encontrada'
      })
    }

  } catch (error: any) {
    res.status(500).json({
      message: 'Error al obtener los doctores',
      error: error.message
    })
  }
}

// Crear una nueva cita
export const createCita: RequestHandler = async (req, res) => {
  try {
    const cita = await Cita.create(req.body)

    res.status(201).json({
      message: 'Cita creada!',
      data: cita
    })
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      message: 'No se pudo crear la cita',
      error: err.message
    })
  }
}

// Actualizar una cita existente
export const updateCita: RequestHandler = async (req, res) => {
  try {
    const { profesional, paciente, fecha } = req.query

    const cita = await Cita.findOne({
      where: {
        fecha_hora: fecha,
        id_profesional: profesional,
        id_numeroCedula: paciente
      }
    })

    if (cita) {
      await Cita.update(req.body, {
        where: {
          fecha_hora: fecha,
          id_profesional: profesional,
          id_numeroCedula: paciente
        }
      })
      res.status(200).json({
        message: 'Cita actualizada'
      })
    } else {
      res.status(404).json({
        message: 'Cita no existe'
      })
    }
  } catch (error: any) {
    res.status(500).json({
      message: 'Error al modificar la cita',
      error: error.message
    })
  }
}

// Eliminar una cita
export const deleteCita: RequestHandler = async (req, res) => {
  try {
    const { profesional, paciente, fecha } = req.query

    const cita = await Cita.findOne({
      where: {
        fecha_hora: fecha,
        id_profesional: profesional,
        id_numeroCedula: paciente
      }
    })

    if (cita) {
      await Cita.destroy({
        where: {
          fecha_hora: fecha,
          id_profesional: profesional,
          id_numeroCedula: paciente
        }
      })
      res.status(200).json({
        message: 'Cita eliminada'
      })
    } else {
      res.status(404).json({
        message: 'Cita no existe'
      })
    }
  } catch (error: any) {
    res.status(500).json({
      message: 'Error al eliminar la cita',
      error: error.message
    })
  }
}
