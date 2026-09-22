import { Icons } from './icons';

export type IconName = keyof typeof Icons;

interface IconProps {
  name: IconName;
  className?: string;
}

export default function Icon({ name, className }: IconProps) {
  const icon = Icons[name] as {
    paths: { d: string }[];
    class?: string;
    viewBox: string;
    fill: string;
    strokeWidth: string;
    strokeLinecap: string;
    strokeLinejoin: string;
    stroke: string;
  };
  if (!icon) return null;
  return (
    <svg
      viewBox={icon.viewBox}
      fill={icon.fill}
      stroke={icon.stroke}
      strokeWidth={Number(icon.strokeWidth)}
      strokeLinecap={icon.strokeLinecap as 'round' | 'butt' | 'square'}
      strokeLinejoin={icon.strokeLinejoin as 'round' | 'miter' | 'bevel'}
      className={className ?? icon.class ?? 'size-4'}
      aria-hidden="true"
    >
      {icon.paths.map((p, i) => (
        <path key={i} d={p.d} />
      ))}
    </svg>
  );
}
