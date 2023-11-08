import { Component, BaseComponent, Intents } from '@jovotech/framework';

import main from '../../apl/main.json';

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
export class Intro extends BaseComponent {
  START() {
    return this.$send({
      message: 'Welcome to pixel pals!',
      listen: false,
      platforms: {
        alexa: {
          nativeResponse: {
            response: {
              directives: [
                {
                  type: 'Alexa.Presentation.APL.RenderDocument',
                  token: 'introToken',
                  document: main,
                },
              ],
            },
          },
        },
      },
    });
  }

  UNHANDLED() {
    return this.START();
  }
}
