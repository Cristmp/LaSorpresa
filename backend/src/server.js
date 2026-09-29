import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import { conexiondb } from "../config/db.js";
import rutas from "../routes/rutas.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(helmet());
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
