import { Router, Request, Response } from 'express'
import { AppDataSource } from '../data-source';
import { Piso } from '../entity/pisos.entity';
import { Token } from '../entity/token.entity';

export class PisoController {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public getPiso = async (req: Request, res: Response) => {
        const token = req.query.token;
        const valid: any = await AppDataSource.manager.find(Token, { where: { token: token } });
        if (valid.length > 0) {
            return res.status(200).send(await AppDataSource.manager.find(Piso));
        }
        return res.status(401).send({ message: 'Usted no tiene acceso a este componente' });
    }

    public addPiso = async (req: Request, res: Response) => {
        
        const token = req.query.token;
        const valid: any = await AppDataSource.manager.find(Token, { where: { token: token } });
        if (valid.length > 0) {
            const numero = req.body.numero;
            const p = new Piso();
            p.numero = numero;
            await AppDataSource.manager.save(Piso, p);
            return res.status(200).send({ message: 'Piso agregado correctamente' });
        }
        return res.status(401).send({ message: 'Usted no tiene acceso a este componente' });
    }

    public deletePiso = async (req: Request, res: Response) => {
        const token = req.query.token;
        const valid: any = await AppDataSource.manager.find(Token, { where: { token: token } });
        if (valid.length > 0) {
            const delet = await AppDataSource.manager.find(Piso, { where: { id: req.params.id } });
            return res.status(200).send({ usuario_eliminado: await AppDataSource.manager.remove(Piso, delet) });
        }
        return res.status(401).send({ message: 'Usted no tiene acceso a este componente' });
    }

    public updatePiso = async (req: Request, res: Response) => {
        const token = req.query.token;
        const numero = req.body.numero;
        const valid: any = await AppDataSource.manager.find(Token, { where: { token: token } });
        if (valid.length > 0) {
            await AppDataSource.manager.update(Piso, req.params.id, {
                numero: numero,
            });
            return res.status(200).send({ message: 'piso actualizado correctamente' });
        }
        return res.status(401).send({ message: 'Usted no tiene acceso a este componente' });
    }

    public routes() {
        this.router.get('/piso', this.getPiso);
        this.router.delete('/piso/:id', this.deletePiso);
        this.router.post('/piso', this.addPiso);
        this.router.put('/piso/:id', this.updatePiso);
    }
}
