import { Router, Request, Response } from 'express'
import moment = require('moment');
import { MoreThanOrEqual } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Token } from '../entity/token.entity';
import { Usuario } from '../entity/usuario.entity';
import { VideoConferencia } from '../entity/videoconferencia.entity';
const bcrypt = require("bcrypt");

export class UsuarioController {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public getUsuario = async (req: Request, res: Response) => {
        const token = req.query.token;
        const valid: any = await AppDataSource.manager.find(Token, { where: { token: token } });
        if (valid.length > 0) {
            return res.status(200).send(await AppDataSource.manager.find(Usuario, { relations: ['piso'] }));
        }
        return res.status(401).send({ message: 'Usted no tiene acceso a este componente' });
    }

    public addUsuario = async (req: Request, res: Response) => {
        const token = req.query.token;

        const valid: any = await AppDataSource.manager.find(Token, { where: { token: token } });
        if (valid.length > 0) {
            console.log(req.body);

            const usuario = req.body.usuario;
            const password = req.body.password;
            const nombre = req.body.nombre;
            const correo = req.body.correo;
            const rol = req.body.rol;
            const piso = req.body.piso;

            if (await (await AppDataSource.manager.find(Usuario, { where: { usuario: usuario } })).length == 0) {
                bcrypt.hash(password, 10, async (err, encrypted) => {
                    if (err) {
                        return res.status(500).send({ message: 'En estos momentos no se puede por favor intentelo mas tarde' });
                    } else {
                        const user = new Usuario();
                        user.usuario = usuario;
                        user.password = encrypted;
                        user.nombre = nombre;
                        user.correo = correo;
                        user.rol = rol;
                        user.fecha_registro = new Date();
                        user.ultima_sesion = new Date();
                        user.piso = piso;
                        await AppDataSource.manager.save(Usuario, user);
                        return res.status(200).send({ message: 'Usuario agregado correctamente' });
                    }
                });
            } else
                return res.status(400).send({ message: 'El usuario ya esta siendo usado' });
        } else
            return res.status(401).send({ message: 'Usted no tiene acceso a este componente' });
    }

    public deleteUsuario = async (req: Request, res: Response) => {
        const token = req.query.token;
        const valid: any = await AppDataSource.manager.find(Token, { where: { token: token } });
        if (valid.length > 0) {
            const delet = await AppDataSource.manager.find(Usuario, { where: { id: req.params.id } });
            return res.status(200).send({ usuario_eliminado: await AppDataSource.manager.remove(Usuario, delet) });
        }
        return res.status(401).send({ message: 'Usted no tiene acceso a este componente' });
    }

    public updateUsuario = async (req: Request, res: Response) => {
        const token = req.query.token;

        const body = req.body;
        const usuario = body.usuario;
        const nombre = body.nombre;
        const correo = body.correo;
        const rol = body.rol;
        const piso = body.piso;
        const valid: any = await AppDataSource.manager.find(Token, { where: { token: token } });
        if (valid.length > 0) {
            await AppDataSource.manager.update(Usuario, req.params.id, {
                usuario: usuario,
                nombre: nombre,
                correo: correo,
                rol: rol,
                piso: piso,
            });
            return res.status(200).send({ message: 'usuario actualizado correctamente' });
        }
        return res.status(401).send({ message: 'Usted no tiene acceso a este componente' });
    }

    public cambiarPass = async (req: Request, res: Response) => {
        console.log('dasd');

        const token = req.query.token;

        const body = req.body;
        const id = body.id;
        const password = body.password;

        const valid: any = await AppDataSource.manager.find(Token, { where: { token: token } });
        if (valid.length > 0) {
            bcrypt.hash(password, 10, async (err, encrypted) => {
                if (err) {
                    return res.status(500).send({ message: 'En estos momentos no se puede por favor intentelo mas tarde' });
                } else {
                    await AppDataSource.manager.update(Usuario, id, {
                        password: encrypted
                    });
                    return res.status(200).send({ message: 'contrase??a cambiada correctamente' });

                }
            });
        } else
            return res.status(401).send({ message: 'Usted no tiene acceso a este componente' });
    }

    public notificaciones = async (req: Request, res: Response) => {
        const token = req.query.token;
        const valid: any = await AppDataSource.manager.find(Token, { where: { token: token } });
        if (valid.length > 0) {
            const id = req.query.id;
            const notificaciones = await AppDataSource.manager.find(VideoConferencia,
                {
                    relations: ["encargado", "tecnico_respaldo", "citado_por", "sindicato"],
                    where: {fecha: MoreThanOrEqual(new Date())}
                });
                // console.log('id=>',id);
                
                // console.log(notificaciones.filter(e=>e.encargado.id == id || e.tecnico_respaldo.id==id || e.citado_por.id == id));
                
            return res.status(200).send(notificaciones.filter(e=>e.encargado.id == id || e.tecnico_respaldo.id==id || e.citado_por.id == id));
        } else
            return res.status(401).send({ message: 'Usted no tiene acceso a este componente' });
    }

    public routes() {
        this.router.get('/usuario', this.getUsuario);
        this.router.delete('/usuario/:id', this.deleteUsuario);
        this.router.post('/usuario', this.addUsuario);
        this.router.put('/usuario/:id', this.updateUsuario);
        this.router.put('/usuario', this.cambiarPass);
        this.router.get('/notificaciones', this.notificaciones);
    }
}
