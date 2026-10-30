import ChapterHeader from '../components/ChapterHeader.jsx'
import FortuneBook from '../components/FortuneBook.jsx'
import MatchGame from '../components/MatchGame.jsx'
import NextScene from '../components/NextScene.jsx'
import RiddleDoors from '../components/RiddleDoors.jsx'
import RoomQuiz from '../components/RoomQuiz.jsx'
import Shot from '../components/Shot.jsx'

export default function PuzzlesPage() {
  return (
    <div>
      <ChapterHeader id="puzzles">
        Riddle doors, a quiz that knows which room you belong in, a matching shelf, and a fortune book.
      </ChapterHeader>
      <Shot className="items-center">
        <RiddleDoors />
      </Shot>
      <Shot className="items-center">
        <RoomQuiz />
      </Shot>
      <Shot className="items-center">
        <MatchGame />
      </Shot>
      <Shot className="items-center">
        <FortuneBook />
      </Shot>
      <NextScene id="puzzles" />
    </div>
  )
}
