import { Component, BaseComponent, Intents } from '@jovotech/framework';
import { Shopping } from './Shopping';
import { Feed } from './Feed';
import { Customize } from './Customize';

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

  @Intents(['ShoppingIntent'])
  goShopping() {
    return this.$redirect(Shopping);
  }

  @Intents(['FeedIntent'])
  goFeed() {
    return this.$redirect(Feed);
  }

  @Intents(['CustomizeIntent'])
  goCustomize() {
    return this.$redirect(Customize);
  }

  UNHANDLED() {
    return this.START();
  }
}
