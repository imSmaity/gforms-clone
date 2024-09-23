import { useEffect, useRef, useState } from "react";

const useOutsideClick = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && e?.target) {
        if (ref.current.contains(e?.target as any)) setIsActive(true);
        else setIsActive(false);
      }
    };

    window?.document?.addEventListener("click", handleClick);

    return () => {
      window?.document?.removeEventListener("click", handleClick);
    };
  }, [ref]);

  return { ref, isActive };
};

export { useOutsideClick };
