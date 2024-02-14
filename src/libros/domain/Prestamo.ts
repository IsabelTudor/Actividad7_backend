import Usuario from "../../usuarios/domain/Usuario";
import Ejemplar from "./Ejemplar";

export default interface Prestamo{
    usuario: Usuario,
    ejemplar: Ejemplar,
    fechaprestamo: Date,
    fechadevolucion?: Date
}