import { Jovo } from '@jovotech/framework';

const ALIASES: Record<string, string> = {
  'puppy': 'dog',
  'kitten': 'cat',
  'kitty': 'cat',
  'rabbit': 'bunny',
  'carrot': 'carrots',
  'bone': 'bones',
  '2': 'two',
  '4': 'four',
  '6': 'six',
};

export function normalize(value: string): string {
  const cleaned = value
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, '')
    .replace(/^(a|an|the) /, '')
    .trim();
  return ALIASES[cleaned] ?? cleaned;
}

// Short spoken answers ("cat") can land in several intents that share words, so
// read whichever entity was filled instead of relying on one intent.
export function heard(jovo: Jovo, raw = false): string | undefined {
  const entities = jovo.$entities as Record<
    string,
    { value?: unknown; resolved?: unknown } | undefined
  >;
  for (const key of ['answer', 'petType', 'name', 'gameName']) {
    const entity = entities[key];
    const value = raw ? entity?.value : entity?.resolved ?? entity?.value;
    if (value) return raw ? String(value).trim() : normalize(String(value));
  }
  return undefined;
}

export function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
