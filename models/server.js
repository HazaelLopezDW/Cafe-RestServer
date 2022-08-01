const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        // Middlewares
        this.middlewares();

        // Llamamos nuestras rutas
        this.routes();
    }

    // Llamamos nuestros middlewares
    middlewares(){

        // CORS
        this.app.use(cors())

        // Directorio publico
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.get('/api', (req, res) => {
            res.json({
                msg: "Peticion Get -"
            })
        });

        this.app.post('/api', (req, res) => {
            res.json({
                msg: "Peticion Post -"
            })
        });

        this.app.put('/api', (req, res) => {
            res.json({
                msg: "Peticion Put -"
            })
        });

        this.app.delete('/api', (req, res) => {
            res.json({
                msg: "Peticion Delete -"
            })
        });

        this.app.patch('/api', (req, res) => {
            res.json({
                msg: "Peticion Patch -"
            })
        });

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        })
    }

}

module.exports = Server;