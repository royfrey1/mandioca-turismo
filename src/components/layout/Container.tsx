import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  width?: 'content' | 'wide'
}

export function Container({
  width = 'content',
  className,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-5 md:px-10 xl:px-16',
        width === 'content'
          ? 'max-w-[var(--container-content)]'
          : 'max-w-[var(--container-wide)]',
        className,
      )}
      {...props}
    />
  )
}
