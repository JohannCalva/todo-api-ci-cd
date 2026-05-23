import request from "supertest";
import app from "../src/app.js";
import { resetTasks } from "../src/controllers/tasksController.js";

beforeEach(() => {
  resetTasks();
});

// GET /tasks
test("GET /tasks - retorna lista vacía inicialmente", async () => {
  const res = await request(app).get("/tasks");

  expect(res.status).toBe(200);
  expect(res.body.success).toBe(true);
  expect(res.body.data).toEqual([]);
  expect(res.body.count).toBe(0);
});

// POST /tasks
test("POST /tasks - crea una tarea correctamente", async () => {
  const res = await request(app)
    .post("/tasks")
    .send({
      title: "Estudiar CI/CD",
      description: "Ver pipeline de GitHub Actions",
    });

  expect(res.status).toBe(201);
  expect(res.body.success).toBe(true);
  expect(res.body.data.title).toBe("Estudiar CI/CD");
  expect(res.body.data.completed).toBe(false);
  expect(res.body.data.id).toBeDefined();
});

test("POST /tasks - falla si no se envía title", async () => {
  const res = await request(app)
    .post("/tasks")
    .send({ description: "Sin título" });

  expect(res.status).toBe(400);
  expect(res.body.success).toBe(false);
});

test("POST /tasks - falla si title está vacío", async () => {
  const res = await request(app).post("/tasks").send({ title: "   " });

  expect(res.status).toBe(400);
  expect(res.body.success).toBe(false);
});

// GET /tasks/:id
test("GET /tasks/:id - retorna la tarea correcta", async () => {
  await request(app).post("/tasks").send({ title: "Tarea de prueba" });

  const res = await request(app).get("/tasks/1");

  expect(res.status).toBe(200);
  expect(res.body.success).toBe(true);
  expect(res.body.data.title).toBe("Tarea de prueba");
});

test("GET /tasks/:id - retorna 404 si no existe", async () => {
  const res = await request(app).get("/tasks/999");

  expect(res.status).toBe(404);
  expect(res.body.success).toBe(false);
});

// PUT /tasks/:id
test("PUT /tasks/:id - actualiza una tarea correctamente", async () => {
  await request(app).post("/tasks").send({ title: "Tarea original" });

  const res = await request(app)
    .put("/tasks/1")
    .send({ title: "Tarea actualizada", completed: true });

  expect(res.status).toBe(200);
  expect(res.body.success).toBe(true);
  expect(res.body.data.title).toBe("Tarea actualizada");
  expect(res.body.data.completed).toBe(true);
});

test("PUT /tasks/:id - retorna 404 si no existe", async () => {
  const res = await request(app).put("/tasks/999").send({ title: "No existe" });

  expect(res.status).toBe(404);
  expect(res.body.success).toBe(false);
});

// DELETE /tasks/:id
test("DELETE /tasks/:id - elimina una tarea correctamente", async () => {
  await request(app).post("/tasks").send({ title: "Tarea a eliminar" });

  const res = await request(app).delete("/tasks/1");

  expect(res.status).toBe(200);
  expect(res.body.success).toBe(true);
});

test("DELETE /tasks/:id - retorna 404 si no existe", async () => {
  const res = await request(app).delete("/tasks/999");

  expect(res.status).toBe(404);
  expect(res.body.success).toBe(false);
});
