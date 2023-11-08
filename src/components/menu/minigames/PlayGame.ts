import { Component, BaseComponent, Intents } from '@jovotech/framework';

import { ChooseGameOutput } from '../../../output/ChooseGameOutput';

import { capitalize } from '../../../util/capitalize';

import { Memory } from './Memory';
import { Charades } from './Charades';
import { Quiz } from './Quiz';

/*
|--------------------------------------------------------------------------
| Component
|--------------------------------------------------------------------------
|
| A component consists of handlers that respond to specific user requests
| Learn more here: www.jovo.tech/docs/components, jovo.tech/docs/handlers
|
*/

type minigames = 'Memory' | 'Charades' | 'Quiz';

const games = {
  Memory,
  Charades,
  Quiz,
};

@Component()
export class PlayGame extends BaseComponent {
  START() {
    return this.$send(ChooseGameOutput, { message: 'Which game would you like to play?' });
  }

  @Intents(['ChooseGameIntent'])
  chooseGame() {
    const game = capitalize(this.$entities.gameName?.value);
    return this.$redirect(games[game as minigames]);
  }

  UNHANDLED() {
    return this.START();
  }
}
