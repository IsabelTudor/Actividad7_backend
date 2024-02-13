import UsuarioUseCases from "../../application/UsuarioUseCases";
import UsuarioRepository from "../../domain/UsuarioRepository";
import express, { Request, Response } from "express";
import UsuarioRepositoryPostgres from "../../infrastructure/db/Usuario.postgres";
import Usuario from "../../domain/Usuario";
import { createToken } from "../../../context/security/auth";

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
    try {
      const { email, password } = req.body;
      const usuarioAPI: Usuario = { email, password };
      const usuario: any = await usuarioUseCases.logIn(usuarioAPI);
      if (!usuario) {
        return res.status(404).json({ mensaje: "Usuario no encontrado" });
      }
      const token = createToken(usuario);
      res.json({ token, usuario });
    } catch (error) {
      res.status(500).json({ mensaje: "Error durante el inicio de sesión" });
    }
  });
  

  export default router