import { Component, BaseComponent, Global, Handle } from '@jovotech/framework';
import { CreatePet } from './ftue/CreatePet';
import { MainMenu } from './menu/MainMenu';
import { loadPet, statusLine } from '../util/pet';

/*
|--------------------------------------------------------------------------
| Global Component
|--------------------------------------------------------------------------
|
| The global component handlers can be reached from anywhere in the app
| Learn more here: www.jovo.tech/docs/components#global-components
|
*/
@Global()
@Component()
export class GlobalComponent extends BaseComponent {
  LAUNCH() {
    const pet = loadPet(this);
    if (!pet) {
      this.$send('Welcome to Pixel Pals, where you raise your very own virtual pet!');
      return this.$redirect(CreatePet);
    }
    this.$send(`Welcome back to Pixel Pals! ${statusLine(pet)}`);
    return this.$redirect(MainMenu);
  }

  // prioritizedOverUnhandled: without it, each component's UNHANDLED swallows these
  @Handle({ global: true, prioritizedOverUnhandled: true })
  END() {
    return this.$send({
      message: 'Goodbye!',
      listen: false,
    });
  }

  @Handle({ global: true, prioritizedOverUnhandled: true, intents: ['MenuIntent', 'BackIntent'] })
  goToMenu() {
    return this.$redirect(MainMenu);
  }

  @Handle({ global: true, prioritizedOverUnhandled: true, intents: ['AMAZON.HelpIntent'] })
  help() {
    this.$send(
      'Play games to earn coins, spend coins on food at the shop, and feed your pet to keep it full and happy. Say menu at any time to come back here, or stop to exit.',
    );
    return this.$redirect(MainMenu);
  }

  @Handle({ global: true })
  SessionEndedRequest() {
    return this.$send({
      message: 'Session has ended.',
      listen: false,
    });
  }
}
