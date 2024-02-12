import Usuario from "../../domain/Usuario";
import UsuarioRepository from "../../domain/UsuarioRepository";
import executeQuery from "../../../context/db/postgres.connection"
import Prestamos from "../../domain/Prestamos";

export default class UsuarioRepositoryPostgres implements UsuarioRepository{
    async registrar(usuario: Usuario): Promise<Usuario | undefined> {
        try{
            const sql =`insert into usuarios (email, alias, password, nombre, apellidos)
             values ('${usuario.email}','${usuario.alias}', '${usuario.password}','${usuario.nombre}','${usuario.apellidos}')`
             const rows:any[]=await executeQuery(sql);
             const usuarioDB:Usuario={
                email:rows[0].email,
                alias:rows[0].alias,
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
        const {email,alias,password}=usuario;
        try{
            const sql=`select * from usuarios where email='${email}' or alias='${alias}' and password='${password}'`
            const rows:any[]=await executeQuery(sql);
            if(rows.length===0){
                throw new Error("Usuario/contraseña no es correcto");
            }else{
                const usuarioDB: Usuario={
                    email:rows[0].email,
                    alias:rows[0].alias,
                    password:rows[0].password,
                    nombre: rows[0].nombre,
                    apellidos: rows[0].apellidos
                }
                return usuarioDB
            }
        }catch(error){
            console.error("No se ha podido logear el usuario");
            return undefined
        }
    }
    async prestar(idEjemplar: number, aliasUsuario: string): Promise<Prestamos[] | undefined> {
        const ejemplarSQL=`select * from ejemplares where id=${idEjemplar}`;
        const rows:any[]=await executeQuery(ejemplarSQL);
        if(rows.length===0){
            throw new Error("No se encuentra ningun ejemplar con este id")
        }else{
          
        }
        throw new Error("Method not implemented.");
    }
    devolver(idEjemplar: number, aliasUsuario: string): Promise<Prestamos[] | undefined> {
        throw new Error("Method not implemented.");
    }

}