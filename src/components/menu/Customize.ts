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
export class Customize extends BaseComponent {
  START() {
    this.$send('Customize pet');
  }

  UNHANDLED() {
    return this.START();
  }
}
