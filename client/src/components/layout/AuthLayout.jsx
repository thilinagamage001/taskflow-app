import { Link } from 'react-router-dom';

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-dark-50 dark:from-dark-950 dark:via-dark-900 dark:to-dark-950 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="h-10 w-10 rounded-xl bg-primary-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <span className="text-2xl font-bold text-dark-900 dark:text-white">TaskFlow</span>
          </Link>
        </div>
        <div className="bg-white rounded-2xl shadow-xl border border-dark-200 dark:bg-dark-800 dark:border-dark-700 p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
