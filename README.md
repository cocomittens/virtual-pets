# Pixel Pals

A virtual pet for Alexa, built with [Jovo v4](https://www.jovo.tech). Adopt a dog, cat or
bunny, name it, and keep it full and happy: play minigames to earn coins, spend coins on
food at the shop, and feed your pet. Pets get hungrier and more bored while you are away.

## Run locally

Jovo's hosted webhook (`webhook.jovo.cloud`) no longer exists, so the Jovo Debugger and the
default `jovo run` tunnel do not work. Use ngrok to give Alexa a public URL instead:

```sh
npm install
npx jovo run --port 3010      # local server (any free port)
ngrok http 3010               # in a second terminal
```

Then set the skill's endpoint to `<ngrok url>/webhook` (Alexa developer console → Build →
Endpoint, with the "wildcard certificate" SSL option). The ngrok URL changes every time ngrok
restarts, and Alexa can take a few minutes to pick up a new endpoint.

Local runs save pets to `db/db.json` (replace its contents with `[]` to start over as a new
user). The production stage (`src/app.prod.ts`) uses DynamoDB.

After changing `models/en.json`, rebuild and upload just the voice model:

```sh
npx jovo build:platform alexa
ask smapi set-interaction-model -s <skill id> -g development -l en-US \
  --interaction-model "file:build/platform.alexa/skill-package/interactionModels/custom/en-US.json"
```

Avoid `jovo deploy:platform alexa`: it uploads the whole generated skill package, which
replaces the endpoint and drops the screen (APL) interface from the skill settings.

## Deploy to AWS Lambda

```sh
npm run bundle:prod           # writes bundle.zip (handler: index.handler)
```

Upload `bundle.zip` to a Node.js Lambda function in `us-east-1` with handler `index.handler`
and an "Alexa Skills Kit" trigger for the skill ID. Its role needs DynamoDB access to the
`pixel-pets` table (`DescribeTable`, `CreateTable`, `GetItem`, `PutItem`); the table is
created on first run. Then set the skill's endpoint to the function's ARN.

## Demo script

1. "Alexa, open pixel pet pals" → choose "bunny" → "call it Biscuit"
2. "Feed Biscuit" → uses the starter snack
3. "Play a game" → "charades" (say "hint" for clues) → earn coins
4. "Play quiz" or "play memory" → earn more coins
5. "Go shopping" → "yes" to buy food → "no" to leave
6. "Feed Biscuit" again, then "stop"
7. Relaunch → "Welcome back", with the pet's current mood

"Menu" returns to the main menu from anywhere, "help" explains the loop, and "stop" exits.

## Layout

- `src/components/` – conversation flow (first-time setup, main menu, feed, shop, minigames)
- `src/util/pet.ts` – pet state: hunger, happiness, coins, food, decay over time
- `src/apl/` – screens for devices with a display
- `copy/minigames/` – quiz questions, charades clues, memory animals
- `models/en.json` – voice model
- `test/` – unit tests (`npm test`)
