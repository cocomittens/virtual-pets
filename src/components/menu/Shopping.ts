import { Component, BaseComponent, Intents } from '@jovotech/framework';
import { MainMenu } from './MainMenu';
import { YesNoOutput } from '../../output/YesNoOutput';
import { FOOD_PRICE, loadPet, savePet } from '../../util/pet';

@Component()
export class Shopping extends BaseComponent {
  START() {
    return this.offer('Welcome to the pet supply store! ');
  }

  offer(prefix = '') {
    const pet = loadPet(this);
    if (!pet) {
      return this.$redirect(MainMenu);
    }

    if (pet.coins < FOOD_PRICE) {
      this.$send(
        `${prefix}Pet food costs ${FOOD_PRICE} coins, and you have ${pet.coins}. Play a game to earn more.`,
      );
      return this.$redirect(MainMenu);
    }

    return this.$send(YesNoOutput, {
      message: `${prefix}Pet food costs ${FOOD_PRICE} coins, and you have ${pet.coins}. Would you like to buy some?`,
    });
  }

  @Intents(['YesIntent', 'ShoppingIntent'])
  buy() {
    const pet = loadPet(this);
    if (!pet) {
      return this.$redirect(MainMenu);
    }
    if (pet.coins < FOOD_PRICE) {
      return this.offer();
    }
    const updated = savePet(this, { ...pet, coins: pet.coins - FOOD_PRICE, food: pet.food + 1 });
    return this.offer(`Sold! You now have ${updated.food} food. `);
  }

  @Intents(['NoIntent'])
  leave() {
    return this.$redirect(MainMenu);
  }

  UNHANDLED() {
    return this.offer();
  }
}
