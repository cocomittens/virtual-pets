# Customize flow – notes for re-implementing

The Customize feature was removed from the skill because it was only a placeholder. This
file records what existed and what was planned, so it can be rebuilt. The removed code is
still in git history: the last commit that contains it is `60ad35b`
(`git show 60ad35b:src/components/menu/customize/Customize.ts`).

## Intended design

From the original flow (`flowchart.md`): the main menu offers three actions – minigame,
feed, and **customize pet**. Customize was meant to let the player change how the pet looks,
using items bought in the shop.

- Art already in the repo: `img/accessories.png` (accessories menu tile) and
  `img/changeSpecies.png` (suggests a "change species" option alongside accessories).
- The shop (`src/components/menu/Shopping.ts`) currently sells only food. The plan was for
  it to also sell accessories for coins, which Customize would then equip.
- Strings drafted in the removed `locales/messages.po`: "Pet Supply Store", "Buy this item?",
  "You don't have enough coins".

## What the removed code did

**`src/components/menu/customize/Customize.ts`** (Jovo component)
- `START`: hard-coded list of 4 items (`item 1` … `item 4`), page size 3. Stored
  `{ page: 0, numPages }` in session data and spoke the first page's item names.
- `prevPage` (`PreviousIntent`) / `nextPage` (`NextIntent`): moved `page` down/up within
  bounds, but did not speak anything afterwards.
- Reached from the main menu via `CustomizeIntent`.

**`src/apl/customize.tsx`** (screen)
- `customize(items: { img, name }[])`: a "next" arrow button, the items (each a 20vw image
  with its name underneath), and a "previous" arrow button. Buttons sent a `SendEvent`
  with the placeholder argument `'Button was pressed'`.

**Voice model (`models/en.json`)**
- `CustomizeIntent`: "customize", "customize pet", "customize my pet", "change pet",
  "change my pet".
- Built-ins `AMAZON.NextIntent` and `AMAZON.PreviousIntent` were declared for paging.

## Known gaps to fix when rebuilding

- Paging never worked by voice: the handlers listened for `NextIntent` / `PreviousIntent`,
  but Alexa sends `AMAZON.NextIntent` / `AMAZON.PreviousIntent`. Map them in the
  `intentMap` in `src/app.ts`.
- After changing page, re-read the items for the new page.
- The component overwrote the whole session data object; use a namespaced key instead
  (e.g. `this.$session.data.customize`), like the minigames do.
- Screen button presses (`Alexa.Presentation.APL.UserEvent`) were never handled.
- The arrow and coin icons (`assets/icons/next.png`, `prev.png`, `back.png`, `money.png`
  in the `pixel-pet-paradise` S3 bucket) are not publicly readable, so they do not load.

## Suggested shape

1. Add `accessories: string[]` (owned) and `wearing?: string` to `Pet` in `src/util/pet.ts`.
2. Sell accessories in the shop; add an `Accessory` entity type to the voice model.
3. Customize: list owned accessories 3 at a time with next/previous, "wear the {accessory}"
   to equip, and show the result on the main menu screen.
4. Mention customize in the main menu prompt and help text again.

## Other unused screens removed at the same time

All were unreferenced drafts under `src/apl/` (also recoverable from `60ad35b`):

- `tutorial/choosePet.tsx` + `components/scenes/selectThree.tsx` – a "pick one of three"
  screen showing the bunny, cat and dog with names, for the adoption step.
- `minigames/results.tsx` + `components/button.tsx` – an end-of-game screen showing XP and
  money earned with a "Play Again" button.
- `minigames/charades.json` (title, 30-second timer text, score), `minigames/memory.json`,
  `minigames/quiz.json` – title-only screens for each minigame.
- `title.json` – full-screen title image. `upsell.json` – a coin icon, for a planned upsell.
- The nav bar (`components/navBar.tsx`, still in use) supports a back button on the left
  that no screen uses yet.
