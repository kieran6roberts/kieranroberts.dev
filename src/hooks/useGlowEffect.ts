import * as React from "react";

export const useGlowEffect = ({
  glowCaptureRef,
  glowOverlayRef,
}: {
  glowCaptureRef: React.RefObject<HTMLDivElement>;
  glowOverlayRef: React.RefObject<HTMLDivElement>;
}) => {
  const updateMousePosition = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!glowCaptureRef.current) return;
    const { pageX, pageY } = e;
    const x = pageX - glowCaptureRef.current.offsetLeft;
    const y = pageY - glowCaptureRef.current.offsetTop;
    glowCaptureRef.current.style.setProperty("--glow-x", `${x}px`);
    glowCaptureRef.current.style.setProperty("--glow-y", `${y}px`);
    glowCaptureRef.current.style.setProperty("--glow-opacity", "0.5");
  };

  const onMouseLeave = () => {
    if (!glowCaptureRef.current) return;
    glowCaptureRef.current.style.setProperty("--glow-opacity", "0");
  };

  React.useEffect(() => {
    if (glowCaptureRef.current) {
      const clonedBlogCard = glowCaptureRef.current.cloneNode(true);
      glowOverlayRef?.current?.appendChild(clonedBlogCard);
    }
  }, []);

  return { updateMousePosition, onMouseLeave };
};
