import { useState, useEffect } from 'react';
import './TaskForm.css';

const TaskForm = ({ addTask, editTask, currentTask, setCurrentTask }) => {
  const [task, setTask] = useState({
    id: null,
    description: '',
    category: 'Personnel',
    completed: false,
    dueDate: ''
  });

  // Update form when currentTask changes (for editing)
  useEffect(() => {
    if (currentTask) {
      setTask(currentTask);
    }
  }, [currentTask]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!task.description.trim()) {
      alert('Veuillez entrer une description de tâche.');
      return;
    }

    if (task.id) {
      // Editing existing task
      editTask(task);
      setCurrentTask(null);
    } else {
      // Adding new task
      addTask({ ...task, id: Date.now() });
    }

    // Reset form
    setTask({
      id: null,
      description: '',
      category: 'Personnel',
      completed: false,
      dueDate: ''
    });
  };

  const cancelEdit = () => {
    setCurrentTask(null);
    setTask({
      id: null,
      description: '',
      category: 'Personnel',
      completed: false,
      dueDate: ''
    });
  };

  return (
    <div className="task-form">
      <h2>{task.id ? 'Modifier la tâche' : 'Ajouter une nouvelle tâche'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={task.description}
            onChange={handleInputChange}
            placeholder="Entrer la description de la tâche"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="category">Catégorie:</label>
          <select
            id="category"
            name="category"
            value={task.category}
            onChange={handleInputChange}
          >
            <option value="Travail">Travail</option>
            <option value="Personnel">Personnel</option>
            <option value="Urgent">Urgent</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="dueDate">Date limite (optionnelle):</label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={task.dueDate}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="form-actions">
          <button type="submit" className="btn-add">
            {task.id ? 'Mettre à jour' : 'Ajouter'}
          </button>
          {task.id && (
            <button type="button" onClick={cancelEdit} className="btn-cancel">
              Annuler
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
