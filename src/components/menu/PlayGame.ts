import { Component, BaseComponent, Intents } from '@jovotech/framework';

import { ChooseGameOutput } from '../../output/ChooseGameOutput';

import { capitalize } from '../../util/Capitalize';

import { Adventure } from './minigames/Adventure';
import { Charades } from './minigames/Charades';
import { Quiz } from './minigames/Quiz';

/*
|--------------------------------------------------------------------------
| Component
|--------------------------------------------------------------------------
|
| A component consists of handlers that respond to specific user requests
| Learn more here: www.jovo.tech/docs/components, jovo.tech/docs/handlers
|
*/

type minigames = 'Adventure' | 'Charades' | 'Quiz';

const games = {
  Adventure,
  Charades,
  Quiz,
};

@Component()
export class PlayGame extends BaseComponent {
  START() {
    return this.$send(ChooseGameOutput, { message: 'Which game would you like to play?' });
  }

  @Intents(['ChooseGameIntent'])
  collectGameType() {
    const gameName = capitalize(this.$entities.gameName?.value);
    const game = games[gameName as minigames];
    console.log('game: ', game);
    return this.$redirect(game);
  }

  UNHANDLED() {
    return this.START();
  }
}
