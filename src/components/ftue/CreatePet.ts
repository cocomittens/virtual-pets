import { Component, BaseComponent, Intents } from '@jovotech/framework';

import { ChoosePetOutput } from '../../output/ChoosePetOutput';

/*
|--------------------------------------------------------------------------
| Component
|--------------------------------------------------------------------------
|
| A component consists of handlers that respond to specific user requests
| Learn more here: www.jovo.tech/docs/components, jovo.tech/docs/handlers
|
*/
@Component()
export class CreatePet extends BaseComponent {
  START() {
    return this.$send(ChoosePetOutput, {
      message: 'Do you want to adopt a dog, cat or bunny?',
      listen: true,
    });
  }

  @Intents(['PetTypeIntent'])
  collectPetType() {
    return this.$resolve('success', this.$entities.petType?.resolved);
  }

  UNHANDLED() {
    return this.START();
  }
}
