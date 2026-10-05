import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';

interface MarqueeProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  pauseOnHover?: boolean;
  direction?: 'left' | 'right';
  speed?: number;
}

/**
 * Infinite logo/card marquee. Children are duplicated internally so the
 * `-50%` loop is seamless — keep symmetric horizontal margins on children
 * (e.g. `mx-4`) rather than gaps on the track.
 */
export function Marquee({
  children,
  pauseOnHover = false,
  direction = 'left',
  speed = 30,
  className = '',
  ...props
}: MarqueeProps) {
  return (
    <div className={`w-full overflow-hidden ${className}`} {...props}>
      <div className="relative flex max-w-full overflow-hidden py-5">
        <div
          className={`flex w-max ${
            direction === 'right' ? 'animate-marquee-reverse' : 'animate-marquee'
          } ${pauseOnHover ? 'hover:[animation-play-state:paused]' : ''}`}
          style={{ '--duration': `${speed}s` } as CSSProperties}
        >
          {children}
          {children}
        </div>
      </div>
    </div>
  );
}
