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
  score = 0;

  START() {
    this.score = 0;
    // ask the first question to keep the session open
    return this.askQuestion();
  }

  askQuestion() {
    return this.$send({
      message: `${question.question} ${question.answers}`,
      listen: true,
    });
  }

  @Intents(['AnswerIntent'])
  getAnswer() {
    const userAnswer = this.$entities.answer?.value;
    if (userAnswer === question.correctAnswer) {
      this.score++;
      this.$send({ message: "That's correct!" });
    } else {
      this.$send({ message: "Sorry, that's not right." });
    }
    this.endQuiz();
  }

  endQuiz() {
    return this.$send({ message: `Quiz finished! Your score is ${this.score}.` });
  }

  UNHANDLED() {
    return this.START();
  }
}
