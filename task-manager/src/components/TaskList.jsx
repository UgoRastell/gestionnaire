import { useState } from 'react';
import './TaskList.css';

const TaskList = ({ tasks, deleteTask, toggleComplete, setCurrentTask, filter, setFilter }) => {
  const [sortOrder, setSortOrder] = useState('default');
  const [viewMode, setViewMode] = useState('all'); // 'all', 'active', 'completed'

  // Filter tasks by category if a filter is active
  const filteredByCategory = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.category === filter;
  });

  // Further filter by completion status
  const filteredTasks = filteredByCategory.filter(task => {
    if (viewMode === 'all') return true;
    if (viewMode === 'active') return !task.completed;
    if (viewMode === 'completed') return task.completed;
    return true;
  });

  // Sort tasks according to selected sort order
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

  // Group tasks by category for display
  const groupedTasks = {};
  if (filter === 'all') {
    // When showing all categories, group by category
    sortedTasks.forEach(task => {
      if (!groupedTasks[task.category]) {
        groupedTasks[task.category] = [];
      }
      groupedTasks[task.category].push(task);
    });
  } else {
    // When a specific category is selected, just use that one
    groupedTasks[filter] = sortedTasks;
  }

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };
  
  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  // Render an individual task card
  const renderTaskCard = (task) => (
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
  );

  return (
    <div className="task-list-container">
      <div className="task-controls">
        <div className="control-row">
          <div className="filter-group">
            <label htmlFor="filter">Catégorie:</label>
            <select 
              id="filter" 
              value={filter} 
              onChange={handleFilterChange}
            >
              <option value="all">Toutes les catégories</option>
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
        
        <div className="view-mode-tabs">
          <button 
            className={viewMode === 'all' ? 'active' : ''}
            onClick={() => handleViewModeChange('all')}
          >
            Toutes
          </button>
          <button 
            className={viewMode === 'active' ? 'active' : ''}
            onClick={() => handleViewModeChange('active')}
          >
            À faire
          </button>
          <button 
            className={viewMode === 'completed' ? 'active' : ''}
            onClick={() => handleViewModeChange('completed')}
          >
            Terminées
          </button>
        </div>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="no-tasks">
          <p>Aucune tâche à afficher</p>
        </div>
      ) : (
        <div className="tasks-by-category">
          {Object.keys(groupedTasks).map(category => (
            <div key={category} className="category-group">
              <h3 className="category-title">{category}</h3>
              <div className="task-list">
                {groupedTasks[category].map(renderTaskCard)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
