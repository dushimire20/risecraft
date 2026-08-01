"use client";

import { useEffect, useState } from "react";

export function useLiveContent(initial) {
  const [content, setContent] = useState(initial);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/content", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data) setContent(data);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return content;
}
