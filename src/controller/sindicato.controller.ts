import { Router, Request, Response } from 'express'
import { AppDataSource } from '../data-source';
import { Sindicato } from '../entity/sindicato.entity';
import { Token } from '../entity/token.entity';
const bcrypt = require("bcrypt");

export class SindicatoController {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public getSindicato = async (req: Request, res: Response) => {
        const token = req.query.token;
        const valid: any = await AppDataSource.manager.find(Token, { where: { token: token } });
        if (valid.length > 0) {
            return res.status(200).send(await AppDataSource.manager.find(Sindicato, {relations: ["piso"]}));
        }
        return res.status(401).send({ message: 'Usted no tiene acceso a este componente' });
    }

    public addSindicato = async (req: Request, res: Response) => {
        
        const token = req.query.token;
        const valid: any = await AppDataSource.manager.find(Token, { where: { token: token } });
        if (valid.length > 0) {
            const nombre = req.body.nombre;
            const siglas = req.body.siglas;
            const descripcion = req.body.descripcion;
            const piso = req.body.piso;

            const s = new Sindicato();
            s.nombre = nombre;
            s.siglas = siglas;
            s.descripcion = descripcion;
            s.piso = piso;
            await AppDataSource.manager.save(Sindicato, s);
            return res.status(200).send({ message: 'Sindicato agregado correctamente' });
        }

        return res.status(401).send({ message: 'Usted no tiene acceso a este componente' });
    }

    public deleteSindicato = async (req: Request, res: Response) => {
        const token = req.query.token;
        const valid: any = await AppDataSource.manager.find(Token, { where: { token: token } });
        if (valid.length > 0) {
            const delet = await AppDataSource.manager.find(Sindicato, { where: { id: req.params.id } });
            return res.status(200).send({ usuario_eliminado: await AppDataSource.manager.remove(Sindicato, delet) });
        }
        return res.status(401).send({ message: 'Usted no tiene acceso a este componente' });
    }

    public updateSindicato = async (req: Request, res: Response) => {
        const token = req.query.token;
        const nombre = req.body.nombre;
        const siglas = req.body.siglas;
        const descripcion = req.body.descripcion;
        const piso = req.body.piso;

        const valid: any = await AppDataSource.manager.find(Token, { where: { token: token } });
        if (valid.length > 0) {
            await AppDataSource.manager.update(Sindicato, req.params.id, {
                nombre: nombre,
                siglas: siglas,
                descripcion: descripcion,
                piso: piso,
            });
            return res.status(200).send({ message: 'sindicato actualizado correctamente' });
        }
        return res.status(401).send({ message: 'Usted no tiene acceso a este componente' });
    }

    public routes() {
        this.router.get('/sindicato', this.getSindicato);
        this.router.delete('/sindicato/:id', this.deleteSindicato);
        this.router.post('/sindicato', this.addSindicato);
        this.router.put('/sindicato/:id', this.updateSindicato);
    }
}
