"use client";
import { useEffect, useState } from "react";

export function useScroll({
  elementRef,
  keepSticky = false,
  captureMode = true,
}: {
  elementRef: React.RefObject<HTMLElement>;
  keepSticky?: boolean;
  captureMode?: boolean;
}) {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const initialRefTop = elementRef.current?.offsetTop || 0;

    const handleScroll = () => {
      if (elementRef.current) {
        const currentScroll = window.pageYOffset;

        if (currentScroll > initialRefTop) {
          setIsSticky(true);
        } else if (!keepSticky) {
          setIsSticky(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, captureMode);

    return () => {
      window.removeEventListener("scroll", handleScroll, captureMode);
    };
  }, [elementRef.current]);

  const scrollTo = () => {
    if (elementRef.current) {
      window.scrollTo({
        top: elementRef.current.offsetTop,
        behavior: "smooth",
      });
    }
  };

  return { isSticky, scrollTo };
}
