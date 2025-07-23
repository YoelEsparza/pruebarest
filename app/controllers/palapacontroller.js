const palapaModel = require('../models/palapaModel')

function buscarTodo(req, res){
    palapaModel.find({})
    .then(bebidas =>{
        if(bebidas.length){
            return res.status(200).send({bebidas})
        }
        return res.status(204).send({mensaje:"No hay nada que mostrar"})
    })
    .catch(e => {return res.status(404).send({mensaje:`Error al solicitar la información ${e}`})})
}

function agregar(req, res){
    //console.log(req.body)
    new palapaModel(req.body).save()
    .then(info =>{
        return res.status(200).send({mensaje:"la información se guardo con exito",
            info
        })
    })
    .catch(e =>{
        return res.status(404).send({
            mensaje:`error al guardar la información ${e}`
        })
    })
}

function buscarBebida(req, res, next){ 
    
    let consulta={}
    consulta[req.params.key]=req.params.value
    console.log(consulta)
    palapaModel.find(consulta)
    .then(bebidas => {
        if(!bebidas.lenght) return next()
        req.body.bebidas = bebidas
        return next()
    })
    .catch(e =>{
        req.body.e = e
        return next()
    })
}

function mostrarBebida(req, res){
    if(req.body.e) return res.status(404).send({mensaje:"Error al consultar la información"})
    if(!req.body.bebidas) return res.status(204).send({mensaje:"No hay información que mostrar"})
    let bebidas= req.body.bebidas
    return res.status(200).send({bebidas})
}

function eliminarBebida(req, res){
    var bebidas ={}
    bebidas = req.body.bebidas
    palapaModel.deleteOne(bebidas)
    .then(info =>{
        return res.status(200).send({
            mensaje:"La bebida se elimino con exito"})
        
    })
    .catch(e => {
            return res.status(404).send({
                mensaje:`Error al eliminar la bebida: ${e}`})
        })
    }

    function actualizarBebida(req, res) {
    const key = req.params.key;
    const value = req.params.value;
    const datosActualizar = req.body;

    if (!key || !value || !Object.keys(datosActualizar).length) {
        return res.status(400).send({ mensaje: "Faltan datos para actualizar." });
    }

    const filtro = {};
    filtro[key] = value;

    palapaModel.findOneAndUpdate(
        filtro,
        datosActualizar,
        { new: true, runValidators: true }
    )
    .then(bebidaActualizada => {
        if (!bebidaActualizada) {
            return res.status(404).send({ mensaje: "No se encontró ninguna bebida con ese criterio." });
        }

        return res.status(200).send({
            mensaje: "La bebida se actualizó con éxito",
            bebida: bebidaActualizada
        });
    })
    .catch(e => {
        return res.status(500).send({ mensaje: `Error al actualizar la bebida: ${e}` });
    });
}

module.exports={
    buscarTodo,
    agregar,
    buscarBebida,
    mostrarBebida,
    eliminarBebida,
    actualizarBebida
}

