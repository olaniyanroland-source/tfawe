import { useEffect, useRef } from "react";

const ELFSIGHT_SCRIPT_SRC = "https://elfsightcdn.com/platform.js";

type ElfsightWidgetProps = {
  appId: string;
  className?: string;
  style?: React.CSSProperties;
};

export function ElfsightWidget({ appId, className = "", style }: ElfsightWidgetProps) {
  const widgetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const widget = widgetRef.current;
    if (!widget) return;

    const loadWidget = () => {
      const existingScript = document.querySelector<HTMLScriptElement>(`script[src^="${ELFSIGHT_SCRIPT_SRC}"]`);
      if (existingScript) return;

      const script = document.createElement("script");
      script.src = ELFSIGHT_SCRIPT_SRC;
      script.async = true;
      script.dataset.elfsightPlatform = "true";
      document.body.appendChild(script);
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      loadWidget();
      observer.disconnect();
    }, { rootMargin: "300px" });

    observer.observe(widget);
    return () => observer.disconnect();
  }, [appId]);

  return (
    <div
      ref={widgetRef}
      className={`elfsight-app-${appId} ${className}`.trim()}
      data-elfsight-app-lazy
      style={style}
    />
  );
}
