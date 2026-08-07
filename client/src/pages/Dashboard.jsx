import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardStats } from '../store/slices/taskSlice';
import { Card, CardContent } from '../components/ui/Card';
import { StatCardSkeleton, TaskCardSkeleton } from '../components/ui/Skeleton';
import EmptyState from '../components/ui/EmptyState';
import Badge from '../components/ui/Badge';
import { formatDate, isOverdue, statusLabels, priorityLabels, categoryLabels, categoryColors } from '../utils/helpers';
import { HiClipboardDocumentList, HiCheckCircle, HiClock, HiPlay, HiExclamationTriangle, HiCalendarDays, HiPlus } from 'react-icons/hi2';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const CHART_COLORS = ['#3b82f6', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

export default function DashboardPage() {
  const dispatch = useDispatch();
  const { dashboardStats, loading } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  if (loading && !dashboardStats) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, i) => <StatCardSkeleton key={i} />)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-80"><TaskCardSkeleton /></div>
          <div className="h-80"><TaskCardSkeleton /></div>
        </div>
      </div>
    );
  }

  const stats = dashboardStats;

  const statCards = [
    { label: 'Total Tasks', value: stats?.totalTasks || 0, icon: HiClipboardDocumentList, color: 'text-primary-600', bg: 'bg-primary-50' },
    { label: 'Completed', value: stats?.completedTasks || 0, icon: HiCheckCircle, color: 'text-success-600', bg: 'bg-success-50' },
    { label: 'Pending', value: stats?.pendingTasks || 0, icon: HiClock, color: 'text-warning-600', bg: 'bg-warning-50' },
    { label: 'In Progress', value: stats?.inProgressTasks || 0, icon: HiPlay, color: 'text-primary-600', bg: 'bg-primary-50' },
    { label: 'Overdue', value: stats?.overdueTasks || 0, icon: HiExclamationTriangle, color: 'text-danger-600', bg: 'bg-danger-50' },
    { label: 'Due Today', value: stats?.dueTodayTasks || 0, icon: HiCalendarDays, color: 'text-cyan-600', bg: 'bg-cyan-50' },
  ];

  const categoryData = (stats?.categoryStats || []).map((item) => ({
    name: categoryLabels[item._id] || item._id,
    value: item.count,
  }));

  const priorityData = (stats?.priorityStats || []).map((item) => ({
    name: priorityLabels[item._id] || item._id,
    count: item.count,
  }));

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-dark-900 dark:text-dark-100">Dashboard</h1>
          <p className="text-sm text-dark-500 mt-1">Welcome back! Here&apos;s your task overview.</p>
        </div>
        <Link
          to="/tasks/create"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors shadow-sm"
        >
          <HiPlus className="h-4 w-4" /> New Task
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {statCards.map((stat) => (
          <Card key={stat.label} className="hover:shadow-md transition-shadow">
            <CardContent className="py-4">
              <div className={`inline-flex items-center justify-center h-9 w-9 rounded-lg ${stat.bg} mb-3`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <p className="text-2xl font-bold text-dark-900 dark:text-dark-100">{stat.value}</p>
              <p className="text-xs text-dark-500 mt-0.5">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="px-6 py-4 border-b border-dark-200 dark:border-dark-700">
            <h3 className="font-semibold text-dark-900 dark:text-dark-100">Tasks by Category</h3>
          </div>
          <CardContent className="py-6">
            {categoryData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={categoryData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={4} dataKey="value">
                    {categoryData.map((entry, index) => (
                      <Cell key={entry.name} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-center text-dark-400 py-8">No category data</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <div className="px-6 py-4 border-b border-dark-200 dark:border-dark-700">
            <h3 className="font-semibold text-dark-900 dark:text-dark-100">Tasks by Priority</h3>
          </div>
          <CardContent className="py-6">
            {priorityData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={priorityData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-center text-dark-400 py-8">No priority data</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <div className="px-6 py-4 border-b border-dark-200 dark:border-dark-700 flex items-center justify-between">
          <h3 className="font-semibold text-dark-900 dark:text-dark-100">Recent Tasks</h3>
          <Link to="/tasks" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
            View All
          </Link>
        </div>
        <CardContent>
          {stats?.recentTasks?.length > 0 ? (
            <div className="divide-y divide-dark-100 dark:divide-dark-700">
              {stats.recentTasks.map((task) => (
                <Link
                  key={task._id}
                  to={`/tasks/${task._id}`}
                  className="flex items-center justify-between py-3 hover:bg-dark-50 dark:hover:bg-dark-800 -mx-6 px-6 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-dark-900 dark:text-dark-100 truncate">{task.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant={task.status === 'completed' ? 'success' : task.status === 'in-progress' ? 'primary' : 'warning'}>
                        {statusLabels[task.status]}
                      </Badge>
                      {task.dueDate && (
                        <span className={`text-xs ${isOverdue(task.dueDate) ? 'text-danger-600' : 'text-dark-400'}`}>
                          {formatDate(task.dueDate)}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<HiClipboardDocumentList className="h-12 w-12" />}
              title="No tasks yet"
              description="Create your first task to get started"
              action={
                <Link to="/tasks/create" className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700">
                  <HiPlus className="h-4 w-4" /> Create Task
                </Link>
              }
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
