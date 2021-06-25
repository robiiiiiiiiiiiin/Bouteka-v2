import React, { useRef, useEffect } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
function OutsideClickHandler(ref: React.RefObject<HTMLDivElement>, activated: boolean, triggerThis: () => void) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: MouseEvent) {
      if (activated && ref.current && event.target instanceof Element && !ref.current.contains(event.target)) {
        triggerThis()
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, activated, triggerThis]);
}

type OutsideAlerterProps = {
  activated: boolean;
  triggerThis: () => void;
  children: React.ReactNode;
}

/**
 * Component that alerts if you click outside of it
 */
function OutsideAlerter({activated, triggerThis, children}: OutsideAlerterProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  OutsideClickHandler(wrapperRef, activated, triggerThis);

  return <div ref={wrapperRef}>{children}</div>;
}

export default OutsideAlerter;
