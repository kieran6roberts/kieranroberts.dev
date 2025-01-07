import { ArrowRightSVG } from '@components/icons/ArrowRightSVG';
import { useBoop } from '@hooks/useBoop';
import { animated } from '@react-spring/web';
import cn from 'clsx';

interface Props {
  title: string;
  description: string;
  date: string;
  link: string;
  image: string;
}

export const BlogCard = ({ title, description, date, link, image }: Props) => {
  const { styleToApplyOnBoop, handleBoopTrigger } = useBoop({
    x: 8,
    timing: 300,
  });
  return (
    <a
      href={link}
      target="_blank"
      className={cn(
        'group blog-card-hover flex flex-col gap-4 rounded-xl pl-4 py-4 pr-6 border border-zinc-200 dark:border-zinc-800 link-focus'
      )}
      onMouseEnter={handleBoopTrigger}
    >
      <div className="pb-2">
        <img
          src={image}
          alt="Blog Post Cover Image"
          className="w-full h-auto rounded-lg"
          width={250}
          height={250}
        />
        <h2 className="font-heading mt-4 mb-2 text-2xl xl:text-3xl text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-800 dark:group-hover:text-zinc-200 font-medium transition-all duration-300">
          {title}
        </h2>
        <time className="text-sm xl:text-base text-zinc-600 dark:text-zinc-400">
          {new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
      </div>
      <p className="text-sm xl:text-base text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-all duration-300">
        {description}
      </p>
      <span className="flex mt-auto items-center gap-2 text-base text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-all duration-300">
        Read more
        <animated.span style={styleToApplyOnBoop} className="inline-block w-3 h-3">
          <ArrowRightSVG />
        </animated.span>
      </span>
    </a>
  );
};
