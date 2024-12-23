// src/components/TaskTracker.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProgressBar from 'react-bootstrap/ProgressBar'; // Correct import
import useSocket from '../hooks/useSocket';

const TaskTracker = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [taskStatus, setTaskStatus] = useState('Pending');
  const [taskId, setTaskId] = useState(null);
  const socket = useSocket();

  useEffect(() => {
    fetchTasks();

    if (socket) {
      socket.on('taskUpdated', fetchTasks);
    }

    return () => {
      if (socket) {
        socket.off('taskUpdated', fetchTasks);
      }
    };
  }, [socket]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleAddTask = async () => {
    try {
      if (taskId) {
        await axios.put(`http://localhost:3000/api/tasks/${taskId}`, {
          name: taskName,
          status: taskStatus,
        });
      } else {
        const response = await axios.post('http://localhost:3000/api/tasks', {
          name: taskName,
          status: taskStatus,
        });
        setTasks([...tasks, response.data]);
      }
      clearForm();
      fetchTasks();
    } catch (error) {
      console.error('Error adding/updating task:', error);
    }
  };

  const handleEditTask = (task) => {
    setTaskId(task._id);
    setTaskName(task.name);
    setTaskStatus(task.status);
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const clearForm = () => {
    setTaskId(null);
    setTaskName('');
    setTaskStatus('Pending');
  };

  const calculateProgress = () => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.status === 'Completed').length;
    return totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Task Tracker</h2>
      <ProgressBar now={calculateProgress()} label={`${Math.round(calculateProgress())}%`} />
      
      <form onSubmit={(e) => { e.preventDefault(); handleAddTask(); }} className="mb-4">
        <div className="form-row">
          <div className="form-group col-md-8">
            <input
              type="text"
              className="form-control"
              placeholder="Task Name"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              required
            />
          </div>
          <div className="form-group col-md-4">
            <select
              className="form-control"
              value={taskStatus}
              onChange={(e) => setTaskStatus(e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary">Save Task</button>
        </div>
      </form>

      <ul className="list-group">
        {tasks.map(task => (
          <li key={task._id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{task.name}</strong> - Status: {task.status}
            </div>
            <div>
              <button className="btn btn-warning btn-sm" onClick={() => handleEditTask(task)}>Edit</button>
              <button className="btn btn-danger btn-sm" onClick={() => handleDeleteTask(task._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskTracker;
