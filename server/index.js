const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const Board = require('./models/board');
const Task = require('./models/Task');
const { ObjectId } = require('mongoose').Types;

// Connect to Database
connectDB();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// --- Board Routes ---

// GET /api/boards - Get all boards
app.get('/api/boards', async (req, res) => {
  try {
    const boards = await Board.find().sort({ createdAt: -1 });
    // Rename _id to id for frontend compatibility
    res.json(boards.map(b => ({ ...b.toObject(), id: b._id })));
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/boards - Create a board
app.post('/api/boards', async (req, res) => {
  try {
    const newBoard = new Board({ name: req.body.name });
    await newBoard.save();
    res.status(201).json({ ...newBoard.toObject(), id: newBoard._id });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/boards/:id - Delete a board (and its tasks)
app.delete('/api/boards/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Task.deleteMany({ board_id: id }); // Also delete tasks on this board
    await Board.findByIdAndDelete(id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});


// --- Task Routes ---

// GET /api/tasks/:boardId - Get tasks for a board
app.get('/api/tasks/:boardId', async (req, res) => {
  try {
    const tasks = await Task.find({ board_id: req.params.boardId }).sort({ created_at: -1 });
    res.json(tasks.map(t => ({ ...t.toObject(), id: t._id })));
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/tasks - Create a task
app.post('/api/tasks', async (req, res) => {
  try {
    const newTask = new Task(req.body);
    await newTask.save();
    res.status(201).json({ ...newTask.toObject(), id: newTask._id });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// PATCH /api/tasks/:id - Update a task
app.patch('/api/tasks/:id', async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body.updates,
      { new: true }
    );
    res.json({ ...updatedTask.toObject(), id: updatedTask._id });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/tasks/:id - Delete a task
app.delete('/api/tasks/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));