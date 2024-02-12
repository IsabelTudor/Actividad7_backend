import Usuario from "./Usuario";

export default interface Prestamos{
    usuario:Usuario,
    ejemplar:any,
    fechaPrestamo:Date,
    fechaDevolucion:Date
}