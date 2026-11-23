import { Component, BaseComponent } from '@jovotech/framework';
import { MainMenu } from './MainMenu';
import { feed, loadPet, savePet } from '../../util/pet';

@Component()
export class Feed extends BaseComponent {
  START() {
    const pet = loadPet(this);
    if (!pet) {
      return this.$redirect(MainMenu);
    }

    if (pet.food < 1) {
      this.$send(`You are out of food. Play a game to earn coins, then buy more at the shop.`);
      return this.$redirect(MainMenu);
    }

    if (pet.fullness >= 90) {
      this.$send(`${pet.name} is already full, so let's save the food for later.`);
      return this.$redirect(MainMenu);
    }

    const fed = savePet(this, feed(pet));
    this.$send(
      `Yum! ${fed.name} gobbles it up and is now ${fed.fullness} percent full. You have ${fed.food} food left.`,
    );
    return this.$redirect(MainMenu);
  }

  UNHANDLED() {
    return this.START();
  }
}
