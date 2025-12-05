import { useEffect, useRef, useState } from "react";

export type sizeType = { width: number; height: number };

export default function useMeasure<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState<sizeType>({ width: 0, height: 0 });

  useEffect(() => {
    if (ref.current) {
      const observer = new ResizeObserver(([entry]) => {
        const { width, height } = entry.contentRect;
        setSize({ width: Math.round(width), height: Math.round(height) });
      });

      observer.observe(ref.current);

      return () => observer.disconnect();
    }
  }, []);

  return [ref, size] as const;
}
