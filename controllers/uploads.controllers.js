

const cargarArchivo = (req, res = Response) => {

    res.json({
        msg: 'Cargar Archivo...'
    })
}

module.exports = {
    cargarArchivo
}