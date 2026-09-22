"use client";

import { useEffect } from "react";

export default function DisableRightClick() {
  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
    };
    document.addEventListener("contextmenu", handleContextMenu);

    // Cleanup event listener on unmount
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  return null; // This component doesn't render anything
}
