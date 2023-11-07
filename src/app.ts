import { App } from '@jovotech/framework';
import { AlexaPlatform } from '@jovotech/platform-alexa';

import { GlobalComponent } from './components/GlobalComponent';
import { Tutorial } from './components/ftue/Tutorial';
import { CreatePet } from './components/ftue/CreatePet';
import { MainMenu } from './components/menu/MainMenu';
import { Customize } from './components/menu/Customize';
import { Feed } from './components/menu/Feed';
import { PlayGame } from './components/menu/PlayGame';
import { Shopping } from './components/menu/Shopping';

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
  components: [GlobalComponent, Tutorial, CreatePet, MainMenu, Customize, Feed, PlayGame, Shopping],

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
