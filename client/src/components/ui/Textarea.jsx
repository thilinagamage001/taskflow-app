import { forwardRef } from 'react';
import { cn } from '../../utils/helpers';

const Textarea = forwardRef(({ label, error, className, ...props }, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1.5">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        className={cn(
          'w-full rounded-lg border border-dark-300 bg-white px-3.5 py-2.5 text-sm text-dark-900 placeholder:text-dark-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-colors duration-200 resize-none dark:bg-dark-800 dark:border-dark-600 dark:text-dark-100 dark:placeholder:text-dark-500',
          error && 'border-danger-500 focus:border-danger-500 focus:ring-danger-500/20',
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1.5 text-sm text-danger-600">{error}</p>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';
export default Textarea;
