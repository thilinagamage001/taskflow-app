import { Link } from 'react-router-dom';
import { HiCalendarDays, HiStar, HiEllipsisVertical } from 'react-icons/hi2';
import Badge from '../ui/Badge';
import { formatDate, isOverdue, statusLabels, priorityLabels, categoryLabels } from '../../utils/helpers';

export default function TaskCard({ task, onDelete, onDuplicate, onToggleFavorite, view = 'grid' }) {
  const overdue = task.status !== 'completed' && isOverdue(task.dueDate);

  if (view === 'list') {
    return (
      <div className="flex items-center gap-4 px-5 py-3 bg-white border border-dark-200 rounded-xl hover:shadow-md transition-all dark:bg-dark-800 dark:border-dark-700">
        <button
          onClick={() => onToggleFavorite(task)}
          className="flex-shrink-0"
        >
          <HiStar className={`h-5 w-5 ${task.isFavorite ? 'text-warning-500 fill-warning-500' : 'text-dark-300'}`} />
        </button>

        <Link to={`/tasks/${task._id}`} className="flex-1 min-w-0">
          <p className={`text-sm font-medium truncate ${task.status === 'completed' ? 'line-through text-dark-400' : 'text-dark-900 dark:text-dark-100'}`}>
            {task.title}
          </p>
        </Link>

        <div className="hidden sm:flex items-center gap-2">
          <Badge variant={task.status === 'completed' ? 'success' : task.status === 'in-progress' ? 'primary' : 'warning'}>
            {statusLabels[task.status]}
          </Badge>
          <Badge variant={task.priority === 'high' ? 'danger' : task.priority === 'medium' ? 'warning' : 'default'}>
            {priorityLabels[task.priority]}
          </Badge>
        </div>

        <span className={`hidden md:inline text-xs ${overdue ? 'text-danger-600 font-medium' : 'text-dark-400'}`}>
          {task.dueDate ? formatDate(task.dueDate) : 'No date'}
        </span>

        <div className="relative group">
          <button className="p-1 rounded-lg text-dark-400 hover:bg-dark-100 dark:hover:bg-dark-700">
            <HiEllipsisVertical className="h-4 w-4" />
          </button>
          <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-xl shadow-lg border border-dark-200 py-1 z-10 hidden group-hover:block dark:bg-dark-800 dark:border-dark-700">
            <Link to={`/tasks/${task._id}`} className="block px-3 py-2 text-sm text-dark-700 hover:bg-dark-50 dark:text-dark-300 dark:hover:bg-dark-700">View</Link>
            <Link to={`/tasks/${task._id}/edit`} className="block px-3 py-2 text-sm text-dark-700 hover:bg-dark-50 dark:text-dark-300 dark:hover:bg-dark-700">Edit</Link>
            <button onClick={() => onDuplicate(task)} className="block w-full text-left px-3 py-2 text-sm text-dark-700 hover:bg-dark-50 dark:text-dark-300 dark:hover:bg-dark-700">Duplicate</button>
            <button onClick={() => onDelete(task)} className="block w-full text-left px-3 py-2 text-sm text-danger-600 hover:bg-danger-50 dark:hover:bg-danger-500/10">Delete</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-dark-200 rounded-xl p-5 hover:shadow-md transition-all dark:bg-dark-800 dark:border-dark-700 group">
      <div className="flex items-start justify-between mb-3">
        <Link to={`/tasks/${task._id}`} className="flex-1 min-w-0">
          <h3 className={`text-sm font-semibold truncate ${task.status === 'completed' ? 'line-through text-dark-400' : 'text-dark-900 dark:text-dark-100'}`}>
            {task.title}
          </h3>
        </Link>
        <button onClick={() => onToggleFavorite(task)} className="flex-shrink-0 ml-2">
          <HiStar className={`h-5 w-5 ${task.isFavorite ? 'text-warning-500 fill-warning-500' : 'text-dark-300 hover:text-warning-400'}`} />
        </button>
      </div>

      {task.description && (
        <p className="text-xs text-dark-500 mb-3 line-clamp-2">{task.description}</p>
      )}

      <div className="flex flex-wrap gap-1.5 mb-3">
        <Badge variant={task.status === 'completed' ? 'success' : task.status === 'in-progress' ? 'primary' : 'warning'}>
          {statusLabels[task.status]}
        </Badge>
        <Badge variant={task.priority === 'high' ? 'danger' : task.priority === 'medium' ? 'warning' : 'default'}>
          {priorityLabels[task.priority]}
        </Badge>
        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-dark-100 text-dark-600 dark:bg-dark-700 dark:text-dark-400`}>
          {categoryLabels[task.category]}
        </span>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-dark-100 dark:border-dark-700">
        {task.dueDate ? (
          <span className={`flex items-center gap-1 text-xs ${overdue ? 'text-danger-600 font-medium' : 'text-dark-400'}`}>
            <HiCalendarDays className="h-3.5 w-3.5" />
            {formatDate(task.dueDate)}
          </span>
        ) : (
          <span className="text-xs text-dark-300">No due date</span>
        )}

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Link to={`/tasks/${task._id}/edit`} className="px-2 py-1 text-xs text-dark-500 hover:bg-dark-100 rounded dark:hover:bg-dark-700">
            Edit
          </Link>
          <button onClick={() => onDuplicate(task)} className="px-2 py-1 text-xs text-dark-500 hover:bg-dark-100 rounded dark:hover:bg-dark-700">
            Copy
          </button>
          <button onClick={() => onDelete(task)} className="px-2 py-1 text-xs text-danger-600 hover:bg-danger-50 rounded dark:hover:bg-danger-500/10">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
