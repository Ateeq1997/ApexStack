import { ReactNode, useEffect, useRef, useState } from 'react';

interface DeferredRenderProps {
  children: ReactNode;
  placeholder: ReactNode;
  rootMargin?: string;
}

export function DeferredRender({ children, placeholder, rootMargin = '200px' }: DeferredRenderProps) {
  const [isVisible, setIsVisible] = useState(false);
  const targetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isVisible) return;

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    if (targetRef.current) observer.observe(targetRef.current);

    return () => observer.disconnect();
  }, [isVisible, rootMargin]);

  return <div ref={targetRef}>{isVisible ? children : placeholder}</div>;
}
