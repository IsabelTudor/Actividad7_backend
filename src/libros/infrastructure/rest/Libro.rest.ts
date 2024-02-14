import express, { Request, Response } from "express";
import { createToken, isAuth } from "../../../context/security/auth";
import LibroRepository from "../../domain/LibroRepository";
import LibroRepositoryPostgres from "../db/Libro.postgres";
import LibroUseCases from "../../application/LibroUseCases";
import Libro from "../../domain/Libro";

const libroRepository:LibroRepository=new LibroRepositoryPostgres()
const libroUseCases:LibroUseCases=new LibroUseCases(libroRepository);

const router=express.Router();
router.get("/paginas", async(req,res)=>{
    const numPags:any=await libroUseCases.getNumPagListables()
    res.json(numPags)
})
router.get("/:pagina",async(req,res)=>{
    const idPagina=req.params.pagina;
    const libros=await libroUseCases.get10LibrosporPag(parseInt(idPagina))
    res.json(libros)
})
router.get("/:busca/paginas", async(req,res)=>{
    const palabraBuscada=req.params.busca;
    const libros=await libroUseCases.getLibroPorPalabraOPag(palabraBuscada);
    res.json(libros)
})
router.get("/:busca/:pagina", async(req,res)=>{
    const palabraBuscada=req.params.busca;
    const paginaBuscada=req.params.pagina;
    const libros =await libroUseCases.getLibroPorPalabraYPag(palabraBuscada,parseInt(paginaBuscada));
    res.json(libros)
})
router.post("/:libro",isAuth,async(req,res)=>{
    try{
        const fechaPrestamo= new Date();
        const emailUsuario = req.body;
        const idLibro = parseInt(req.params.libro)
        const prestamo = await libroUseCases.prestarLibro(idLibro,emailUsuario,fechaPrestamo)
        console.log(fechaPrestamo,emailUsuario,idLibro);
        
        res.json(prestamo)
    }catch(error){
        console.error(error);
        res.status(500).send(error);
    }  
})
export default router