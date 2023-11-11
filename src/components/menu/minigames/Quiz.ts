import { Component, BaseComponent, Intents } from '@jovotech/framework';
import { question } from '../../../../copy/minigames/quiz';
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
    return this.$send({
      message: question.question,
      listen: true,
    });
  }

  @Intents(['AnswerIntent'])
  getAnswer() {
    return this.$send(this.$entities.answer?.value);
  }

  UNHANDLED() {
    return this.START();
  }
}
