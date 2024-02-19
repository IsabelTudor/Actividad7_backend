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
    async prestarLibro(idEjemplar:number,usuario:string){
        return await this.libroRepository.prestarLibro(idEjemplar,usuario)
    }
    async verLibrosPrestadosDelUsuario(email:string){
        return await this.libroRepository.verLibrosPrestadosDelUsuario(email);
    }
    async devolverLibro(idEjemplar:number,usuario:string){
        return await this.libroRepository.devolverLibro(idEjemplar,usuario);
    }
}
