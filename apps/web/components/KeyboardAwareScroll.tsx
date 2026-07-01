"use client";

import { useEffect } from "react";

/**
 * On mobile the on-screen keyboard can cover the field being typed in. Browsers
 * are meant to scroll it into view but often don't (notably iOS Safari). When a
 * form field gains focus we wait for the keyboard to open, then — only if the
 * field now sits below the shrunk visual viewport — scroll it into the middle of
 * the visible area. It self-gates: if the viewport didn't shrink (desktop, or a
 * native date/select picker), nothing happens.
 */
export function KeyboardAwareScroll() {
  useEffect(() => {
    function isField(el: EventTarget | null): el is HTMLElement {
      return (
        el instanceof HTMLElement &&
        (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "SELECT")
      );
    }

    function onFocusIn(e: FocusEvent) {
      const el = e.target;
      if (!isField(el)) return;

      // Give the keyboard time to animate open and the viewport time to resize.
      window.setTimeout(() => {
        const vv = window.visualViewport;
        const visibleHeight = vv ? vv.height : window.innerHeight;
        const rect = el.getBoundingClientRect();
        // Only intervene when the field is hidden behind the keyboard (or tucked
        // under the sticky header at the very top).
        if (rect.bottom > visibleHeight - 24 || rect.top < 56) {
          el.scrollIntoView({ block: "center", behavior: "smooth" });
        }
      }, 300);
    }

    document.addEventListener("focusin", onFocusIn);
    return () => document.removeEventListener("focusin", onFocusIn);
  }, []);

  return null;
}
