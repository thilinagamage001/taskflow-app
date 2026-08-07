import { cn } from '../../utils/helpers';

export default function Badge({ children, variant = 'default', className }) {
  const variants = {
    default: 'bg-dark-100 text-dark-600',
    primary: 'bg-primary-50 text-primary-600 border border-primary-200',
    success: 'bg-success-50 text-success-600 border border-success-200',
    warning: 'bg-warning-50 text-warning-600 border border-warning-200',
    danger: 'bg-danger-50 text-danger-600 border border-danger-200',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
