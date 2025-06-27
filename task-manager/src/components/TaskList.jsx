import { useState } from 'react';
import './TaskList.css';

const TaskList = ({ tasks, deleteTask, toggleComplete, setCurrentTask, filter, setFilter }) => {
  const [sortOrder, setSortOrder] = useState('default');

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.category === filter;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    // Sort by due date if available
    if (sortOrder === 'dueDate') {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate) - new Date(b.dueDate);
    }
    // Default sorting (most recent first)
    return b.id - a.id;
  });

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  return (
    <div className="task-list-container">
      <div className="task-controls">
        <div className="filter-group">
          <label htmlFor="filter">Filtrer par:</label>
          <select 
            id="filter" 
            value={filter} 
            onChange={handleFilterChange}
          >
            <option value="all">Toutes les tâches</option>
            <option value="Travail">Travail</option>
            <option value="Personnel">Personnel</option>
            <option value="Urgent">Urgent</option>
          </select>
        </div>
        
        <div className="sort-group">
          <label htmlFor="sort">Trier par:</label>
          <select 
            id="sort" 
            value={sortOrder} 
            onChange={handleSortChange}
          >
            <option value="default">Plus récent</option>
            <option value="dueDate">Date limite</option>
          </select>
        </div>
      </div>

      {sortedTasks.length === 0 ? (
        <div className="no-tasks">
          <p>Aucune tâche à afficher</p>
        </div>
      ) : (
        <div className="task-list">
          {sortedTasks.map((task) => (
            <div 
              key={task.id} 
              className={`task-card ${task.category.toLowerCase()} ${task.completed ? 'completed' : ''}`}
            >
              <div className="task-header">
                <span className="task-category">{task.category}</span>
                {task.dueDate && (
                  <span className="task-due-date">
                    Échéance: {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                )}
              </div>
              
              <div className="task-content">
                <div className="task-description">
                  <input 
                    type="checkbox" 
                    checked={task.completed} 
                    onChange={() => toggleComplete(task.id)} 
                  />
                  <p className={task.completed ? 'completed-text' : ''}>{task.description}</p>
                </div>
                
                <div className="task-actions">
                  <button 
                    onClick={() => setCurrentTask(task)} 
                    className="btn-edit"
                    disabled={task.completed}
                  >
                    Modifier
                  </button>
                  <button 
                    onClick={() => deleteTask(task.id)} 
                    className="btn-delete"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
