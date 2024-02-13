import Usuario from "./Usuario";
import Prestamos from "./Prestamos"
export default interface UsuarioRepository{
    registrar(usuario:Usuario):Promise<Usuario|undefined>
    logIn(usuario:Usuario): Promise<Usuario|undefined>
}