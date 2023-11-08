import { app } from './app';
import { DynamoDb } from '@jovotech/db-dynamodb';
import { JovoDebugger } from '@jovotech/plugin-debugger';

/*
|--------------------------------------------------------------------------
| STAGE CONFIGURATION
|--------------------------------------------------------------------------
|
| This configuration gets merged into the default app config
| Learn more here: www.jovo.tech/docs/staging
|
*/
app.configure({
  plugins: [
    new DynamoDb({
      table: {
        name: 'pixel-pets',
      },
      libraryConfig: {
        dynamoDbClient: {
          region: 'us-east-1',
          credentials: {
            accessKeyId: process.env.ACCESS_KEY,
            secretAccessKey: process.env.SECRET_ACCESS_KEY,
          },
        },
      },
    }),
    new JovoDebugger(),
  ],
});

export * from './server.express';
