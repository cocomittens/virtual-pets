import { Component, BaseComponent, Intents } from '@jovotech/framework';

import { ChooseGameOutput } from '../../../output/ChooseGameOutput';

import { capitalize } from '../../../util/capitalize';

// Component names of the available minigames
const games = ['Memory', 'Charades', 'Quiz'];

@Component()
export class PlayGame extends BaseComponent {
  START() {
    return this.$send(ChooseGameOutput, {
      message: 'Which game would you like to play: memory, charades, or quiz?',
    });
  }

  @Intents(['ChooseGameIntent'])
  chooseGame() {
    const game = capitalize(this.$entities.gameName?.value ?? '');
    if (!games.includes(game)) {
      return this.$send(ChooseGameOutput, {
        message: "I don't know that game. You can play memory, charades, or quiz.",
      });
    }
    return this.$redirect(game);
  }

  // "play a game" again from inside the picker just repeats the choices
  @Intents(['PlayGameIntent'])
  repeat() {
    return this.START();
  }

  UNHANDLED() {
    return this.START();
  }
}
