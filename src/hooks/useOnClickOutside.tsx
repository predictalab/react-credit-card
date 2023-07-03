import { RefObject, useEffect } from "react";

type AnyEvent = MouseEvent | TouchEvent;

function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: AnyEvent) => void
): void {
  useEffect(() => {
    const listener = (event: AnyEvent) => {
      const element = ref?.current;

      if (!element || element.contains(event.target as Node)) {
        return;
      }

      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

export default useOnClickOutside;
