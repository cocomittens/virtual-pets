import { Component, BaseComponent, Intents } from '@jovotech/framework';
// import { MainMenu } from '../../apl/mainMenu';
import { CreatePet } from './CreatePet';
import { MainMenu } from '../menu/MainMenu';


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
    const response: any = {
      message: 'Welcome to pixel pals!',
      listen: false,
    };

    // if ((this as any).$alexaSkill?.()?.supportsAPL()) {
    //   response.platforms = {
    //     alexa: {
    //       nativeResponse: {
    //         response: {
    //           directives: [
    //             {
    //               type: 'Alexa.Presentation.APL.RenderDocument',
    //               token: 'introToken',
    //               document: MainMenu,
    //             },
    //           ],
    //         },
    //       },
    //     },
    //   };
    // }

    this.$send(response);
    return this.$redirect(MainMenu);
  }

  UNHANDLED() {
    return this.START();
  }
}
