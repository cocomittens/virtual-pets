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
export class Feed extends BaseComponent {
  START() {
    this.$send('Feed pet');
  }

  UNHANDLED() {
    return this.START();
  }
}
