import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearError } from '../../store/slices/authSlice';
import { addToast } from '../../store/slices/uiSlice';
import AuthLayout from '../../components/layout/AuthLayout';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard');
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (error) {
      dispatch(addToast({ type: 'error', message: error }));
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const onSubmit = async (data) => {
    const result = await dispatch(login(data));
    if (login.fulfilled.match(result)) {
      dispatch(addToast({ type: 'success', message: 'Welcome back!' }));
      navigate('/dashboard');
    }
  };

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-dark-900 dark:text-dark-100">Welcome back</h2>
          <p className="text-sm text-dark-500 mt-1">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            error={errors.email?.message}
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email' },
            })}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            error={errors.password?.message}
            {...register('password', { required: 'Password is required' })}
          />

          <Button type="submit" className="w-full" loading={loading}>
            Sign In
          </Button>
        </form>

        <p className="text-center text-sm text-dark-500">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="font-medium text-primary-600 hover:text-primary-700">
            Sign up
          </Link>
        </p>

        <div className="pt-2 border-t border-dark-200 dark:border-dark-700">
          <p className="text-xs text-center text-dark-400">
            Demo: demo@taskflow.com / Demo1234
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}
