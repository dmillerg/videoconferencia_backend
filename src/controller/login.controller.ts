import { Router, Request, Response } from 'express'
import { AppDataSource } from '../data-source';
import { Token } from '../entity/token.entity';
import { Usuario } from '../entity/usuario.entity';
const bcrypt = require("bcrypt");

export class LoginController {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public login = async (req: Request, res: Response) => {
    const usuario = req.body.usuario;
    const password = req.body.password;

    const exist = await AppDataSource.manager.find(Usuario, { where: { usuario: usuario } });
    if (exist.length > 0) {
      if (bcrypt.compareSync(password, exist[0].password)) {
        const token = this.generateToken(usuario);
        this.saveToken(token, exist[0].id);
        await AppDataSource.manager.update(Usuario, exist[0].id, { ultima_sesion: new Date() });
        return res.status(200).json({
          message: "usuario autenticado correctamente",
          status: 200,
          usuario: exist[0],
          token: token,
        });
      } else {
        return res.status(400).send({ message: 'El usuario o la contraseña son incorrectos' });
      }
    } else {
      return res.status(404).send({ message: 'Este usuario no esta registrado' });
    }
  }

  private getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  private generateToken(usuario: string): string {
    let token = "";
    for (var i = 0; i < usuario.length; i++) {
      token += usuario[i] + this.getRandomInt(0, 10);
      if (i != usuario.length - 1) {
        token += "-";
      }
    }
    return token;
  }

  private saveToken = async (token: string, user_id: number) => {
    const tokens = new Token();
    tokens.token = token;
    tokens.usuario_id = user_id;
    await AppDataSource.manager.save(tokens);
  }

  public logout = async (req: Request, res: Response) => {
    const token = req.query.token;
    const valid: any = await AppDataSource.manager.find(Token, { where: { token: token } });
    if (valid.length > 0) {
      const token = await AppDataSource.manager.find(Token, { where: { usuario_id: req.body.id } });
      AppDataSource.manager.remove(Token, token);
      return res.status(200).send({message: 'Usuario ha cerrado sesion'});
    }
    return res.status(401).send({ message: 'Usted no tiene acceso a este componente' });
  }

  public routes() {
    this.router.post('/login', this.login);
    this.router.post('/logout', this.logout);
  }
}

