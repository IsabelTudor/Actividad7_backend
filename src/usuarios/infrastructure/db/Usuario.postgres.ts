import Usuario from "../../domain/Usuario";
import UsuarioRepository from "../../domain/UsuarioRepository";
import executeQuery from "../../../context/db/postgres.connection"
import Prestamos from "../../domain/Prestamos";

export default class UsuarioRepositoryPostgres implements UsuarioRepository{
    async registrar(usuario: Usuario): Promise<Usuario | undefined> {
        try{
            const sql =`insert into usuarios (email, password, nombre, apellidos)
             values ('${usuario.email}', '${usuario.password}','${usuario.nombre}','${usuario.apellidos}') returning *`
             const rows:any[]=await executeQuery(sql);
             const usuarioDB:Usuario={
                email:rows[0].email
             }
             return usuarioDB
        }catch (error){
            console.error("No se ha podido registrar el usuario");
        }
    }
    async logIn(usuario: Usuario): Promise<Usuario | undefined> {
        try{
            const {email}=usuario;
            const sql=`select * from usuarios where email='${email}'`
            const rows:any[]=await executeQuery(sql);
            if(rows.length===0){
                throw new Error("Usuario/contraseña no es correcto");
            }else{
                const usuarioDB: Usuario={
                    email:rows[0].email,
                    nombre: rows[0].nombre,
                    apellidos:rows[0].apellidos,
                    password:rows[0].password
                }
                return usuarioDB
            } 
        }catch(error){
            console.error("No se ha podido logear el usuario");
            return undefined
        }
    }
    async actualizar(usuarioNuevo: Usuario): Promise<Usuario> {
        
        const consulta = `UPDATE usuarios
        SET  nombre='${usuarioNuevo.nombre}', apellidos='${usuarioNuevo.apellidos}' WHERE email='${usuarioNuevo.email}' returning *;`

        const rows: any[] = await executeQuery(consulta);

        const usuarioBD: Usuario = {
    
            email: rows[0].email
        }

        return usuarioBD;
    } 
}
    


