import Libro from "./Libro";
import Prestamo from "./Prestamo";

export default interface LibroRepository{
    getNumPagListables():Promise <Libro|undefined>
    get10LibrosporPag(idPagina:number):Promise<Libro[]|undefined>
    getLibroPorPalabraOPag(palabra:string):Promise<Libro|undefined>
    getLibroPorPalabraYPag(palabra:string, idPagina:number):Promise<Libro[]|undefined>
    prestarLibro(idEjemplar:number,usuario:string,fechaprestamo:Date):Promise<Prestamo|undefined>
    verLibrosPrestadosDelUsuario(email:string):Promise<Prestamo[] |undefined>
}