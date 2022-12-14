import { LoginController } from "./controller/login.controller";
import { PisoController } from "./controller/piso.controller";
import { SindicatoController } from "./controller/sindicato.controller";
import { UsuarioController } from "./controller/usuario.controller";
import { VideoConferenciaController } from "./controller/videoconferencia.controller";
import { AppDataSource } from "./data-source"
import { Usuario } from "./entity/usuario.entity";

const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const app = express();
const port = 9707;

AppDataSource.initialize().then(async () => {

    app.use(cors());

    // Configuring body parser middlewares
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    // Configuracion para subir imagenes
    app.use(fileUpload());

    // Importamos las rutas
    // var routes = require('./url/url');
    // const inicio = require('./controllers/apis');
    const user_controller = new UsuarioController();
    const login_controller = new LoginController();
    const videoconferencia_controller = new VideoConferenciaController();
    const piso_controller = new PisoController();
    const sindicato_controller = new SindicatoController();

    // Cargamos las rutas
    app.use('/apis', user_controller.router);
    app.use('/apis', login_controller.router);
    app.use('/apis', videoconferencia_controller.router);
    app.use('/apis', piso_controller.router);
    app.use('/apis', sindicato_controller.router);
    app.get('/apis', function (req, res) {
        console.log('sss');

    });


    module.exports = app;

    // console.log("Inserting a new user into the database...")
    try {
        const user = new Usuario();
        user.id = 0
        user.usuario = '(no asignado)';
        user.rol = 'técnico';
        await AppDataSource.manager.save(user)
    } catch (e) {

    }
    // console.log("Saved a new user with id: " + user.id)

    // console.log("Loading users from the database...")
    // const users = await AppDataSource.manager.find(Usuario)
    // console.log("Loaded users: ", users)

    // console.log("Here you can setup and run express / fastify / any other framework.")
    console.log('Conexion con la DB SUCCESSFULL');

    app.listen(port, () => console.log(`El servidor esta escuchando en el puerto ${port}!`));


}).catch(error => console.log(error))
