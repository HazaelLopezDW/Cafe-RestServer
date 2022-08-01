const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.path = {
            usuarios: '/api/usuarios'
        };

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
        this.app.use(this.path.usuarios, require('../routes/usuarios.routes'));

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        })
    }

}

module.exports = Server;