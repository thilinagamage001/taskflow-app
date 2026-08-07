import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTask, updateTask, deleteTask, clearCurrentTask } from '../store/slices/taskSlice';
import { addToast } from '../store/slices/uiSlice';
import { Card, CardContent } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import { formatDate, isOverdue, statusLabels, priorityLabels, categoryLabels } from '../utils/helpers';
import { HiPencil, HiTrash, HiArrowLeft, HiCheckCircle, HiClock, HiCalendarDays } from 'react-icons/hi2';

export default function TaskDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentTask: task, loading } = useSelector((state) => state.tasks);
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    dispatch(fetchTask(id));
    return () => dispatch(clearCurrentTask());
  }, [dispatch, id]);

  const handleStatusToggle = async () => {
    const newStatus = task.status === 'completed' ? 'pending' : 'completed';
    await dispatch(updateTask({ id: task._id, data: { status: newStatus } }));
    dispatch(addToast({ type: 'success', message: `Task marked as ${statusLabels[newStatus]}` }));
  };

  const handleDelete = async () => {
    const result = await dispatch(deleteTask(task._id));
    if (deleteTask.fulfilled.match(result)) {
      dispatch(addToast({ type: 'success', message: 'Task deleted' }));
      navigate('/tasks');
    }
  };

  if (loading || !task) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="h-8 w-32 skeleton rounded" />
        <div className="h-64 skeleton rounded-xl" />
      </div>
    );
  }

  const overdue = task.status !== 'completed' && isOverdue(task.dueDate);

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      <button onClick={() => navigate(-1)} className="inline-flex items-center gap-1.5 text-sm text-dark-500 hover:text-dark-700">
        <HiArrowLeft className="h-4 w-4" /> Back
      </button>

      <Card>
        <CardContent className="py-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className={`text-xl font-bold ${task.status === 'completed' ? 'line-through text-dark-400' : 'text-dark-900 dark:text-dark-100'}`}>
                {task.title}
              </h1>
              <div className="flex flex-wrap items-center gap-2 mt-3">
                <Badge variant={task.status === 'completed' ? 'success' : task.status === 'in-progress' ? 'primary' : 'warning'}>
                  {statusLabels[task.status]}
                </Badge>
                <Badge variant={task.priority === 'high' ? 'danger' : task.priority === 'medium' ? 'warning' : 'default'}>
                  {priorityLabels[task.priority]}
                </Badge>
                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-dark-100 text-dark-600 dark:bg-dark-700 dark:text-dark-400">
                  {categoryLabels[task.category]}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {task.status !== 'completed' && (
                <Button variant="success" size="sm" onClick={handleStatusToggle}>
                  <HiCheckCircle className="h-4 w-4" /> Complete
                </Button>
              )}
              {task.status === 'completed' && (
                <Button variant="secondary" size="sm" onClick={handleStatusToggle}>
                  <HiClock className="h-4 w-4" /> Restore
                </Button>
              )}
              <Link to={`/tasks/${task._id}/edit`}>
                <Button variant="secondary" size="sm"><HiPencil className="h-4 w-4" /> Edit</Button>
              </Link>
              <Button variant="danger" size="sm" onClick={() => setShowDelete(true)}>
                <HiTrash className="h-4 w-4" /> Delete
              </Button>
            </div>
          </div>

          {task.description && (
            <div className="mt-6">
              <h4 className="text-sm font-medium text-dark-500 mb-2">Description</h4>
              <p className="text-sm text-dark-700 dark:text-dark-300 whitespace-pre-wrap">{task.description}</p>
            </div>
          )}

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-dark-500 mb-1">Due Date</h4>
              {task.dueDate ? (
                <p className={`flex items-center gap-1.5 text-sm ${overdue ? 'text-danger-600 font-medium' : 'text-dark-700 dark:text-dark-300'}`}>
                  <HiCalendarDays className="h-4 w-4" />
                  {formatDate(task.dueDate)}
                  {overdue && ' (Overdue)'}
                </p>
              ) : (
                <p className="text-sm text-dark-400">No due date set</p>
              )}
            </div>
            <div>
              <h4 className="text-sm font-medium text-dark-500 mb-1">Created</h4>
              <p className="text-sm text-dark-700 dark:text-dark-300">{formatDate(task.createdAt)}</p>
            </div>
          </div>

          {task.tags?.length > 0 && (
            <div className="mt-6">
              <h4 className="text-sm font-medium text-dark-500 mb-2">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {task.tags.map((tag, i) => (
                  <span key={i} className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs bg-primary-50 text-primary-600 border border-primary-200">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <ConfirmDialog
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={handleDelete}
        title="Delete Task"
        message={`Are you sure you want to delete "${task.title}"? This action cannot be undone.`}
      />
    </div>
  );
}
