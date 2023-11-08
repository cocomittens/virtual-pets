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
    this.$send('What is the best animal? A. Dog, B. Cat, C. Bunny, D. All of the above?');
  }

  @Intents(['AnswerIntent'])
  getAnswer() {
    return this.$send(this.$entities.answer?.value);
  }

  UNHANDLED() {
    return this.START();
  }
}
