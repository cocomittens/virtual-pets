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
export class Quiz extends BaseComponent {
  START() {
    this.$send('Quiz minigame');
  }

  @Intents(['AnswerIntent'])
  getAnswer() {
    return this.$send(this.$entities.AnswerValue?.value);
  }

  UNHANDLED() {
    return this.START();
  }
}
