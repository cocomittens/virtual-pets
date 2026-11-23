import { app } from './app';
import { DynamoDb } from '@jovotech/db-dynamodb';

/*
|--------------------------------------------------------------------------
| STAGE CONFIGURATION
|--------------------------------------------------------------------------
|
| This configuration gets merged into the default app config
| Learn more here: www.jovo.tech/docs/staging
|
| Production: runs on AWS Lambda and saves pets to DynamoDB. On Lambda the
| function's role provides credentials; ACCESS_KEY / SECRET_ACCESS_KEY are
| only needed when running somewhere without a role.
|
*/
const { ACCESS_KEY, SECRET_ACCESS_KEY } = process.env;

app.configure({
  plugins: [
    new DynamoDb({
      table: {
        name: 'pixel-pets',
      },
      libraryConfig: {
        dynamoDbClient: {
          region: process.env.AWS_REGION || 'us-east-1',
          ...(ACCESS_KEY && SECRET_ACCESS_KEY
            ? { credentials: { accessKeyId: ACCESS_KEY, secretAccessKey: SECRET_ACCESS_KEY } }
            : {}),
        },
      },
    }),
  ],
});

export * from './server.lambda';
