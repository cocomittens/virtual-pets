# Pixel Pals

A virtual pet for Alexa, built with [Jovo v4](https://www.jovo.tech). Adopt a dog, cat or
bunny, name it, and keep it full and happy: play minigames to earn coins, spend coins on
food at the shop, and feed your pet. Pets get hungrier and more bored while you are away.

## Run locally

```sh
npm install -g @jovotech/cli
npm install
jovo run        # then press "." to open the Jovo Debugger
```

Local runs save pets to `db/db.json` (delete it to start over as a new user). The
production stage (`src/app.prod.ts`) uses DynamoDB.

After changing `models/en.json`, rebuild and redeploy the Alexa model:

```sh
jovo build:platform alexa
jovo deploy:platform alexa
```

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
