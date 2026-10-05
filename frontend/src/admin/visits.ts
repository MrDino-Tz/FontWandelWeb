/**
 * Demo visitor counter. Counts full page loads in THIS browser only
 * (localStorage) — not site-wide analytics. A real analytics integration
 * would replace this module.
 */
const KEY = 'fontwandel-visits-v1';

export interface VisitStats {
  total: number;
  today: number;
  day: string;
}

let countedThisLoad = false;

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function read(): VisitStats {
  const fallback: VisitStats = { total: 0, today: 0, day: todayKey() };
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as Partial<VisitStats>;
    if (typeof parsed.total !== 'number') return fallback;
    const day = todayKey();
    return {
      total: parsed.total,
      day: parsed.day ?? day,
      today: parsed.day === day ? (parsed.today ?? 0) : 0,
    };
  } catch {
    return fallback;
  }
}

/** Record one visit per full page load. Safe to call repeatedly. */
export function recordVisit(): void {
  if (countedThisLoad) return;
  countedThisLoad = true;
  try {
    const prev = read();
    const day = todayKey();
    const next: VisitStats = {
      total: prev.total + 1,
      day,
      today: prev.day === day ? prev.today + 1 : 1,
    };
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* storage unavailable */
  }
}

export function getVisits(): VisitStats {
  return read();
}
