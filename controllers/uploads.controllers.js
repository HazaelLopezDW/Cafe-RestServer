const path = require('path');
const { response } = require("express");

const cargarArchivo = (req, res = response) => {
    
        if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
          res.status(400).json({ msg: `No hay archivos que subir`});
          return;
        }
      
        const { archivo } = req.files;
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length-1];

        // Validar extensiones permitidas
        const extensionValidas = ['png', 'jpg', 'jpeg', 'gif'];
        if(!extensionValidas.includes(extension)){
            res.status(400).json({
                msg: `La extesion: ${extension} no es permitida -> ${extensionValidas}`
            });
        }

        res.json({extension});
      
        // const uploadPath = path.join( __dirname, '../uploads/',  archivo.name);
      
        // archivo.mv(uploadPath, (err) => {
        //   if (err) {
        //     return res.status(500).json({err});
        //   }

        //   res.json({ msg: `File uploaded to ${uploadPath}`});
        // });
}

module.exports = {
    cargarArchivo
}