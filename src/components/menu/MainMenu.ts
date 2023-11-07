import { Component, BaseComponent, Intents } from '@jovotech/framework';

import { Shopping } from './Shopping';
import { Feed } from './Feed';
import { Customize } from './Customize';
import { PlayGame } from './PlayGame';

import { MenuOutput } from '../../output/MenuOutput';

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
    return this.$send(MenuOutput, { message: 'What would you like to do?' });
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

  @Intents(['PlayGameIntent'])
  goPlayGame() {
    return this.$redirect(PlayGame);
  }

  UNHANDLED() {
    return this.START();
  }
}
