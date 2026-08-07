import { cn } from '../../utils/helpers';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';

export default function Pagination({ pagination, onPageChange }) {
  const { page, pages, total } = pagination;

  if (pages <= 1) return null;

  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    for (let i = Math.max(2, page - delta); i <= Math.min(pages - 1, page + delta); i++) {
      range.push(i);
    }
    if (page - delta > 2) range.unshift('...');
    if (page + delta < pages - 1) range.push('...');
    range.unshift(1);
    if (pages > 1) range.push(pages);
    return range;
  };

  return (
    <div className="flex items-center justify-between px-1">
      <p className="text-sm text-dark-500">
        Showing {(page - 1) * pagination.limit + 1}-{Math.min(page * pagination.limit, total)} of {total}
      </p>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="p-1.5 rounded-lg text-dark-500 hover:bg-dark-100 disabled:opacity-50 disabled:cursor-not-allowed dark:hover:bg-dark-700"
        >
          <HiChevronLeft className="h-4 w-4" />
        </button>
        {getPageNumbers().map((num, i) =>
          num === '...' ? (
            <span key={`dots-${i}`} className="px-2 text-dark-400">...</span>
          ) : (
            <button
              key={num}
              onClick={() => onPageChange(num)}
              className={cn(
                'min-w-[32px] h-8 rounded-lg text-sm font-medium transition-colors',
                page === num
                  ? 'bg-primary-600 text-white'
                  : 'text-dark-600 hover:bg-dark-100 dark:hover:bg-dark-700'
              )}
            >
              {num}
            </button>
          )
        )}
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === pages}
          className="p-1.5 rounded-lg text-dark-500 hover:bg-dark-100 disabled:opacity-50 disabled:cursor-not-allowed dark:hover:bg-dark-700"
        >
          <HiChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
