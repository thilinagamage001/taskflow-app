import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { HiHome, HiClipboardDocumentList, HiPlus, HiUser, HiXMark } from 'react-icons/hi2';
import { setSidebarOpen } from '../../store/slices/uiSlice';
import { cn } from '../../utils/helpers';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: HiHome },
  { to: '/tasks', label: 'My Tasks', icon: HiClipboardDocumentList },
  { to: '/tasks/create', label: 'New Task', icon: HiPlus },
  { to: '/profile', label: 'Profile', icon: HiUser },
];

export default function Sidebar() {
  const dispatch = useDispatch();
  const { sidebarOpen } = useSelector((state) => state.ui);

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-dark-900/50 z-40 lg:hidden"
          onClick={() => dispatch(setSidebarOpen(false))}
        />
      )}

      <aside
        className={cn(
          'fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] w-64 bg-white border-r border-dark-200 transition-transform duration-300 overflow-y-auto dark:bg-dark-900 dark:border-dark-700',
          'lg:translate-x-0 lg:static lg:z-auto',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex items-center justify-between h-14 px-4 border-b border-dark-200 dark:border-dark-700 lg:hidden">
          <span className="font-semibold text-dark-900 dark:text-white">Menu</span>
          <button
            onClick={() => dispatch(setSidebarOpen(false))}
            className="p-1 rounded-lg text-dark-400 hover:bg-dark-100"
          >
            <HiXMark className="h-5 w-5" />
          </button>
        </div>

        <nav className="p-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => dispatch(setSidebarOpen(false))}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary-50 text-primary-700 dark:bg-primary-500/10 dark:text-primary-400'
                    : 'text-dark-600 hover:bg-dark-50 dark:text-dark-400 dark:hover:bg-dark-800'
                )
              }
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
