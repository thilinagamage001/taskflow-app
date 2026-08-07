import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatDate(date) {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatDateTime(date) {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function isOverdue(date) {
  if (!date) return false;
  return new Date(date) < new Date(new Date().setHours(0, 0, 0, 0));
}

export function isDueToday(date) {
  if (!date) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(date);
  due.setHours(0, 0, 0, 0);
  return today.getTime() === due.getTime();
}

export const statusColors = {
  'pending': 'bg-warning-50 text-warning-600 border border-warning-200',
  'in-progress': 'bg-primary-50 text-primary-600 border border-primary-200',
  'completed': 'bg-success-50 text-success-600 border border-success-200',
};

export const priorityColors = {
  'low': 'bg-dark-100 text-dark-600 border border-dark-200',
  'medium': 'bg-warning-50 text-warning-600 border border-warning-200',
  'high': 'bg-danger-50 text-danger-600 border border-danger-200',
};

export const categoryColors = {
  'work': 'bg-primary-50 text-primary-600 border border-primary-200',
  'personal': 'bg-purple-50 text-purple-600 border border-purple-200',
  'study': 'bg-amber-50 text-amber-600 border border-amber-200',
  'health': 'bg-success-50 text-success-600 border border-success-200',
  'shopping': 'bg-pink-50 text-pink-600 border border-pink-200',
  'finance': 'bg-cyan-50 text-cyan-600 border border-cyan-200',
};

export const statusLabels = {
  'pending': 'Pending',
  'in-progress': 'In Progress',
  'completed': 'Completed',
};

export const priorityLabels = {
  'low': 'Low',
  'medium': 'Medium',
  'high': 'High',
};

export const categoryLabels = {
  'work': 'Work',
  'personal': 'Personal',
  'study': 'Study',
  'health': 'Health',
  'shopping': 'Shopping',
  'finance': 'Finance',
};

export function exportToCSV(tasks, filename = 'tasks.csv') {
  const headers = ['Title', 'Description', 'Status', 'Priority', 'Due Date', 'Category', 'Tags', 'Created At'];
  const rows = tasks.map((task) => [
    task.title,
    task.description || '',
    task.status,
    task.priority,
    task.dueDate ? formatDate(task.dueDate) : '',
    task.category,
    (task.tags || []).join('; '),
    formatDate(task.createdAt),
  ]);

  const csvContent = [headers, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    .join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}
