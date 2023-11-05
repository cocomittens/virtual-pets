import { Component, BaseComponent, Intents } from '@jovotech/framework';

import { YesNoOutput } from '../output/YesNoOutput';

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
    return this.$send(YesNoOutput, { message: 'Do you want to adopt a dog, cat or bunny?' });
  }

  @Intents(['YesIntent'])
  lovesPizza() {
    return this.$send({ message: 'Yes! I love pizza, too.', listen: false });
  }

  @Intents(['NoIntent'])
  hatesPizza() {
    return this.$send({ message: `That's OK! Not everyone likes pizza.`, listen: false });
  }

  UNHANDLED() {
    return this.START();
  }
}
