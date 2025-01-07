import { SocialLink } from '@components/SocialLink';
import { LINKEDIN_PROFILE_URL, GITHUB_PROFILE_URL, X_PROFILE_URL, BLOG_URL } from '@consts/urls';
import { LinkedInSVG, GithubSVG, XSVG, FavoriteBookSVG } from '@components/icons';

export const Socials = () => {
  return (
    <div className="flex items-center gap-x-2 md:gap-x-6 text-sm">
      <SocialLink href={LINKEDIN_PROFILE_URL} label="LinkedIn" Icon={<LinkedInSVG />} />
      <span className="hidden md:block text-zinc-400 dark:text-zinc-500">|</span>
      <SocialLink
        href={GITHUB_PROFILE_URL}
        label="GitHub"
        Icon={<GithubSVG />}
        githubStars={null}
      />
      <span className="hidden md:block text-zinc-400 dark:text-zinc-500">|</span>
      <SocialLink href={X_PROFILE_URL} label="X" Icon={<XSVG />} />
      <span className="hidden md:block text-zinc-400 dark:text-zinc-500">|</span>
      <SocialLink href={BLOG_URL} label="Blog" Icon={<FavoriteBookSVG />} />
    </div>
  );
};
