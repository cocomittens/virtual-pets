import { App } from '@jovotech/framework';
import { AlexaPlatform } from '@jovotech/platform-alexa';

import { GlobalComponent } from './components/GlobalComponent';
import { Tutorial } from './components/ftue/Tutorial';
import { CreatePet } from './components/ftue/CreatePet';
import { MainMenu } from './components/menu/MainMenu';
import { Customize } from './components/menu/customize/Customize';
import { Feed } from './components/menu/Feed';
import { PlayGame } from './components/menu/minigames/PlayGame';
import { Shopping } from './components/menu/customize/Shopping';
import { Memory } from './components/menu/minigames/Memory';
import { Charades } from './components/menu/minigames/Charades';
import { Quiz } from './components/menu/minigames/Quiz';
import { Intro } from './components/ftue/Intro';

/*
|--------------------------------------------------------------------------
| APP CONFIGURATION
|--------------------------------------------------------------------------
|
| All relevant components, plugins, and configurations for your Jovo app
| Learn more here: www.jovo.tech/docs/app-config
|
*/
const app = new App({
  /*
  |--------------------------------------------------------------------------
  | Components
  |--------------------------------------------------------------------------
  |
  | Components contain the Jovo app logic
  | Learn more here: www.jovo.tech/docs/components
  |
  */
  components: [
    GlobalComponent,
    Intro,
    Tutorial,
    CreatePet,
    MainMenu,
    Customize,
    Feed,
    PlayGame,
    Shopping,
    Memory,
    Charades,
    Quiz,
  ],

  /*
  |--------------------------------------------------------------------------
  | Plugins
  |--------------------------------------------------------------------------
  |
  | Includes platforms, database integrations, third-party plugins, and more
  | Learn more here: www.jovo.tech/marketplace
  |
  */
  plugins: [
    new AlexaPlatform({
      intentMap: {
        'AMAZON.StopIntent': 'END',
        'AMAZON.CancelIntent': 'END',
      },
    }),
  ],

  /*
  |--------------------------------------------------------------------------
  | Other options
  |--------------------------------------------------------------------------
  |
  | Includes all other configuration options like logging
  | Learn more here: www.jovo.tech/docs/app-config
  |
  */
  logging: true,
});

export { app };
