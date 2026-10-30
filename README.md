# The Library of Little Universes

A personal birthday website for Rakshi, made by Ram Kumar. Seven rooms, one continuous dawn sky, and a lot to read, play, and explore. It is a static frontend with no backend.

Stack: React, Vite, JavaScript (JSX), Tailwind CSS v4, Framer Motion, React Router, Lucide React.

## How it works

The whole site is one sky world. A fixed background of clouds, floating islands, a hazy castle, and a sun stays on screen, and the camera flies between rooms when you change chapter. The sun rises a little in every room and fully comes up in the finale. Each chapter is a series of full-screen scenes you scroll through.

## The seven rooms

| Room | Route | What is in it |
| --- | --- | --- |
| 1. The Infinite Library | `/` | Opening book, seven floating islands, a scroll walkthrough of every room, twelve library rules, twelve little universes, a year-long almanac, a searchable card catalogue of 36 imaginary books, and a library card with 15 stamps |
| 2. The Archive of Us | `/archive` | Five memory scenes, a sealed bonus memory, twelve flip cards of things the archive believes |
| 3. The Artist's Observatory | `/art` | A dark gallery with a cursor-following light, an essay on looking at a drawing, a deck of 16 sketch prompts, and notes |
| 4. The Department of Songs & Stories | `/songs` | The soundtrack, the sealed "A song from Ram" envelope, nine stories including a ten-chapter serial, and eight poems |
| 5. The Hall of Little Puzzles | `/puzzles` | Eight riddle doors, a "which room are you" quiz, a matching game, and a forty-fortune book |
| 6. The Wishing Tower | `/tower` | Wishes that rise as lanterns, a constellation builder, and eight letters from the library |
| 7. The Unwritten Chapter | `/unwritten` | A star map, the letter, twelve wishes, and a sunrise finale with the library card |

The library card tracks 15 stamps for things she does: entering, opening memories, viewing artwork, finishing stories, reading poems, solving riddles, taking the quiz, winning the match game, drawing a fortune, sending a wish, naming a constellation, choosing a song, finding the hidden book, and opening the letter. Progress stays in her own browser.

There is a lot of text and several interactive things. Finishing everything takes a long while, and that is on purpose.

## The soundtrack: "august", "cardigan", and "You're On Your Own, Kid"

Commercial songs cannot be bundled into the site, and their lyrics are not included anywhere. The soundtrack uses the official Spotify player instead, which carries the licensing.

By default, each song shows buttons that open it on Spotify or search for it on YouTube. To play a song inside the site, with the player staying open as she moves between rooms:

1. In Spotify, open the song, choose Share, then copy the song link. It looks like `https://open.spotify.com/track/ABC123...`.
2. Copy the part after `/track/` and before any `?`. That is the track ID.
3. Open `src/data/soundtrack.js`. In each `track(...)` line, paste the ID into the empty quotes after the mood text, for example `track('august', 'august', 'folklore', '...mood text...', 'ABC123', '')`.
4. Save and refresh.

The player only loads after she chooses a song, and nothing plays until she presses play. Browsers do not allow sound to start on its own, and the site never tries to. Spotify's embedded player may play only previews if she is not logged in to Spotify.

Opening “A song from Ram” in room 4 reveals a note: “I am always ready to sing for you at any time” 👀.

## Run it locally

You need Node.js 20 or newer.

```bash
npm install
npm run dev
```

Open the address Vite prints (usually http://localhost:5173).

Check the production build:

```bash
npm run build
npm run preview
```

## Where to change things

All personal content lives in `src/data`.

| File | What it controls |
| --- | --- |
| `site.js` | Title, subtitle, names, birthday, and `showSetupNotes` |
| `memories.js` | The five memory scenes and the bonus memory |
| `artwork.js` | The gallery and the observatory notes |
| `soundtrack.js` | The three songs, their mood notes, and the Spotify IDs |
| `songs.js` | The envelope title |
| `stories.js` | The nine stories, including the ten-chapter serial |
| `poems.js` | The eight poems |
| `letter.js` | The letter and the closing lines |
| `letters.js` | The eight letters from the library |
| `wishes.js` | The twelve wishes in the finale |
| `riddles.js`, `quiz.js`, `fortunes.js` | The puzzle content |
| `rules.js`, `universes.js`, `almanac.js`, `catalogue.js`, `scenes.js` | Library page content |
| `beliefs.js`, `essay.js`, `prompts.js` | Archive and observatory content |
| `secrets.js` | The hidden book clue and accepted answers |
| `chapters.js`, `stamps.js` | Room names, blurbs, island colours, and stamp text |

Most of the long-form text (stories, poems, riddles, almanac, catalogue, letters, essay, fortunes, beliefs, wishes except the letter) was written as sample content. Read all of it and change anything that does not sound like you. The letter and the five memory captions use your own wording. Nothing in the site states what CR stands for.

### Hide the setup notes before sending

Some placeholders show a short note about how to replace them. Before you share the link, open `src/data/site.js` and set:

```js
showSetupNotes: false
```

## Adding your own media

Put files in `public/` and refer to them by a path that starts with `/`. Missing files never break a page; a placeholder is shown instead.

- **Memory photos or videos:** the five memory images are already in `public/images/memories/` and set in `src/data/memories.js`. Each memory can also carry an `aspect` (for example `'16 / 9'`) and `fit: 'contain'` so nothing gets cropped. To add a video, put it in `public/videos/` and set `video`.
- **Rakshi's drawings:** five drawings are already in `public/images/artwork/` and listed in `src/data/artwork.js`. To add more, copy the image there and add an entry with `id`, `title`, `caption`, `src`, and `alt`. Only use drawings she has agreed to share. Images are shown whole, never cropped.

## Secret interactions

- **The hidden book** sits near the library card at the bottom of the first page. The default clue accepts `CR`. Change the clue and answers in `src/data/secrets.js` to something only the two of you would know. Answers are checked in the browser and never sent anywhere.
- **The bonus memory** unlocks in the Archive after all five memories have been opened. Edit it under `bonusMemory` in `src/data/memories.js`.

## Progress and privacy

The site remembers visited rooms, opened memories, finished stories, solved riddles, stamps, her wishes, and her constellation. All of it is stored in `localStorage` in that browser and never leaves the device. "Start the journey over" at the bottom of the first page clears the progress.

## Accessibility and motion

- Semantic headings, a skip link, visible focus rings, and keyboard access for every control.
- Dialogs trap focus, close with Escape or the close button, and return focus to what opened them.
- The artwork viewer also responds to the left and right arrow keys.
- With reduced motion turned on, the sky stops flying between rooms, the scroll walkthrough becomes a plain list, and animations are cut to near zero.
- The letter can be opened immediately from the star map. She never has to wait for an animation.

## Copyright

The design is original: no logos, house crests, character art, film stills, album covers, or lyrics. Keep it that way if you add your own media.

## Deploy for free on Vercel

You need a free GitHub account and a free Vercel account.

### 1. Put the project on GitHub

1. Create a new empty repository on github.com (for example `library-of-little-universes`). Keep it private if you prefer.
2. In the project folder, run:

```bash
git init
git add .
git commit -m "The Library of Little Universes"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/library-of-little-universes.git
git push -u origin main
```

### 2. Import it into Vercel

1. Sign in at vercel.com with GitHub.
2. Choose **Add New**, then **Project**, and select the repository.
3. Vercel detects Vite. Confirm:
   - Build command: `npm run build`
   - Output directory: `dist`
4. Choose **Deploy**.

`vercel.json` already rewrites every path to `index.html`, so direct links such as `/archive` and refreshes work.

### 3. After the first deploy

Open the live address and test every room on your phone before you share it. Any later `git push` to `main` redeploys automatically.

Vercel's free Hobby plan has usage limits and terms that can change. Check them on vercel.com. A site like this stays well within normal limits.

## Final checklist before sending the link

- [ ] Spotify IDs pasted into `src/data/soundtrack.js` and each song tested
- [ ] Open the “A song from Ram” envelope and check that its note appears
- [ ] The five memory photos reviewed, especially the placement poster, which shows full names, the college, and the package figure
- [ ] Rakshi has said yes to her five drawings being shown, and the titles and captions in `src/data/artwork.js` suit you
- [ ] All sample text read and edited to sound like you: stories, poems, riddles, almanac, catalogue, letters, essay, fortunes, beliefs, wishes
- [ ] The letter in `src/data/letter.js` read one last time
- [ ] Hidden book clue and answers changed to something personal
- [ ] `showSetupNotes` set to `false`
- [ ] `npm run build` passes
- [ ] Deployed site tested on a phone and a laptop, including a refresh on `/unwritten`
