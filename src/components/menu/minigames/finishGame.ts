import { Jovo } from '@jovotech/framework';
import { loadPet, reward, savePet } from '../../../util/pet';

const HAPPINESS_PER_GAME = 15;

// Pays out coins, cheers the pet up, and returns the line to say before the menu.
export function finishGame(jovo: Jovo, coins: number): string {
  const pet = loadPet(jovo);
  if (!pet) return '';
  const updated = savePet(jovo, reward(pet, coins, HAPPINESS_PER_GAME));
  const earned =
    coins > 0 ? `You earned ${coins} coins and now have ${updated.coins}.` : 'No coins this time.';
  return `${earned} ${updated.name} loved playing with you!`;
}
