import { HiMagnifyingGlass, HiViewColumns, HiSquares2X2, HiArrowDownTray } from 'react-icons/hi2';
import Select from '../ui/Select';

export default function TaskFilters({ filters, onChange, taskCount }) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
      <div className="relative flex-1 w-full sm:max-w-md">
        <HiMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-dark-400" />
        <input
          type="text"
          placeholder="Search tasks..."
          value={filters.search}
          onChange={(e) => onChange({ search: e.target.value })}
          className="w-full pl-9 pr-3 py-2.5 text-sm rounded-lg border border-dark-300 bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none dark:bg-dark-800 dark:border-dark-600 dark:text-dark-100"
        />
      </div>

      <div className="flex items-center gap-2 overflow-x-auto -mb-1 pb-1 shrink-0">
        <Select value={filters.status} onChange={(e) => onChange({ status: e.target.value })} className="w-auto text-sm">
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </Select>

        <Select value={filters.priority} onChange={(e) => onChange({ priority: e.target.value })} className="w-auto text-sm">
          <option value="">All Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </Select>

        <Select value={filters.category} onChange={(e) => onChange({ category: e.target.value })} className="w-auto text-sm">
          <option value="">All Categories</option>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="study">Study</option>
          <option value="health">Health</option>
          <option value="shopping">Shopping</option>
          <option value="finance">Finance</option>
        </Select>

        <Select value={filters.sortBy} onChange={(e) => onChange({ sortBy: e.target.value })} className="w-auto text-sm">
          <option value="createdAt">Created Date</option>
          <option value="dueDate">Due Date</option>
          <option value="priority">Priority</option>
          <option value="title">Title</option>
        </Select>

        <button
          onClick={() => onChange({ viewMode: filters.viewMode === 'grid' ? 'list' : 'grid' })}
          className="p-2 rounded-lg text-dark-500 hover:bg-dark-100 dark:hover:bg-dark-700 shrink-0"
          title={filters.viewMode === 'grid' ? 'List view' : 'Grid view'}
        >
          {filters.viewMode === 'grid' ? <HiViewColumns className="h-4 w-4" /> : <HiSquares2X2 className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}
