import { Component, BaseComponent, Intents } from '@jovotech/framework';

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
export class Intro extends BaseComponent {
  START() {
    return this.$send('Welcome to Pixel Pals');
  }

  UNHANDLED() {
    return this.START();
  }
}
