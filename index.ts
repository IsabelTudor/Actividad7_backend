import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routerUsuarios from "./src/usuarios/infrastructure/rest/Usuario.rest";
import routerLibros from "./src/libros/infrastructure/rest/Libro.rest";
dotenv.config();
const app = express();
const port = 8080;
const allowedOrigins = ["http://localhost:5173"];
const options: cors.CorsOptions = {
  origin: allowedOrigins,
};


app.use(express.json());
app.use(cors(options));

app.use("/api/usuarios", routerUsuarios)
app.use("/api/libros", routerLibros)


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });