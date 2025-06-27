import { useState, useEffect } from 'react'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import './App.css'

function App() {
  // State for tasks
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  
  // State for current task being edited
  const [currentTask, setCurrentTask] = useState(null);
  
  // State for filter
  const [filter, setFilter] = useState('all');

  // Save tasks to localStorage when tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Add a new task
  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  // Edit an existing task
  const editTask = (updatedTask) => {
    setTasks(tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ));
  };

  // Delete a task
  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  // Toggle task completion status
  const toggleComplete = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="app-container">
      <header>
        <h1>Gestionnaire de Tâches</h1>
        <p>Organisez vos tâches par catégorie</p>
      </header>
      
      <main>
        <TaskForm 
          addTask={addTask} 
          editTask={editTask} 
          currentTask={currentTask} 
          setCurrentTask={setCurrentTask} 
        />
        
        <TaskList 
          tasks={tasks} 
          deleteTask={deleteTask} 
          toggleComplete={toggleComplete} 
          setCurrentTask={setCurrentTask}
          filter={filter}
          setFilter={setFilter}
        />
      </main>
      
      <footer>
        <p>Task Manager - Réalisé avec React, Vite et Lightning CSS</p>
      </footer>
    </div>
  )
}

export default App
