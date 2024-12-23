// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/eventManagement', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected successfully');
})
.catch(err => {
  console.error('MongoDB connection error:', err);
});

// Define Schemas
const eventSchema = new mongoose.Schema({
  name: String,
  location: String,
  date: String,
});

const attendeeSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const taskSchema = new mongoose.Schema({
  name: String,
  status: {
    type: String,
    enum: ['Pending', 'Completed'],
    default: 'Pending',
  },
});

// Define Models
const Event = mongoose.model('Event', eventSchema);
const Attendee = mongoose.model('Attendee', attendeeSchema);
const Task = mongoose.model('Task', taskSchema);

// API Routes for Events
app.get('/api/events', async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

app.post('/api/events', async (req, res) => {
  const event = new Event(req.body);
  await event.save();
  res.status(201).json(event);
});

app.put('/api/events/:id', async (req, res) => {
  const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(event);
});

app.delete('/api/events/:id', async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

// API Routes for Attendees
app.get('/api/attendees', async (req, res) => {
  const attendees = await Attendee.find();
  res.json(attendees);
});

app.post('/api/attendees', async (req, res) => {
  const attendee = new Attendee(req.body);
  await attendee.save();
  res.status(201).json(attendee);
});

app.put('/api/attendees/:id', async (req, res) => {
  const attendee = await Attendee.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(attendee);
});

app.delete('/api/attendees/:id', async (req, res) => {
  await Attendee.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

// API Routes for Tasks
app.get('/api/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post('/api/tasks', async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.status(201).json(task);
});

app.put('/api/tasks/:id', async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(task);
});

app.delete('/api/tasks/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});