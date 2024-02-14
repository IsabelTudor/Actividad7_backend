import Libro from "../../domain/Libro";
import LibroRepository from "../../domain/LibroRepository";
import executeQuery from "../../../context/db/postgres.connection"
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
}


