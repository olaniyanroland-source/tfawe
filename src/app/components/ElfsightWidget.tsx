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
    const refreshElfsight = () => {
      document
        .querySelectorAll<HTMLScriptElement>(`script[src^="${ELFSIGHT_SCRIPT_SRC}"]`)
        .forEach(script => script.remove());

      const script = document.createElement("script");
      script.src = ELFSIGHT_SCRIPT_SRC;
      script.async = true;
      script.dataset.elfsightPlatform = "true";
      document.body.appendChild(script);
    };

    const frame = window.requestAnimationFrame(refreshElfsight);
    return () => window.cancelAnimationFrame(frame);
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
