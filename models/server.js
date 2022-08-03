const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            auth: '/api/auth',
            categorias: '/api/categorias',
            usuarios: '/api/usuarios',
        };

        // Coneccion a la base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Llamamos nuestras rutas
        this.routes();
    }

    // Coneccion a la base de datos
    async conectarDB() {
        await dbConnection();
    }

    // Llamamos nuestros middlewares
    middlewares(){

        // CORS
        this.app.use(cors())

        // Lectura y parseo del body
        this.app.use(express.json());

        // Directorio publico
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth.routes'));
        this.app.use(this.paths.categorias, require('../routes/categorias.routes'));
        this.app.use(this.paths.usuarios, require('../routes/usuarios.routes'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        })
    }

}

module.exports = Server;