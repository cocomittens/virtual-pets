import { Component, BaseComponent, Intents } from '@jovotech/framework';

import { ChoosePetOutput } from '../output/ChoosePetOutput';

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
export class Tutorial extends BaseComponent {
  START() {
    this.$send('Welcome to Virtual Pet Haven');
    return this.$send(ChoosePetOutput, { message: 'Do you want to adopt a dog, cat or bunny?' });
  }

  @Intents(['DogIntent'])
  likesDogs() {
    return this.$send({ message: 'You have chosen a dog!', listen: false });
  }

  @Intents(['CatIntent'])
  likesCats() {
    return this.$send({ message: `You have chosen a cat!`, listen: false });
  }

  @Intents(['BunnyIntent'])
  likesBunnies() {
    return this.$send({ message: `You have chosen a bunny!`, listen: false });
  }

  UNHANDLED() {
    return this.START();
  }
}
