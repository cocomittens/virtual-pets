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
    return this.$send([{
      message: question.question,
    },
    {
      message: question.answers,
      listen: true,
    }]);
    }

  @Intents(['AnswerIntent', 'FallbackCaptureIntent'])
  getAnswer() {
    // Try the structured slot first, then fallback to raw intent slot
    let userAnswer = this.$entities.answer?.value ?? this.$entities.userAnswer?.value;
    const correctAnswer = question.correctAnswer;
    const isCorrect = userAnswer?.toLowerCase() === correctAnswer.toLowerCase();
    console.log(`User answer: ${userAnswer}, Correct answer: ${correctAnswer}`);
    if (isCorrect) this.score++;
    return this.$send([
      { message: isCorrect ? "That's correct!" : "Sorry, that's not right." },
      { message: `Quiz finished! Your score is ${this.score}.`, listen: false },
    ]);
  }

  endQuiz() {
    return this.$send({ message: `Quiz finished! Your score is ${this.score}.` });
  }

  UNHANDLED() {
    return this.START();
  }
}
