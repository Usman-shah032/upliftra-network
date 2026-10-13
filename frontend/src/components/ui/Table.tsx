import type { ReactNode } from 'react'

type TableProps = {
  children: ReactNode
  className?: string
}

type TableHeaderProps = {
  children: ReactNode
  className?: string
}

type TableBodyProps = {
  children: ReactNode
  className?: string
}

type TableRowProps = {
  children: ReactNode
  className?: string
}

type TableCellProps = {
  children: ReactNode
  className?: string
  colSpan?: number
}

function Table({
  children,
  className = '',
}: TableProps) {
  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-[#dce3ec] bg-white">
      <table
        className={[
          'w-full min-w-[640px] border-collapse text-left',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {children}
      </table>
    </div>
  )
}

function TableHeader({
  children,
  className = '',
}: TableHeaderProps) {
  return (
    <thead
      className={[
        'border-b border-[#dce3ec] bg-[#f8fafc]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </thead>
  )
}

function TableBody({
  children,
  className = '',
}: TableBodyProps) {
  return (
    <tbody
      className={[
        'divide-y divide-[#dce3ec]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </tbody>
  )
}

function TableRow({
  children,
  className = '',
}: TableRowProps) {
  return (
    <tr
      className={[
        'transition-colors hover:bg-[#f8fafc]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </tr>
  )
}

function TableCell({
  children,
  className = '',
  colSpan,
}: TableCellProps) {
  return (
    <td
      colSpan={colSpan}
      className={[
        'px-5 py-4 text-sm text-[#172033]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </td>
  )
}

Table.Header = TableHeader
Table.Body = TableBody
Table.Row = TableRow
Table.Cell = TableCell

export default Table