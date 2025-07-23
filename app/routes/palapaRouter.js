const express = require ('express')
const router = express.Router()
const palapaController = require('../controllers/palapacontroller')

router.get('/bebidas', palapaController.buscarTodo)
.post('/bebidas', palapaController.agregar)
.get('/bebidas/:key/:value', palapaController.buscarBebida, palapaController.mostrarBebida)//Primero se va ejecutar el palapaController y despues mostrarBebida
.delete('/bebidas/:key/:value', palapaController.buscarBebida, palapaController.eliminarBebida)
.put('/bebidas/:key/:value', palapaController.buscarBebida, palapaController.actualizarBebida)


module.exports=router