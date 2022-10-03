import { LoginController } from "./controller/login.controller";
import { UsuarioController } from "./controller/usuario.controller";
import { VideoConferenciaController } from "./controller/videoconferencia.controller";
import { AppDataSource } from "./data-source"

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

    // Cargamos las rutas
    app.use('/apis', user_controller.router);
    app.use('/apis', login_controller.router);
    app.use('/apis', videoconferencia_controller.router);
    app.get('/apis', function(req, res){
console.log('sss');

    });
    

    module.exports = app;

    // console.log("Inserting a new user into the database...")
    // const user = new Usuario()
    // user.usuario = "Timber"
    // user.nombre = "Saw"
    // user.ultima_session = "25"
    // await AppDataSource.manager.save(user)
    // console.log("Saved a new user with id: " + user.id)

    // console.log("Loading users from the database...")
    // const users = await AppDataSource.manager.find(Usuario)
    // console.log("Loaded users: ", users)

    // console.log("Here you can setup and run express / fastify / any other framework.")
    console.log('Conexion con la DB SUCCESSFULL');
    
    app.listen(port, () => console.log(`El servidor esta escuchando en el puerto ${port}!`));


}).catch(error => console.log(error))
