import { Component, BaseComponent, Intents } from '@jovotech/framework';

import { Feed } from './Feed';
import { Customize } from './customize/Customize';
import { PlayGame } from './minigames/PlayGame';

import { MenuOutput } from '../../output/MenuOutput';
import { MainMenuVisuals } from '../../apl/mainMenu';

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
export class MainMenu extends BaseComponent {
  START() {

    // if ((this as any).$alexaSkill?.()?.supportsAPL()) {
    //   console.log("APL supported");
      this.$output.push({
        platforms: {
          alexa: {
            nativeResponse: {
              response: {
                directives: [
                  {
                    type: 'Alexa.Presentation.APL.RenderDocument',
                    token: 'introToken',
                    document: MainMenuVisuals,
                  },
                ],
              },
            },
          },
        },
      });
    // }

    return this.$send(MenuOutput, { message: 'What would you like to do?' });
  }

  @Intents(['FeedIntent'])
  goFeed() {
    return this.$redirect(Feed);
  }

  @Intents(['CustomizeIntent'])
  goCustomize() {
    return this.$redirect(Customize);
  }

  @Intents(['PlayGameIntent'])
  goPlayGame() {
    return this.$redirect(PlayGame);
  }

  UNHANDLED() {
    return this.START();
  }
}
