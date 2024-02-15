import Libro from "./Libro";

export default interface Ejemplar{
    id?:number,
    libro?: Libro,
    disponible?:boolean
}