import React, { useRef, useEffect } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
function OutsideClickHandler(ref, activated, triggerThis) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (activated && ref.current && !ref.current.contains(event.target)) {
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

/**
 * Component that alerts if you click outside of it
 */
function OutsideAlerter(props) {
  const wrapperRef = useRef(null);
  OutsideClickHandler(wrapperRef, props.activated, props.triggerThis);

  return <div ref={wrapperRef}>{props.children}</div>;
}

export default OutsideAlerter;
