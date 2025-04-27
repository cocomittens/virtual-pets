import { Component, BaseComponent, Intents } from '@jovotech/framework';
import { MainMenu } from '../menu/MainMenu';

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
    // show tutorial message, then navigate to main menu
    this.$send('This is how to take care of your new pet!');
    return this.$redirect(MainMenu);
  }

  UNHANDLED() {
    return this.START();
  }
}
