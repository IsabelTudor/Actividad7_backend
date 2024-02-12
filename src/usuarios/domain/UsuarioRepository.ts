import Usuario from "./Usuario";
import Prestamos from "./Prestamos"
export default interface UsuarioRepository{
    registrar(usuario:Usuario):Promise<Usuario|undefined>
    logIn(usuario:Usuario): Promise<Usuario|undefined>
    prestar(idEjemplar:number, aliasUsuario:string):Promise<Prestamos[]|undefined>
    devolver(idEjemplar:number,aliasUsuario:string):Promise<Prestamos[]|undefined>
}