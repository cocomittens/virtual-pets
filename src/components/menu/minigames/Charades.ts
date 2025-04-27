import { Component, BaseComponent, Intents } from '@jovotech/framework';
import { charade } from '../../../../copy/minigames/charades';

@Component()
export class Charades extends BaseComponent {
  START() {
    const sessionData = (this.$session.$data as any) || {};
    sessionData.hintIndex = 0;
    this.$session.$data = sessionData;
    this.$send('Welcome to charades!');
    return this.$send(charade.hints[0]); // Start with the first hint
  }

  @Intents(['AnswerIntent'])
  handleGuess() {
    const userAnswer = this.$entities.answer?.value?.toLowerCase();
    const correctAnswer = charade.answer.toLowerCase();

    if (userAnswer === correctAnswer) {
      return this.$send('Correct! You guessed it!');
    } else {
      return this.$send('Incorrect! Say "hint" if you want a clue, or try guessing again!');
    }
  }

  @Intents(['HintIntent'])
  handleClue() {
    let sessionData = (this.$session.$data as any) || {};

    if (typeof sessionData.hintIndex !== 'number') {
      sessionData.hintIndex = 0; 
    }

    const current = sessionData.hintIndex;
    const next = current + 1;

    if (next < charade.hints.length) {
      sessionData.hintIndex = next;
      this.$session.$data = sessionData; 
      return this.$send(charade.hints[next]);
    }

    return this.$send({ message: 'No more hints.', listen: false });
  }

  UNHANDLED() {
    return this.START();
  }
}