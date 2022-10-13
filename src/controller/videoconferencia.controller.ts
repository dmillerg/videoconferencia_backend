import { Router, Request, Response } from 'express'
import { AppDataSource } from '../data-source';
import { Token } from '../entity/token.entity';
import { Usuario } from '../entity/usuario.entity';
import { VideoConferencia } from '../entity/videoconferencia.entity';
const bcrypt = require("bcrypt");

export class VideoConferenciaController {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public getVideoConferencia = async (req: Request, res: Response) => {
        const token = req.query.token;
        const valid: any = await AppDataSource.manager.find(Token, { where: { token: token } });
        if (valid.length > 0) {
            return res.status(200).send(await AppDataSource.manager.find(VideoConferencia, {relations: ["encargado","tecnico_respaldo"]}));
        }
        return res.status(401).send({ message: 'Usted no tiene acceso a este componente' });
    }

    public addVideoConferencia = async (req: Request, res: Response) => {
        
        const token = req.query.token;
        console.log(req.body);
        
        const valid: any = await AppDataSource.manager.find(Token, { where: { token: token } });
        if (valid.length > 0) {
            const nombre = req.body.nombre;
            const descripcion = req.body.descripcion;
            const citado_por = req.body.citado_por;
            const estado = req.body.estado;
            const encargado = req.body.encargado;
            const tecnico_respaldo = req.body.tecnico_respaldo;
            const mannana = req.body.mannana;
            const tarde = req.body.tarde;
            const fecha = req.body.fecha;
            const hora_inicio = req.body.hora_inicio;
            const hora_fin = req.body.hora_fin;
            const not_allowed = req.body.not_allowed;
            const cant_personas = req.body.cant_personas;
            const salon = req.body.salon;
            const sindicato = req.body.sindicato;


            const vc = new VideoConferencia();
            vc.nombre = nombre;
            vc.descripcion = descripcion;
            vc.citado_por = citado_por;
            vc.estado = estado;
            vc.encargado = encargado;
            vc.tecnico_respaldo = tecnico_respaldo;
            vc.mannana = mannana=='1'?true: false;
            vc.tarde = tarde=='1'?true: false;
            vc.fecha = new Date(fecha);
            vc.hora_inicio = new Date(hora_inicio);
            vc.hora_fin = new Date(hora_fin);
            vc.not_allowed = not_allowed;
            vc.cant_personas = cant_personas;
            vc.salon = salon;
            vc.sindicato = sindicato;
            await AppDataSource.manager.save(VideoConferencia, vc);
            return res.status(200).send({ message: 'VideoConferencia agregada correctamente' });
        }

        return res.status(401).send({ message: 'Usted no tiene acceso a este componente' });
    }

    public deleteVideoConferencia = async (req: Request, res: Response) => {
        const token = req.query.token;
        const valid: any = await AppDataSource.manager.find(Token, { where: { token: token } });
        if (valid.length > 0) {
            const delet = await AppDataSource.manager.find(VideoConferencia, { where: { id: req.params.id } });
            return res.status(200).send({ usuario_eliminado: await AppDataSource.manager.remove(VideoConferencia, delet) });
        }
        return res.status(401).send({ message: 'Usted no tiene acceso a este componente' });
    }

    public updateVideoConferencia = async (req: Request, res: Response) => {
        const token = req.query.token;

        const nombre = req.body.nombre;
        const descripcion = req.body.descripcion;
        const citado_por = req.body.citado_por;
        const estado = req.body.estado;
        const encargado = req.body.encargado;
        const tecnico_respaldo = req.body.tecnico_respaldo;
        const mannana = req.body.mannana;
        const tarde = req.body.tarde;
        const hora_inicio = req.body.hora_inicio;
        const hora_fin = req.body.hora_fin;
        const not_allowed = req.body.not_allowed;
        const cant_personas = req.body.cant_personas;
        const salon = req.body.salon;

        const valid: any = await AppDataSource.manager.find(Token, { where: { token: token } });
        if (valid.length > 0) {
            await AppDataSource.manager.update(VideoConferencia, req.params.id, {
                nombre: nombre,
                descripcion: descripcion,
                citado_por: citado_por,
                estado: estado,
                encargado: encargado,
                tecnico_respaldo: tecnico_respaldo,
                mannana: mannana,
                tarde: tarde,
                hora_inicio: hora_inicio,
                hora_fin: hora_fin,
                not_allowed: not_allowed,
                cant_personas: cant_personas,
                salon: salon,
            });
            return res.status(200).send({ message: 'videoconferencia actualizada correctamente' });
        }
        return res.status(401).send({ message: 'Usted no tiene acceso a este componente' });
    }

    public routes() {
        this.router.get('/videoconferencia', this.getVideoConferencia);
        this.router.delete('/videoconferencia/:id', this.deleteVideoConferencia);
        this.router.post('/videoconferencia', this.addVideoConferencia);
        this.router.put('/videoconferencia/:id', this.updateVideoConferencia);
    }
}
