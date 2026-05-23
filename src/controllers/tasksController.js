let tasks = [];
let nextId = 1;

const getAllTasks = (req, res) => {
  res.status(200).json({
    success: true,
    count: tasks.length,
    data: tasks,
  });
};

const getTaskById = (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({
      success: false,
      message: `Tarea con id ${id} no encontrada`,
    });
  }

  res.status(200).json({ success: true, data: task });
};

const createTask = (req, res) => {
  const { title, description } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "El campo 'title' es obligatorio",
    });
  }

  const newTask = {
    id: nextId++,
    title: title.trim(),
    description: description ? description.trim() : "",
    completed: false,
    createdAt: new Date().toISOString(),
  };

  tasks.push(newTask);
  res.status(201).json({ success: true, data: newTask });
};

const updateTask = (req, res) => {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Tarea con id ${id} no encontrada`,
    });
  }

  const { title, description, completed } = req.body;

  if (title !== undefined && title.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "El campo 'title' no puede estar vacío",
    });
  }

  tasks[index] = {
    ...tasks[index],
    title: title !== undefined ? title.trim() : tasks[index].title,
    description:
      description !== undefined ? description.trim() : tasks[index].description,
    completed:
      completed !== undefined ? Boolean(completed) : tasks[index].completed,
  };

  res.status(200).json({ success: true, data: tasks[index] });
};

const deleteTask = (req, res) => {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Tarea con id ${id} no encontrada`,
    });
  }

  tasks.splice(index, 1);
  res.status(200).json({
    success: true,
    message: `Tarea con id ${id} eliminada correctamente`,
  });
};

const resetTasks = () => {
  tasks = [];
  nextId = 1;
};

export {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  resetTasks,
};
