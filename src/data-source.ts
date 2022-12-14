import "reflect-metadata"
import { DataSource } from "typeorm"
import { Piso } from "./entity/pisos.entity";
import { Sindicato } from "./entity/sindicato.entity";
import { Token } from "./entity/token.entity";
import { Usuario } from "./entity/usuario.entity";
import { VideoConferencia } from "./entity/videoconferencia.entity";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "videoconferencia",
    synchronize: true,
    logging: false,
    entities: [Usuario, VideoConferencia, Token, Piso, Sindicato],
    migrations: [],
    subscribers: [],
})
