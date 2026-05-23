import express from "express";
import taskRoutes from "./routes/tasks.js";
import { fileURLToPath } from "url";

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "API de Tareas funcionando" });
});

app.use("/tasks", taskRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Ruta no encontrada" });
});

const PORT = process.env.PORT || 3000;
const isMain = process.argv[1] === fileURLToPath(import.meta.url);

if (isMain) {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}

export default app;
