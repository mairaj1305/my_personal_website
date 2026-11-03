import { useLayoutEffect, useRef, useState } from 'react';

type PortfolioFilterBarProps<T extends string> = {
  filters: readonly T[];
  active: T;
  onChange: (value: T) => void;
  count: number;
};

export function PortfolioFilterBar<T extends string>({ filters, active, onChange, count }: PortfolioFilterBarProps<T>) {
  const chipRefs = useRef<Partial<Record<T, HTMLButtonElement | null>>>({});
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  useLayoutEffect(() => {
    const measure = () => {
      const chip = chipRefs.current[active];
      if (chip) setIndicator({ left: chip.offsetLeft, width: chip.offsetWidth });
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [active]);

  return (
    <div className="pf-filter-bar">
      <div className="container pf-filter-row">
        <div className="pf-filter" role="group" aria-label="Filter projects">
          <span
            className="pf-filter-indicator"
            aria-hidden="true"
            style={{ transform: `translateX(${indicator.left}px)`, width: indicator.width }}
          />
          {filters.map((item) => (
            <button
              key={item}
              ref={(node) => { chipRefs.current[item] = node; }}
              type="button"
              className={`pf-chip ${active === item ? 'is-active' : ''}`}
              aria-pressed={active === item}
              onClick={() => onChange(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <p className="pf-count" aria-live="polite">
          {count} {count === 1 ? 'project' : 'projects'}
        </p>
      </div>
    </div>
  );
}
