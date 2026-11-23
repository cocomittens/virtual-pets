import { Component, BaseComponent, Intents } from '@jovotech/framework';
import {
  animals,
  ROUND_LENGTHS,
  POSITIONS,
  COINS_PER_CORRECT,
} from '../../../../copy/minigames/memory';
import { MainMenu } from '../MainMenu';
import { heard, shuffle } from '../../../util/heard';
import { finishGame } from './finishGame';

interface MemoryState {
  round: number;
  score: number;
  sequence: string[];
  position: number; // index into sequence the player is asked about
}

@Component()
export class Memory extends BaseComponent {
  START(): Promise<void> {
    this.$session.data.memory = { round: 0, score: 0, sequence: [], position: 0 } as MemoryState;
    return this.nextRound(
      "Let's test your memory! I'll say a list of animals, then ask you about one of them. ",
    );
  }

  nextRound(prefix = ''): Promise<void> {
    const state = this.$session.data.memory as MemoryState | undefined;
    if (!state) return this.START();
    state.sequence = shuffle(animals).slice(0, ROUND_LENGTHS[state.round]);
    state.position = Math.floor(Math.random() * state.sequence.length);
    return this.ask(`${prefix}Round ${state.round + 1}. `);
  }

  ask(prefix = ''): Promise<void> {
    const state = this.$session.data.memory as MemoryState | undefined;
    if (!state) return this.START();
    return this.$send({
      message: `${prefix}Listen carefully: ${state.sequence.join(', ')}. Which animal was ${
        POSITIONS[state.position]
      }?`,
      listen: true,
    });
  }

  @Intents(['AnswerIntent', 'PetTypeIntent', 'NameIntent'])
  getAnswer() {
    const state = this.$session.data.memory as MemoryState | undefined;
    if (!state) return this.START();
    const answer = heard(this);
    if (!answer) return this.ask("Sorry, I didn't catch that. I'll say them again. ");

    const expected = state.sequence[state.position];
    const isCorrect = answer === expected;
    if (isCorrect) state.score++;
    state.round++;
    const feedback = isCorrect ? 'Correct! ' : `Not quite, it was ${expected}. `;

    if (state.round < ROUND_LENGTHS.length) {
      return this.nextRound(feedback);
    }

    delete this.$session.data.memory;
    this.$send(
      `${feedback}You got ${state.score} out of ${ROUND_LENGTHS.length}. ${finishGame(
        this,
        state.score * COINS_PER_CORRECT,
      )}`,
    );
    return this.$redirect(MainMenu);
  }

  UNHANDLED() {
    return this.ask("Sorry, I didn't catch that. I'll say them again. ");
  }
}
