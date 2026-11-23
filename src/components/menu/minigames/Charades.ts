import { Component, BaseComponent, Intents } from '@jovotech/framework';
import { charades, COINS_FOR_WIN } from '../../../../copy/minigames/charades';
import { MainMenu } from '../MainMenu';
import { heard } from '../../../util/heard';
import { finishGame } from './finishGame';

interface CharadesState {
  index: number; // which charade
  hint: number; // last hint given
}

@Component()
export class Charades extends BaseComponent {
  START(): Promise<void> {
    const index = Math.floor(Math.random() * charades.length);
    this.$session.data.charades = { index, hint: 0 } as CharadesState;
    return this.$send({
      message: `Let's play charades! I'm thinking of an animal. Guess what it is, or say hint for another clue. First clue: ${charades[index].hints[0]}`,
      listen: true,
    });
  }

  // Gives the next clue, or reveals the answer once the clues run out
  nextHint(prefix = ''): Promise<void> {
    const state = this.$session.data.charades as CharadesState | undefined;
    if (!state) return this.START();
    const { answer, hints } = charades[state.index];

    if (state.hint + 1 >= hints.length) {
      delete this.$session.data.charades;
      this.$send(
        `${prefix}That was the last clue. I was thinking of a ${answer}. ${finishGame(this, 0)}`,
      );
      return this.$redirect(MainMenu);
    }

    state.hint++;
    return this.$send({ message: `${prefix}Next clue: ${hints[state.hint]}`, listen: true });
  }

  @Intents(['AnswerIntent', 'PetTypeIntent', 'NameIntent'])
  handleGuess() {
    const state = this.$session.data.charades as CharadesState | undefined;
    if (!state) return this.START();
    const guess = heard(this);
    if (!guess) return this.repeat("Sorry, I didn't catch that. ");

    const { answer } = charades[state.index];
    if (guess === answer) {
      delete this.$session.data.charades;
      this.$send(`Yes, it's a ${answer}! ${finishGame(this, COINS_FOR_WIN)}`);
      return this.$redirect(MainMenu);
    }
    return this.nextHint(`Not a ${guess}. `);
  }

  @Intents(['HintIntent'])
  handleClue() {
    return this.nextHint();
  }

  repeat(prefix = ''): Promise<void> {
    const state = this.$session.data.charades as CharadesState | undefined;
    if (!state) return this.START();
    return this.$send({
      message: `${prefix}The clue was: ${
        charades[state.index].hints[state.hint]
      } Take a guess, or say hint.`,
      listen: true,
    });
  }

  UNHANDLED() {
    return this.repeat("Sorry, I didn't catch that. ");
  }
}
