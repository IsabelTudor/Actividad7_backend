import Libro from "../../domain/Libro";
import LibroRepository from "../../domain/LibroRepository";
import executeQuery from "../../../context/db/postgres.connection"
import Prestamo from "../../domain/Prestamo";
export default class LibroRepositoryPostgres implements LibroRepository{
   async getNumPagListables(): Promise<Libro| undefined> {
        try{
            const sql=`SELECT count(id)/10 as numPaginas FROM libros`
            const numPaginas=await executeQuery(sql)
            return numPaginas
        }catch (error){
            throw new Error("No se pudo traer los libros");
        }
    }
    async get10LibrosporPag(idPagina: number): Promise<Libro[] | undefined> {
        try{
            const sql=`select *, (select count(*) from ejemplares where disponible = 'true' and libro = libros.id) as disponibles
            from libros
            limit 10 offset '${idPagina}' * 10`;
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
    //TIENES QUE REVISARLO NO SE LOGRA INSERTAR EL PRESTAMO
    async  prestarLibro(idEjemplar: number, usuario: string, fechaprestamo: Date): Promise<Prestamo | undefined> {
        try{
            const sql=`insert into prestamos (usuario,ejemplar,fechaprestamo) values ('${usuario}','${idEjemplar}','${fechaprestamo}')`;
            const prestamoDB: any[] = await executeQuery(sql);
            const prestamo: Prestamo = {
                ejemplar: prestamoDB[0].ejemplar,
                usuario: prestamoDB[0].usuario,
                fechaprestamo: prestamoDB[0].fechaprestamo
            }
        return prestamo;
        }catch (error){
            throw new Error("No se pudo prestar el libro");
        }
    }
}


