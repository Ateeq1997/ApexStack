import { ReactNode } from 'react';

export interface DataTableColumn<T> {
  key: string;
  header: ReactNode;
  className?: string;
  render: (row: T) => ReactNode;
}

interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  emptyTitle?: string;
  emptyDescription?: string;
}

export function DataTable<T>({
  columns,
  rows,
  rowKey,
  emptyTitle = 'No records',
  emptyDescription = 'There is no data to display.'
}: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-sm">
        <thead className="text-xs uppercase tracking-wide text-[hsl(var(--text))]/75">
          <tr>
            {columns.map((column) => (
              <th key={column.key} className={column.className ?? 'px-3 py-2'}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={rowKey(row)} className="border-t">
              {columns.map((column) => (
                <td key={column.key} className={column.className ?? 'px-3 py-3'}>
                  {column.render(row)}
                </td>
              ))}
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="px-3 py-10 text-center">
                <h4 className="text-sm font-semibold">{emptyTitle}</h4>
                <p className="mt-1 text-xs text-muted">{emptyDescription}</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
