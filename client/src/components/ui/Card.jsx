import { cn } from '../../utils/helpers';

export function Card({ children, className, ...props }) {
  return (
    <div
      className={cn(
        'bg-white rounded-xl border border-dark-200 shadow-sm dark:bg-dark-800 dark:border-dark-700',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className }) {
  return (
    <div className={cn('px-6 py-4 border-b border-dark-200 dark:border-dark-700', className)}>
      {children}
    </div>
  );
}

export function CardContent({ children, className }) {
  return <div className={cn('px-6 py-4', className)}>{children}</div>;
}
