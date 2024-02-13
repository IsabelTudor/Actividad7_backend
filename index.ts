import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./src/usuarios/infrastructure/rest/Usuario.rest";

dotenv.config();
const app = express();
const port = 8080;
const allowedOrigins = ["http://localhost:5173"];
const options: cors.CorsOptions = {
  origin: allowedOrigins,
};


app.use(express.json());
app.use(cors(options));

app.use("/api/usuarios", router)


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });