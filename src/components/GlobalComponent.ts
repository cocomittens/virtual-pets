import { Component, BaseComponent, Global } from '@jovotech/framework';
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
    return this.$redirect(MainMenu);
  }
}
