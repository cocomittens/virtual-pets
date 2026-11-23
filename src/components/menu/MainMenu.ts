import { Component, BaseComponent, Intents } from '@jovotech/framework';
import { AlexaCapability } from '@jovotech/platform-alexa';

import { Feed } from './Feed';
import { Customize } from './customize/Customize';
import { Shopping } from './customize/Shopping';
import { PlayGame } from './minigames/PlayGame';
import { CreatePet } from '../ftue/CreatePet';

import { MenuOutput } from '../../output/MenuOutput';
import { MainMenuVisuals } from '../../apl/mainMenu';
import { loadPet } from '../../util/pet';

@Component()
export class MainMenu extends BaseComponent {
  START() {
    const pet = loadPet(this);
    if (!pet) {
      return this.$redirect(CreatePet);
    }

    if (this.$device.supports(AlexaCapability.Apl)) {
      this.$output.push({
        platforms: {
          alexa: {
            nativeResponse: {
              response: {
                directives: [
                  {
                    type: 'Alexa.Presentation.APL.RenderDocument',
                    token: 'mainMenuToken',
                    document: MainMenuVisuals(pet),
                  },
                ],
              },
            },
          },
        },
      });
    }

    return this.$send(MenuOutput, {
      message: `What would you like to do: play a game, feed ${pet.name}, or go shopping?`,
    });
  }

  @Intents(['FeedIntent'])
  goFeed() {
    return this.$redirect(Feed);
  }

  @Intents(['CustomizeIntent'])
  goCustomize() {
    return this.$redirect(Customize);
  }

  @Intents(['ShoppingIntent'])
  goShopping() {
    return this.$redirect(Shopping);
  }

  @Intents(['PlayGameIntent'])
  goPlayGame() {
    return this.$redirect(PlayGame);
  }

  // "play charades" straight from the menu
  @Intents(['ChooseGameIntent'])
  goChosenGame() {
    return this.$redirect(PlayGame, 'chooseGame');
  }

  UNHANDLED() {
    return this.START();
  }
}
