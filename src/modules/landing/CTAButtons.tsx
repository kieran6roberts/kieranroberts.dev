import { Button } from "@components/base/Button";
import * as React from "react";
import { FavoriteBookSVG, SendMailSVG } from "@components/icons/index";
import { useHover } from "@uidotdev/usehooks";

export const CTAButtons = () => {
  const [ref1, isHoveringBlogBtn] = useHover();
  const [ref2, isHoveringContactBtn] = useHover();

  return (
    <div className="flex flex-col justify-center lg:justify-start md:flex-row items-center gap-2">
      <Button
        ref={ref1}
        asLink
        href="/blog"
        variant="solid-white"
        iconAnimationSettings={{ scale: 1.1 }}
        endIcon={
          <span className="block text-slate-500 w-6 h-6">
            <FavoriteBookSVG hoverFill={isHoveringBlogBtn} />
          </span>
        }
      >
        Read my blog
      </Button>
      <Button
        ref={ref2}
        asLink
        href="/contact"
        variant="transparent-dark"
        iconAnimationSettings={{ scale: 1.05, x: 2 }}
        endIcon={
          <span className="block text-slate-100 stroke-current w-6 h-6">
            <SendMailSVG hoverFill={isHoveringContactBtn} />
          </span>
        }
      >
        Get in touch
      </Button>
    </div>
  );
};
