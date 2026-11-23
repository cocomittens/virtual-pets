import { Component, BaseComponent } from '@jovotech/framework';
import { MainMenu } from '../menu/MainMenu';
import { loadPet } from '../../util/pet';

@Component()
export class Tutorial extends BaseComponent {
  START() {
    const pet = loadPet(this);
    const name = pet?.name ?? 'your pet';
    this.$send(
      `Say hello to ${name}! Here is how it works: play games to earn coins, spend coins on food at the shop, and feed ${name} to keep your pet full and happy. ${name} is a little hungry right now, and you have one snack to start with.`,
    );
    return this.$redirect(MainMenu);
  }

  UNHANDLED() {
    return this.START();
  }
}
