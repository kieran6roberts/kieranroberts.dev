import * as React from "react";
import { Button } from "@components/base/Button";
import { LinkedInSVG, DownloadCircle } from "@components/icons/index";
import { LINKEDIN_PROFILE_URL } from "@consts/urls";
import { EMAIL_ADDRESS } from "@consts/index";

export const HeroCTA = () => {
  return (
    <div className="flex flex-col justify-center items-center lg:justify-start sm:flex-row gap-4">
      <Button
        asLink
        href={LINKEDIN_PROFILE_URL}
        target="_blank"
        iconAnimationSettings={{ rotation: 10, timing: 300, scale: 1.05 }}
        endIcon={
          <span className="block text-l dark:text-d w-5 h-5">
            <LinkedInSVG />
          </span>
        }
      >
        Connect with me
      </Button>
      <Button
        variant="secondary"
        asLink
        href={`mailto:${EMAIL_ADDRESS}`}
        target="_blank"
        iconAnimationSettings={{ rotation: 10, timing: 300, scale: 1.05 }}
        endIcon={
          <span className="block text-d dark:text-l w-5 h-5">
            <DownloadCircle />
          </span>
        }
      >
        Download CV
      </Button>
    </div>
  );
};
