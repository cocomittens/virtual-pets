import { Component, BaseComponent, Intents } from '@jovotech/framework';
import { ChoosePetOutput } from '../../output/ChoosePetOutput';
import { Tutorial } from './Tutorial';
import { heard } from '../../util/heard';
import { capitalize } from '../../util/capitalize';
import { createPet, PET_TYPES, PetType, savePet } from '../../util/pet';

/*
|--------------------------------------------------------------------------
| First-time flow: choose a pet type, then give it a name
|--------------------------------------------------------------------------
*/
@Component()
export class CreatePet extends BaseComponent {
  START() {
    delete this.$session.data.newPetType;
    return this.askType();
  }

  askType(prefix = '') {
    return this.$send(ChoosePetOutput, {
      message: `${prefix}Would you like to adopt a dog, a cat, or a bunny?`,
    });
  }

  askName(prefix = '') {
    const type = this.$session.data.newPetType as PetType;
    return this.$send({
      message: `${prefix}What would you like to name your ${type}?`,
      listen: true,
    });
  }

  // Both steps answer with a single word, so one handler routes on the current step
  @Intents(['PetTypeIntent', 'AnswerIntent', 'NameIntent'])
  collect() {
    const type = this.$session.data.newPetType as PetType | undefined;

    if (!type) {
      const choice = heard(this) as PetType | undefined;
      if (!choice || !PET_TYPES.includes(choice)) {
        return this.askType("Sorry, I didn't catch that. ");
      }
      this.$session.data.newPetType = choice;
      return this.askName(`A ${choice}, great choice! `);
    }

    const name = heard(this, true);
    if (!name) {
      return this.askName("Sorry, I didn't catch that. ");
    }
    savePet(this, createPet(type, capitalize(name)));
    delete this.$session.data.newPetType;
    return this.$redirect(Tutorial);
  }

  UNHANDLED() {
    return this.$session.data.newPetType
      ? this.askName("Sorry, I didn't catch that. You can say something like, call it Biscuit. ")
      : this.askType("Sorry, I didn't catch that. ");
  }
}
