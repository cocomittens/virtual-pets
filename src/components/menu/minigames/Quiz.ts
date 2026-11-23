import { Component, BaseComponent, Intents } from '@jovotech/framework';
import { questions, QUESTIONS_PER_QUIZ, COINS_PER_CORRECT } from '../../../../copy/minigames/quiz';
import { MainMenu } from '../MainMenu';
import { heard, shuffle } from '../../../util/heard';
import { finishGame } from './finishGame';

interface QuizState {
  order: number[]; // indexes into questions
  current: number;
  score: number;
}

@Component()
export class Quiz extends BaseComponent {
  START(): Promise<void> {
    const order = shuffle(questions.map((_, index) => index)).slice(0, QUESTIONS_PER_QUIZ);
    this.$session.data.quiz = { order, current: 0, score: 0 } as QuizState;
    return this.ask(`Quiz time! I have ${order.length} questions for you. `);
  }

  ask(prefix = ''): Promise<void> {
    const state = this.$session.data.quiz as QuizState | undefined;
    if (!state) return this.START();
    const { question, answers } = questions[state.order[state.current]];
    const options = `${answers.slice(0, -1).join(', ')}, or ${answers[answers.length - 1]}`;
    return this.$send({
      message: `${prefix}Question ${state.current + 1}. ${question} Is it ${options}?`,
      listen: true,
    });
  }

  @Intents(['AnswerIntent', 'PetTypeIntent', 'NameIntent'])
  getAnswer() {
    const state = this.$session.data.quiz as QuizState | undefined;
    if (!state) return this.START();
    const answer = heard(this);
    if (!answer) return this.ask("Sorry, I didn't catch that. ");

    const { correctAnswer } = questions[state.order[state.current]];
    const isCorrect = answer === correctAnswer;
    if (isCorrect) state.score++;
    state.current++;
    const feedback = isCorrect ? "That's correct! " : `Not quite, it was ${correctAnswer}. `;

    if (state.current < state.order.length) {
      return this.ask(feedback);
    }

    delete this.$session.data.quiz;
    this.$send(
      `${feedback}You got ${state.score} out of ${state.order.length}. ${finishGame(
        this,
        state.score * COINS_PER_CORRECT,
      )}`,
    );
    return this.$redirect(MainMenu);
  }

  @Intents(['HintIntent'])
  handleClue() {
    return this.ask('No hints in the quiz, but here it is again. ');
  }

  UNHANDLED() {
    return this.ask("Sorry, I didn't catch that. ");
  }
}
