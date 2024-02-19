import express from "express";
import {isAuth } from "../../../context/security/auth";
import LibroRepository from "../../domain/LibroRepository";
import LibroRepositoryPostgres from "../db/Libro.postgres";
import LibroUseCases from "../../application/LibroUseCases";


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
router.post("/:libro", isAuth ,async(req,res)=>{
    try{
        const email = req.body.user;
        const ejemplar = parseInt(req.params.libro)
        const prestamo = await libroUseCases.prestarLibro(ejemplar,email)
        res.json(prestamo)
    }catch(error){
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }  
})
router.get("/",isAuth,async(req,res)=>{
    try{
        const email=req.body.user;
        const visualizar=await libroUseCases.verLibrosPrestadosDelUsuario(email);
        res.json(visualizar)
    }catch(error){
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }  
})
router.put("/:idEjemplar", isAuth,async(req,res)=>{
    try{
        const ejemplar=parseInt(req.params.idEjemplar)
        const email=req.body.user;
        const visualizar=await libroUseCases.devolverLibro(ejemplar,email);
        res.json(visualizar)
    }catch(error){
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }  
})
export default router