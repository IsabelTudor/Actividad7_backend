import UsuarioUseCases from "../../application/UsuarioUseCases";
import UsuarioRepository from "../../domain/UsuarioRepository";
import express, { Request, Response } from "express";
import UsuarioRepositoryPostgres from "../../infrastructure/db/Usuario.postgres";
import Usuario from "../../domain/Usuario";
import { createToken, isAuth } from "../../../context/security/auth";

const usuariosRepository: UsuarioRepository = new UsuarioRepositoryPostgres();

const usuarioUseCases: UsuarioUseCases= new UsuarioUseCases(usuariosRepository)

const router = express.Router();

router.post("/registro", async (req: Request, res: Response) => {
    const {email, password,nombre, apellidos} = req.body;
    const usuarioAPI: Usuario = {email, password,nombre,apellidos};
    const usuario: any = await usuarioUseCases.registrar(usuarioAPI);
    res.json(usuario);
  });
 
  router.post("/login", async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const usuarioAPI: Usuario = { email, password };

    try {
        const usuario: any = await usuarioUseCases.logIn(usuarioAPI);
        const usuarioDB={ email: usuario.email, nombre: usuario.nombre, apellidos:usuario.apellidos}
        const token = createToken(usuario);
        res.json({ token, usuarioDB});
    } catch (error) {
      res.status(401).json({ mensaje: "Usuario o contraseña incorrectos" });

    }
});



  
  

  export default router