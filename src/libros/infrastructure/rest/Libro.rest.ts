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
    const libros=await libroRepository.get10LibrosporPag(parseInt(idPagina))
    res.json(libros)
})
router.get("/:busca/paginas", async(req,res)=>{
    const palabraBuscada=req.params.busca;
    const libros=await libroRepository.getLibroPorPalabraOPag(palabraBuscada);
    res.json(libros)
})
router.get("/:busca/:pagina", async(req,res)=>{
    const palabraBuscada=req.params.busca;
    const paginaBuscada=req.params.pagina;
    const libros =await libroRepository.getLibroPorPalabraYPag(palabraBuscada,parseInt(paginaBuscada));
    res.json(libros)
})
export default router