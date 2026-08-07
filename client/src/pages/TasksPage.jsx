import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, deleteTask, duplicateTask, updateTask } from '../store/slices/taskSlice';
import { addToast } from '../store/slices/uiSlice';
import { useLocalStorage, useDebounce } from '../hooks';
import TaskCard from '../components/tasks/TaskCard';
import TaskFilters from '../components/tasks/TaskFilters';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import Pagination from '../components/ui/Pagination';
import EmptyState from '../components/ui/EmptyState';
import { TaskCardSkeleton } from '../components/ui/Skeleton';
import { HiClipboardDocumentList, HiPlus, HiArrowDownTray } from 'react-icons/hi2';
import { exportToCSV } from '../utils/helpers';

export default function TasksPage() {
  const dispatch = useDispatch();
  const { tasks, pagination, loading } = useSelector((state) => state.tasks);

  const [savedFilters, setSavedFilters] = useLocalStorage('taskFilters', {
    search: '',
    status: '',
    priority: '',
    category: '',
    sortBy: 'createdAt',
    viewMode: 'grid',
  });
  const [filters, setFilters] = useState(savedFilters);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const debouncedSearch = useDebounce(filters.search, 500);

  useEffect(() => {
    setSavedFilters(filters);
  }, [filters]);

  useEffect(() => {
    dispatch(fetchTasks({
      ...filters,
      search: debouncedSearch,
      page: 1,
    }));
  }, [debouncedSearch, filters.status, filters.priority, filters.category, filters.sortBy, dispatch]);

  const handleFilterChange = useCallback((newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }));
  }, []);

  const handlePageChange = (page) => {
    dispatch(fetchTasks({ ...filters, search: debouncedSearch, page }));
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const result = await dispatch(deleteTask(deleteTarget._id));
    if (deleteTask.fulfilled.match(result)) {
      dispatch(addToast({ type: 'success', message: 'Task deleted successfully' }));
      setDeleteTarget(null);
      dispatch(fetchTasks({ ...filters, search: debouncedSearch, page: pagination.page }));
    }
  };

  const handleDuplicate = async (task) => {
    const result = await dispatch(duplicateTask(task._id));
    if (duplicateTask.fulfilled.match(result)) {
      dispatch(addToast({ type: 'success', message: 'Task duplicated' }));
      dispatch(fetchTasks({ ...filters, search: debouncedSearch, page: 1 }));
    }
  };

  const handleToggleFavorite = async (task) => {
    await dispatch(updateTask({ id: task._id, data: { isFavorite: !task.isFavorite } }));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-dark-900 dark:text-dark-100">My Tasks</h1>
          <p className="text-sm text-dark-500 mt-1">{pagination.total} tasks total</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => exportToCSV(tasks)}
            className="inline-flex items-center gap-2 px-3 py-2 text-sm text-dark-600 bg-white border border-dark-200 rounded-lg hover:bg-dark-50 dark:bg-dark-800 dark:border-dark-700 dark:text-dark-400"
          >
            <HiArrowDownTray className="h-4 w-4" /> Export
          </button>
          <Link
            to="/tasks/create"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors shadow-sm"
          >
            <HiPlus className="h-4 w-4" /> New Task
          </Link>
        </div>
      </div>

      <TaskFilters filters={filters} onChange={handleFilterChange} />

      {loading ? (
        <div className={filters.viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4' : 'space-y-3'}>
          {Array.from({ length: 6 }).map((_, i) => <TaskCardSkeleton key={i} />)}
        </div>
      ) : tasks.length > 0 ? (
        <>
          <div className={filters.viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4' : 'space-y-3'}>
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                view={filters.viewMode}
                onDelete={setDeleteTarget}
                onDuplicate={handleDuplicate}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
          <Pagination pagination={pagination} onPageChange={handlePageChange} />
        </>
      ) : (
        <EmptyState
          icon={<HiClipboardDocumentList className="h-12 w-12" />}
          title="No tasks found"
          description={filters.search || filters.status || filters.priority || filters.category
            ? 'Try adjusting your filters'
            : 'Create your first task to get started'}
          action={
            <Link to="/tasks/create" className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700">
              <HiPlus className="h-4 w-4" /> Create Task
            </Link>
          }
        />
      )}

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Task"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
      />
    </div>
  );
}
