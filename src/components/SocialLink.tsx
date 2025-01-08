import cn from 'clsx';
import * as React from 'react';

export const SocialLink = ({
  href,
  label,
  Icon,
}: {
  href: string;
  label: string;
  Icon: React.ReactNode;
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cn(
        'group flex items-center gap-1 text-zinc-600 dark:text-zinc-300 hover:text-d dark:hover:text-l link-focus rounded-md'
      )}
    >
      <span className="hidden md:block">{label}</span>
      <span className={cn('block w-5 h-5 md:hidden')}>{Icon}</span>
    </a>
  );
};
