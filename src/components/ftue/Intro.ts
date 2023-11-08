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
        alexa: this.$device.supports('ALEXA:APL')
          ? {
              nativeResponse: {
                response: {
                  directives: [
                    {
                      type: 'Alexa.Presentation.APL.RenderDocument',
                      document: main,
                    },
                  ],
                },
              },
            }
          : {}, //  no screen
      },
    });
  }

  UNHANDLED() {
    return this.START();
  }
}
