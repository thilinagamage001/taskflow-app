import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createTask, updateTask, fetchTask, clearCurrentTask } from '../store/slices/taskSlice';
import { addToast } from '../store/slices/uiSlice';
import { Card, CardContent } from '../components/ui/Card';
import Input from '../components/ui/Input';
import Textarea from '../components/ui/Textarea';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';

export default function TaskFormPage() {
  const { id } = useParams();
  const isEdit = !!id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentTask, loading } = useSelector((state) => state.tasks);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  useEffect(() => {
    if (isEdit) {
      dispatch(fetchTask(id));
    }
    return () => dispatch(clearCurrentTask());
  }, [dispatch, id, isEdit]);

  useEffect(() => {
    if (isEdit && currentTask) {
      reset({
        title: currentTask.title,
        description: currentTask.description || '',
        status: currentTask.status,
        priority: currentTask.priority,
        dueDate: currentTask.dueDate ? currentTask.dueDate.split('T')[0] : '',
        category: currentTask.category,
        tags: currentTask.tags?.join(', ') || '',
      });
    }
  }, [isEdit, currentTask, reset]);

  const onSubmit = async (data) => {
    const taskData = {
      ...data,
      dueDate: data.dueDate || null,
      tags: data.tags ? data.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
    };

    let result;
    if (isEdit) {
      result = await dispatch(updateTask({ id, data: taskData }));
      if (updateTask.fulfilled.match(result)) {
        dispatch(addToast({ type: 'success', message: 'Task updated successfully' }));
        navigate(`/tasks/${id}`);
      }
    } else {
      result = await dispatch(createTask(taskData));
      if (createTask.fulfilled.match(result)) {
        dispatch(addToast({ type: 'success', message: 'Task created successfully' }));
        navigate('/tasks');
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-dark-900 dark:text-dark-100">
          {isEdit ? 'Edit Task' : 'Create New Task'}
        </h1>
        <p className="text-sm text-dark-500 mt-1">
          {isEdit ? 'Update the task details below' : 'Fill in the details to create a new task'}
        </p>
      </div>

      <Card>
        <CardContent className="py-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              label="Title"
              placeholder="Enter task title"
              error={errors.title?.message}
              {...register('title', {
                required: 'Title is required',
                maxLength: { value: 200, message: 'Title cannot exceed 200 characters' },
              })}
            />

            <Textarea
              label="Description"
              placeholder="Enter task description (optional)"
              rows={4}
              error={errors.description?.message}
              {...register('description', {
                maxLength: { value: 2000, message: 'Description cannot exceed 2000 characters' },
              })}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select label="Status" error={errors.status?.message} {...register('status')}>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </Select>

              <Select label="Priority" error={errors.priority?.message} {...register('priority')}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </Select>

              <Select label="Category" error={errors.category?.message} {...register('category')}>
                <option value="work">Work</option>
                <option value="personal">Personal</option>
                <option value="study">Study</option>
                <option value="health">Health</option>
                <option value="shopping">Shopping</option>
                <option value="finance">Finance</option>
              </Select>

              <Input
                label="Due Date"
                type="date"
                error={errors.dueDate?.message}
                {...register('dueDate')}
              />
            </div>

            <Input
              label="Tags"
              placeholder="Comma-separated tags (e.g., urgent, frontend, review)"
              error={errors.tags?.message}
              {...register('tags')}
            />

            <div className="flex items-center gap-3 pt-2">
              <Button type="submit" loading={isSubmitting}>
                {isEdit ? 'Update Task' : 'Create Task'}
              </Button>
              <Button type="button" variant="secondary" onClick={() => navigate(-1)}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
