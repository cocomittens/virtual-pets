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
export class Shopping extends BaseComponent {
  START() {
    this.$send('Go shopping');
  }

  UNHANDLED() {
    return this.START();
  }
}
