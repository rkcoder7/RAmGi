import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { catalogue, genres } from '../data/catalogue.js'

export default function Catalogue() {
  const [query, setQuery] = useState('')
  const [genre, setGenre] = useState('All')

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return catalogue.filter(
      (book) =>
        (genre === 'All' || book.genre === genre) &&
        (!needle || `${book.title} ${book.text} ${book.genre}`.toLowerCase().includes(needle)),
    )
  }, [query, genre])

  return (
    <section aria-labelledby="catalogue-heading" className="mx-auto w-full max-w-6xl">
      <h2 id="catalogue-heading" className="text-center text-[clamp(2.4rem,7vw,5rem)] leading-[1.02] text-ink">
        The card catalogue
      </h2>
      <p className="mx-auto mt-5 max-w-xl text-center font-display text-[1.4rem] italic text-ink/85">
        Thirty-six books that exist only on these shelves. Search, or filter by kind.
      </p>

      <div className="mx-auto mt-10 max-w-xl">
        <label htmlFor="catalogue-search" className="sr-only">
          Search the catalogue
        </label>
        <div className="relative">
          <Search aria-hidden="true" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/60" />
          <input
            id="catalogue-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by title or idea"
            className="min-h-14 w-full rounded-full border border-ink/25 bg-white pl-12 pr-5 text-lg text-ink placeholder:text-ink/45"
          />
        </div>
      </div>

      <div role="group" aria-label="Filter by kind" className="mt-6 flex flex-wrap justify-center gap-2">
        {genres.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={item === genre}
            onClick={() => setGenre(item)}
            className={`min-h-11 rounded-full px-5 text-sm transition ${item === genre ? 'bg-ink text-cream' : 'bg-cream/80 text-ink hover:bg-white'}`}
          >
            {item}
          </button>
        ))}
      </div>

      <p className="mt-6 text-center text-sm text-ink" role="status">
        {results.length === 0 ? 'No books match. Try a different word.' : `${results.length} of ${catalogue.length} books shown`}
      </p>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence initial={false}>
          {results.map((book) => (
            <motion.li
              key={book.id}
              layout
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl bg-cream p-5 shadow-[0_18px_40px_-24px_rgba(42,37,82,0.5)]"
            >
              <span className="text-xs text-gold-deep">{book.genre}</span>
              <h3 className="mt-1 text-[1.6rem] leading-tight text-ink">{book.title}</h3>
              <p className="mt-2 font-display text-[1.2rem] leading-snug text-ink-soft">{book.text}</p>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </section>
  )
}
