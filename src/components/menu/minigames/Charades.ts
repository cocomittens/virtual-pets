import { Component, BaseComponent, Intents } from '@jovotech/framework';
import { charade } from '../../../../copy/minigames/charades';

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
export class Charades extends BaseComponent {
  START() {
    this.$send('Welcome to charades!');
    return this.$send(charade.hints[0]);
  }

  @Intents(['GuessIntent'])
  handleGuess() {
    return this.$send(this.$entities.answer?.value);
  }

  @Intents(['HintIntent'])
  handleClue() {
    return this.$send('Give a clue');
  }

  UNHANDLED() {
    return this.START();
  }
}
