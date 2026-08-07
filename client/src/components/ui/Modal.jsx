import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { HiXMark } from 'react-icons/hi2';
import { cn } from '../../utils/helpers';

export default function Modal({ isOpen, onClose, title, children, size = 'md' }) {
  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-dark-900/50 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <div
        className={cn(
          'relative w-full mx-4 bg-white rounded-2xl shadow-2xl animate-scale-in dark:bg-dark-800',
          sizes[size]
        )}
      >
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-dark-200 dark:border-dark-700">
            <h3 className="text-lg font-semibold text-dark-900 dark:text-dark-100">{title}</h3>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-dark-400 hover:text-dark-600 hover:bg-dark-100 dark:hover:bg-dark-700 transition-colors"
            >
              <HiXMark className="h-5 w-5" />
            </button>
          </div>
        )}
        <div className="px-6 py-4">{children}</div>
      </div>
    </div>,
    document.body
  );
}
