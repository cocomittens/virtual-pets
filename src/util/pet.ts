import { Jovo } from '@jovotech/framework';

export type PetType = 'dog' | 'cat' | 'bunny';

export interface Pet {
  type: PetType;
  name: string;
  fullness: number; // 0 (starving) - 100 (stuffed)
  happiness: number; // 0 - 100
  coins: number;
  food: number;
  updatedAt: number; // ms timestamp of the last decay calculation
}

export const PET_TYPES: PetType[] = ['dog', 'cat', 'bunny'];
export const FOOD_PRICE = 10;
export const FEED_AMOUNT = 40;

const FULLNESS_LOSS_PER_HOUR = 5;
const HAPPINESS_LOSS_PER_HOUR = 3;
const LOW = 35;
const HOUR = 60 * 60 * 1000;

const clamp = (n: number) => Math.max(0, Math.min(100, Math.round(n)));

export function createPet(type: PetType, name: string, now = Date.now()): Pet {
  return { type, name, fullness: 30, happiness: 50, coins: 10, food: 1, updatedAt: now };
}

// Pets get hungrier and more bored the longer they are left alone.
export function decay(pet: Pet, now = Date.now()): Pet {
  const hours = Math.max(0, now - pet.updatedAt) / HOUR;
  return {
    ...pet,
    fullness: clamp(pet.fullness - hours * FULLNESS_LOSS_PER_HOUR),
    happiness: clamp(pet.happiness - hours * HAPPINESS_LOSS_PER_HOUR),
    updatedAt: now,
  };
}

export function feed(pet: Pet): Pet {
  return {
    ...pet,
    food: pet.food - 1,
    fullness: clamp(pet.fullness + FEED_AMOUNT),
    happiness: clamp(pet.happiness + 5),
  };
}

export function reward(pet: Pet, coins: number, happiness: number): Pet {
  return { ...pet, coins: pet.coins + coins, happiness: clamp(pet.happiness + happiness) };
}

export function statusLine(pet: Pet): string {
  const hungry = pet.fullness < LOW;
  const bored = pet.happiness < LOW;
  if (hungry && bored) return `${pet.name} is hungry and bored.`;
  if (hungry) return `${pet.name} is hungry.`;
  if (bored) return `${pet.name} is bored and wants to play.`;
  return `${pet.name} is happy to see you.`;
}

// Reads the stored pet (if any) with time decay applied, and saves the result.
export function loadPet(jovo: Jovo): Pet | undefined {
  const stored = jovo.$user.data.pet as Pet | undefined;
  if (!stored) return undefined;
  return savePet(jovo, decay(stored));
}

export function savePet(jovo: Jovo, pet: Pet): Pet {
  jovo.$user.data.pet = pet;
  return pet;
}
