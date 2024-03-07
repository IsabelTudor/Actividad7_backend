import Libro from "../../domain/Libro";
import LibroRepository from "../../domain/LibroRepository";
import executeQuery from "../../../context/db/postgres.connection"
import Prestamo from "../../domain/Prestamo";
import Ejemplar from "../../domain/Ejemplar";
export default class LibroRepositoryPostgres implements LibroRepository{

   async getNumPagListables(): Promise<Libro| undefined> {
        try{
            const sql=`SELECT count(id)/10 as numPags FROM libros`
            const numPags=await executeQuery(sql)
            return numPags
        }catch (error){
            throw new Error("No se pudo traer los libros");
        }
    }
    async get10LibrosporPag(idPagina: number): Promise<Libro[] | undefined> {
        try{
            const sql=`SELECT *, 
            (SELECT COUNT(*) 
             FROM ejemplares 
             WHERE disponible = 'true' AND libro = libros.id) AS disponibles
     FROM libros
     ORDER BY autor ASC
     LIMIT 10 OFFSET '${idPagina}'* 10;`;
            const libros:any[]=await executeQuery(sql);
            return libros
        }catch (error){
            throw new Error("No se pudo traer los 10 libros");
        }
    }
    async getLibroPorPalabraOPag(palabra: string): Promise<Libro | undefined> {
        try{
            const sql=`select count(id)/10 as numPaginas from libros where titulo like '%${palabra}%'`
            const libros=await executeQuery(sql);
            return libros
        }catch (error){
            throw new Error("No se pudo traer los 10 libros");
        }
    }
    async getLibroPorPalabraYPag(palabra: string, idPagina: number): Promise<Libro []| undefined> {
        try{
            const sql=`SELECT *, (SELECT COUNT(*) FROM ejemplares WHERE disponible = 'true' AND libro = libros.id) AS numPaginas
            FROM libros
            WHERE titulo LIKE '%${palabra}%'
            LIMIT 10 OFFSET '${idPagina}';`
            const libros:any[]=await executeQuery(sql);
            return libros;
        }catch (error){
            throw new Error("No se pudo filtar");
        }
    }
    
    async prestarLibro(idEjemplar: number, usuario: String): Promise<Prestamo | undefined> {
        
        
        const consulta = `INSERT INTO prestamos(
            usuario, ejemplar, fechaprestamo)
            VALUES ('${usuario}', ${idEjemplar}, now()) RETURNING *;`;
            
        const query = `update ejemplares set disponible='false' where id=(select id from ejemplares where libro='${idEjemplar}' limit 1)`;
        
        const prestamoDB: any[] = await executeQuery(consulta);
        await executeQuery(query)
        console.log(prestamoDB);
        
            const prestamo: Prestamo = {
                ejemplar: prestamoDB[0].ejemplar,
                usuario: prestamoDB[0].usuario,
                fechaprestamo: prestamoDB[0].fechaprestamo
            }
    
        return prestamo;

    }
    async verLibrosPrestadosDelUsuario(email:string):Promise<Prestamo[] |undefined>{
        const prestamos : Prestamo[] = []
        try{
            const sql = `SELECT
            prestamos.ejemplar as ejemplar_id,
            libros.id as libro_id,
            libros.titulo,
            libros.autor,
            prestamos.fechaprestamo,
            prestamos.fechadevolucion
            from prestamos
            join ejemplares
            on prestamos.ejemplar = ejemplares.id
            join libros
            on libros.id =ejemplares.libro
            WHERE
            prestamos.usuario = '${email}' `
              
            const prestamoDB: any[] = await executeQuery(sql);
            for(const item of prestamoDB){

                const libroPrestado: Libro = {
                    id: item.libro_id,
                    titulo: item.titulo,
                    autor: item.autor,
                }
    
                const ejemplar:Ejemplar = {
                    id: item.ejemplar_id,
                    libro:libroPrestado
                }
    
                const prestamo: Prestamo = {
                    ejemplar: ejemplar,
                    fechaprestamo: item.fechaprestamo,
                    fechadevolucion:item.fechadevolucion
                }
    
                prestamos.push(prestamo);
            }
    
            return prestamos
        
    }catch(error){
        throw new Error("No se pudo filtar o traer los libros ");
    }
}
    async devolverLibro(idEjemplar: number, usuario: string): Promise<Prestamo> {
        const consulta = `UPDATE prestamos
        SET fechadevolucion=now()
        WHERE ejemplar=${idEjemplar} and usuario='${usuario}' RETURNING *;`;

        const query = `UPDATE ejemplares
        SET disponible='true'
        WHERE id=${idEjemplar} `;
        await executeQuery(query)
        const prestamoDB: any[] = await executeQuery(consulta);
        
        console.log(prestamoDB);
        
            const prestamo: Prestamo = {
                ejemplar: prestamoDB[0].ejemplar,
                usuario: prestamoDB[0].usuario,
                fechaprestamo: prestamoDB[0].fechaprestamo,
                fechadevolucion:prestamoDB[0].fechadevolucion
            }
    
        return prestamo;

    }
        
}






