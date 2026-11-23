import { app } from './app';
import { FileDb } from '@jovotech/db-filedb';
import { JovoDebugger } from '@jovotech/plugin-debugger';

/*
|--------------------------------------------------------------------------
| STAGE CONFIGURATION
|--------------------------------------------------------------------------
|
| This configuration gets merged into the default app config
| Learn more here: www.jovo.tech/docs/staging
|
| Local development: pets are saved to db/db.json and the Jovo Debugger is on
|
*/
app.configure({
  plugins: [
    new FileDb({
      pathToFile: '../db/db.json',
    }),
    new JovoDebugger(),
  ],
});

export * from './server.express';
