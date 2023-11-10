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

  @Intents(['GuessIntent'])
  handleGuess() {
    return this.$send(this.$entities.answer?.value);
  }

  @Intents(['NextClueIntent'])
  handleClue() {
    return this.$send('Clue');
  }

  UNHANDLED() {
    return this.START();
  }
}
