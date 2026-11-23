import { createPet, decay, feed, reward, statusLine } from '../src/util/pet';

const HOUR = 60 * 60 * 1000;

test('a new pet starts hungry with one food and a few coins', () => {
  const pet = createPet('bunny', 'Biscuit', 0);
  expect(pet).toMatchObject({ type: 'bunny', name: 'Biscuit', food: 1, coins: 10 });
  expect(statusLine(pet)).toBe('Biscuit is hungry.');
});

test('feeding uses one food and fills the pet up', () => {
  const pet = feed(createPet('cat', 'Miso', 0));
  expect(pet.food).toBe(0);
  expect(pet.fullness).toBe(70);
  expect(statusLine(pet)).toBe('Miso is happy to see you.');
});

test('pets get hungrier and more bored over time, but never below zero', () => {
  const pet = feed(createPet('dog', 'Rex', 0));
  const later = decay(pet, 4 * HOUR);
  expect(later.fullness).toBe(50);
  expect(later.happiness).toBe(43);
  expect(later.updatedAt).toBe(4 * HOUR);

  const muchLater = decay(pet, 1000 * HOUR);
  expect(muchLater.fullness).toBe(0);
  expect(muchLater.happiness).toBe(0);
  expect(statusLine(muchLater)).toBe('Rex is hungry and bored.');
});

test('rewards add coins and cap happiness at 100', () => {
  const pet = reward(createPet('dog', 'Rex', 0), 15, 80);
  expect(pet.coins).toBe(25);
  expect(pet.happiness).toBe(100);
});
