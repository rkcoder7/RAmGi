import { artworks, notes } from '../data/artwork.js'
import { site } from '../data/site.js'
import ArtworkGallery from '../components/ArtworkGallery.jsx'
import ChapterHeader from '../components/ChapterHeader.jsx'
import EssaySection from '../components/EssaySection.jsx'
import NextScene from '../components/NextScene.jsx'
import PromptDeck from '../components/PromptDeck.jsx'
import Reveal from '../components/Reveal.jsx'
import Shot from '../components/Shot.jsx'
import SpotlightField from '../components/SpotlightField.jsx'

export default function ArtistPage() {
  return (
    <div>
      <ChapterHeader id="observatory">
        Some people see the world. You notice the details that make it worth drawing.
      </ChapterHeader>

      <Shot className="items-center" dark>
        <div className="on-dark mx-auto w-full max-w-7xl rounded-[2.5rem] bg-gradient-to-b from-dusk to-dusk-deep px-4 pb-20 pt-16 text-cream shadow-[0_40px_90px_-30px_rgba(23,28,69,0.8)] sm:px-10">
          <h2 className="text-center text-[clamp(2.4rem,7vw,5rem)] leading-[1.02]">The gallery after dark</h2>
          <p className="mx-auto mt-5 max-w-xl text-center font-display text-[1.4rem] italic text-cream/85">
            Step into the dark room. Move the light across the walls to find each frame.
          </p>
          <SpotlightField>
            <ArtworkGallery artworks={artworks} />
          </SpotlightField>
          {site.showSetupNotes && (
            <aside className="mx-auto mt-14 max-w-2xl rounded-xl border border-dashed border-cream/40 p-5 text-sm text-cream/85">
              <p className="font-medium text-gold">Before sending</p>
              <p className="mt-2">
                Only add drawings that {site.recipient} has said you can use, and keep the original files unedited. Put the images in
                public/images/artwork and list them in src/data/artwork.js. Set showSetupNotes to false in src/data/site.js to remove this note.
              </p>
            </aside>
          )}
        </div>
      </Shot>

      <Shot className="items-center">
        <EssaySection />
      </Shot>

      <Shot className="items-center">
        <PromptDeck />
      </Shot>

      <Shot className="items-center">
        <section aria-label="Notes from the observatory" className="mx-auto grid w-full max-w-5xl gap-16">
          {notes.map((note, index) => (
            <Reveal
              key={note}
              as="p"
              x={index % 2 === 0 ? -60 : 60}
              y={0}
              className={`max-w-xl font-display text-[clamp(1.9rem,5vw,3.2rem)] leading-tight text-ink ${index % 2 === 0 ? 'mr-auto' : 'ml-auto text-right'}`}
            >
              {note}
            </Reveal>
          ))}
        </section>
      </Shot>

      <NextScene id="observatory" />
    </div>
  )
}
