import { HiExclamationTriangle, HiXMark } from 'react-icons/hi2';
import Modal from './Modal';
import Button from './Button';

export default function ConfirmDialog({ isOpen, onClose, onConfirm, title, message, loading }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="flex flex-col items-center text-center py-2">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-danger-50 dark:bg-danger-500/10 mb-4">
          <HiExclamationTriangle className="h-6 w-6 text-danger-600" />
        </div>
        <h3 className="text-lg font-semibold text-dark-900 dark:text-dark-100 mb-2">{title}</h3>
        <p className="text-sm text-dark-500 mb-6">{message}</p>
        <div className="flex gap-3 w-full">
          <Button variant="secondary" className="flex-1" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button variant="danger" className="flex-1" onClick={onConfirm} loading={loading}>
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
}
