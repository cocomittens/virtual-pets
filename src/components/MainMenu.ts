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
export class MainMenu extends BaseComponent {
  START() {
    this.$send('Welcome to Virtual Pet Haven');
  }


  UNHANDLED() {
    return this.START();
  }
}
