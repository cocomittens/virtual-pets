//@ts-check
const { ProjectConfig } = require('@jovotech/cli-core');
const { AlexaCli } = require('@jovotech/platform-alexa');

/*
|--------------------------------------------------------------------------
| JOVO PROJECT CONFIGURATION
|--------------------------------------------------------------------------
|
| Information used by the Jovo CLI to build and deploy projects
| Learn more here: www.jovo.tech/docs/project-config
|
*/
const project = new ProjectConfig({
  endpoint: '${JOVO_WEBHOOK_URL}',
  plugins: [
    new AlexaCli({
      locales: {
        en: ['en-US'],
      },
      skillId: 'amzn1.ask.skill.cb4926de-d3d8-4794-880f-84557722ad8f',
    }),
  ],
});

module.exports = project;
