import { Button } from "@components/base/Button";
import { LinkedInSVG, DownloadCircleSVG } from "@components/icons/index";
import { LINKEDIN_PROFILE_URL } from "@consts/urls";

export const HeroCTA = () => {
  return (
    <div className="flex flex-col justify-center items-center sm:flex-row gap-4">
      <Button
        asLink
        href="/kieran-roberts-CV.pdf"
        target="_blank"
        download
        iconAnimationSettings={{ timing: 300, scale: 1.05, x: 2 }}
        endIcon={
          <span className="block text-l dark:text-d w-5 h-5">
            <DownloadCircleSVG />
          </span>
        }
      >
        Download my CV
      </Button>
      <Button
        variant="secondary"
        asLink
        href={LINKEDIN_PROFILE_URL}
        target="_blank"
        iconAnimationSettings={{ timing: 300, scale: 1.05, x: 2 }}
        endIcon={
          <span className="block text-d dark:text-l w-5 h-5">
            <LinkedInSVG />
          </span>
        }
      >
        Find me on LinkedIn
      </Button>
    </div>
  );
};
