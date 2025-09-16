// server.js
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import axios from "axios";

// Cargar variables de entorno desde .env
process.loadEnvFile(".env");

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// Servir carpetas estáticas
app.use(express.static(path.join(__dirname, "public")));
app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use("/data", express.static(path.join(__dirname, "data")));

// Endpoint de fondo aleatorio de Unsplash
app.get("/api/background", async (req, res) => {
  const clientId = process.env.UNSPLASH_ACCESS_KEY;
  const baseUrl = process.env.UNSPLASH_URL;

  try {
    const url = `${baseUrl}&client_id=${clientId}`;
    const response = await axios.get(url);
    const imageUrl = response.data.urls.regular;
    res.json({ url: imageUrl });
  } catch (error) {
    console.error("Error al obtener imagen de Unsplash:", error.message);
    res.status(500).json({ url: null });
  }
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
