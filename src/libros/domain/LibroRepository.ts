import Libro from "./Libro";

export default interface LibroRepository{
    getNumPagListables():Promise <Libro|undefined>
    get10LibrosporPag(idPagina:number):Promise<Libro[]|undefined>
    getLibroPorPalabraOPag(palabra:string):Promise<Libro|undefined>
    getLibroPorPalabraYPag(palabra:string, idPagina:number):Promise<Libro[]|undefined>
}