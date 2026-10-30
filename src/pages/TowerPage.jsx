import ChapterHeader from '../components/ChapterHeader.jsx'
import ConstellationMaker from '../components/ConstellationMaker.jsx'
import LetterShelf from '../components/LetterShelf.jsx'
import NextScene from '../components/NextScene.jsx'
import Shot from '../components/Shot.jsx'
import WishWriter from '../components/WishWriter.jsx'

export default function TowerPage() {
  return (
    <div>
      <ChapterHeader id="tower">
        Write a wish and watch it rise, then place a few stars of your own.
      </ChapterHeader>
      <Shot className="items-center">
        <WishWriter />
      </Shot>
      <Shot className="items-center">
        <ConstellationMaker />
      </Shot>
      <Shot className="items-center">
        <LetterShelf />
      </Shot>
      <NextScene id="tower" />
    </div>
  )
}
