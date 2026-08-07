import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeToast } from '../../store/slices/uiSlice';
import { HiCheckCircle, HiExclamationCircle, HiInformationCircle, HiXMark } from 'react-icons/hi2';

const iconMap = {
  success: <HiCheckCircle className="h-5 w-5 text-success-500" />,
  error: <HiExclamationCircle className="h-5 w-5 text-danger-500" />,
  info: <HiInformationCircle className="h-5 w-5 text-primary-500" />,
};

const bgMap = {
  success: 'border-success-200 bg-success-50',
  error: 'border-danger-200 bg-danger-50',
  info: 'border-primary-200 bg-primary-50',
};

function Toast({ toast }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(removeToast(toast.id));
    }, toast.duration || 4000);
    return () => clearTimeout(timer);
  }, [dispatch, toast.id, toast.duration]);

  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg animate-slide-down ${bgMap[toast.type] || bgMap.info}`}
    >
      {iconMap[toast.type] || iconMap.info}
      <p className="text-sm font-medium text-dark-800 flex-1">{toast.message}</p>
      <button
        onClick={() => dispatch(removeToast(toast.id))}
        className="text-dark-400 hover:text-dark-600"
      >
        <HiXMark className="h-4 w-4" />
      </button>
    </div>
  );
}

export default function ToastContainer() {
  const { toasts } = useSelector((state) => state.ui);

  if (toasts.length === 0) return null;

  return createPortal(
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 max-w-sm w-full">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} />
      ))}
    </div>,
    document.body
  );
}
