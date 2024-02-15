import LibroRepository from "../domain/LibroRepository";
import Prestamo from "../domain/Prestamo";

export default class LibroUseCases{
    private libroRepository:LibroRepository;

    constructor(libroRepository:LibroRepository){
        this.libroRepository=libroRepository
    }
    async getNumPagListables(){
        return await this.libroRepository.getNumPagListables();
    }
    async get10LibrosporPag(idPagina:number){
        return await this.libroRepository.get10LibrosporPag(idPagina);
    }
    async getLibroPorPalabraOPag(palabra:string){
        return await this.libroRepository.getLibroPorPalabraOPag(palabra)
    }
    async getLibroPorPalabraYPag(palabra:string, idPagina:number){
        return await this.libroRepository.getLibroPorPalabraYPag(palabra,idPagina);
    }
    async prestarLibro(idEjemplar:number,usuario:string,fechaprestamo:Date){
        return await this.libroRepository.prestarLibro(idEjemplar,usuario,fechaprestamo)
    }
    async verLibrosPrestadosDelUsuario(email:string){
        return await this.libroRepository.verLibrosPrestadosDelUsuario(email);
    }
    //select count(id) from ejemplares where libro in(select id from libros where disponible='true' and id=220406)
//UPDATE libros SET disponible = 'false' WHERE id IN (SELECT id FROM libros WHERE id = 220406 AND disponible != 'false' LIMIT 1);
//Ten cuidado que a lo mejor la disponibilidad tiene que estar en el ejemplar y no en el libro
}
