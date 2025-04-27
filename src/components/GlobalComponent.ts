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

  @Handle({ global: true })
  END() {
    this.$output.push({
      message: 'Goodbye!',
      listen: false, // <<< this ends the session
    });
    return this.$send({
      message: 'Goodbye!',
      listen: false,
    });
  }

  @Handle({ global: true })
  SessionEndedRequest() {
    return this.$send({
      message: 'Session has ended.',
      listen: false,
    });
  }
}
