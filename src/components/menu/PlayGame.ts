import { Component, BaseComponent, Intents } from '@jovotech/framework';

import { ChooseGameOutput } from '../../output/ChooseGameOutput';

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
export class PlayGame extends BaseComponent {
  START() {
    return this.$send(ChooseGameOutput, { message: 'Which game would you like to play?' });
  }

  @Intents(['GameTypeIntent'])
  collectGameType() {
    return this.$resolve('success', this.$entities.gameType?.resolved);
  }

  UNHANDLED() {
    return this.START();
  }
}
