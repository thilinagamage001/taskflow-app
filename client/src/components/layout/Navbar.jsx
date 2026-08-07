import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { HiBars3, HiMoon, HiSun, HiArrowRightOnRectangle } from 'react-icons/hi2';
import { toggleTheme, setSidebarOpen } from '../../store/slices/uiSlice';
import { logout } from '../../store/slices/authSlice';

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { theme } = useSelector((state) => state.ui);

  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 h-16 bg-white/80 backdrop-blur-lg border-b border-dark-200 dark:bg-dark-900/80 dark:border-dark-700">
      <div className="flex items-center justify-between h-full px-4 lg:px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => dispatch(setSidebarOpen(true))}
            className="p-2 rounded-lg text-dark-500 hover:bg-dark-100 lg:hidden dark:hover:bg-dark-800"
          >
            <HiBars3 className="h-5 w-5" />
          </button>
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <span className="text-lg font-bold text-dark-900 dark:text-white hidden sm:block">TaskFlow</span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => dispatch(toggleTheme())}
            className="p-2 rounded-lg text-dark-500 hover:bg-dark-100 dark:hover:bg-dark-800 transition-colors"
          >
            {theme === 'light' ? <HiMoon className="h-5 w-5" /> : <HiSun className="h-5 w-5" />}
          </button>

          {user && (
            <div className="flex items-center gap-3 ml-2">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-dark-900 dark:text-dark-100">{user.name}</p>
                <p className="text-xs text-dark-500">{user.email}</p>
              </div>
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="h-8 w-8 rounded-full object-cover" />
              ) : (
                <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                  <span className="text-sm font-medium text-primary-600">
                    {user.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg text-dark-500 hover:bg-dark-100 hover:text-danger-600 dark:hover:bg-dark-800 transition-colors"
                title="Logout"
              >
                <HiArrowRightOnRectangle className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
