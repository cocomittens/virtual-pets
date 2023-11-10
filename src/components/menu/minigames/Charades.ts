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
export class Charades extends BaseComponent {
  START() {
    this.$send('Charades minigame');
  }

  @Intents(['Guess Intent'])
  handleGuess() {
    return this.$send('Guess');
  }

  @Intents(['NextClueIntent'])
  handleClue() {
    return this.$send('Clue');
  }

  UNHANDLED() {
    return this.START();
  }
}
