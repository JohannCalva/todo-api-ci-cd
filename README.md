# Todo API

API CRUD de tareas desarrollada con Node.js y Express.

## Endpoints

| Método | Ruta       | Descripción             |
| ------ | ---------- | ----------------------- |
| GET    | /tasks     | Listar todas las tareas |
| GET    | /tasks/:id | Obtener una tarea       |
| POST   | /tasks     | Crear una tarea         |
| PUT    | /tasks/:id | Actualizar una tarea    |
| DELETE | /tasks/:id | Eliminar una tarea      |

## Pipeline CI/CD

Este proyecto usa GitHub Actions con 6 etapas:

1. Install
2. Build
3. Test
4. Lint
5. Packing
6. Deploy
