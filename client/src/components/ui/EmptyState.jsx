export default function EmptyState({ icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {icon && (
        <div className="mb-4 text-dark-300 dark:text-dark-600">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-dark-700 dark:text-dark-300 mb-1">{title}</h3>
      <p className="text-sm text-dark-500 dark:text-dark-400 max-w-sm mb-6">{description}</p>
      {action}
    </div>
  );
}
