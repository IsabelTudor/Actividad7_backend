import Usuario from "../../domain/Usuario";
import UsuarioRepository from "../../domain/UsuarioRepository";
import executeQuery from "../../../context/db/postgres.connection"
import Prestamos from "../../domain/Prestamos";

export default class UsuarioRepositoryPostgres implements UsuarioRepository{
    async registrar(usuario: Usuario): Promise<Usuario | undefined> {
        try{
            const sql =`insert into usuarios (email, password, nombre, apellidos)
             values ('${usuario.email}', '${usuario.password}','${usuario.nombre}','${usuario.apellidos}')`
             const rows:any[]=await executeQuery(sql);
             const usuarioDB:Usuario={
                email:rows[0].email,
                password:rows[0].password,
                nombre: rows[0].nombre,
                apellidos: rows[0].apellidos
             }
             return usuarioDB
        }catch (error){
            console.error("No se ha podido registrar el usuario");
        }
    }
    async logIn(usuario: Usuario): Promise<Usuario | undefined> {
        const {email}=usuario;
        try{
            const sql=`select * from usuarios where email='${email}'`
            const rows:any[]=await executeQuery(sql);
            if(rows.length===0){
                throw new Error("Usuario/contraseña no es correcto");
            }else{
                const usuarioDB: Usuario={
                    email:rows[0].email,
                    nombre: rows[0].nombre
                }
                return usuarioDB
            }
        }catch(error){
            console.error("No se ha podido logear el usuario");
            return undefined
        }
    }
   

}