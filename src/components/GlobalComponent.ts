import { Component, BaseComponent, Global, Handle } from '@jovotech/framework';
import { Intro } from './ftue/Intro';
import { MainMenu } from './menu/MainMenu';

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
    return this.$redirect(Intro);
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
      'You can play a game, feed your pet, customize your pet, or go shopping. Say menu at any time to come back here, or stop to exit.',
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
