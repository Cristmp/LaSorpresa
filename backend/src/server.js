import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { conexiondb } from "../config/db.js";
import rutas from "../routes/rutas.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const videosPath = resolve(dirname(fileURLToPath(import.meta.url)), "../../frontend/public/videos");

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use( "/videos", helmet.crossOriginResourcePolicy({ policy: "cross-origin" }),express.static(videosPath));
app.use("/api", rutas);

conexiondb.connect((err) => {
  if (err) {
    console.error("Error al conectar con la base de datos", err);
    return;
  }

  console.log("conexión exitosa a la base de datos");

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

});
