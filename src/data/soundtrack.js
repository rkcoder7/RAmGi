const query = (title) => encodeURIComponent(`${title} Taylor Swift`)

const track = (id, title, album, mood, spotifyId, youtubeId) => ({
  id,
  title,
  album,
  mood,
  spotifyId,
  youtubeId,
  spotifyUrl: `https://open.spotify.com/search/${query(title)}`,
  youtubeUrl: `https://www.youtube.com/results?search_query=${query(title)}`,
})

export const soundtrack = [
  track('august', 'august', 'folklore', 'Hazy, golden, and a little wistful. It is the sound of a long late-summer afternoon where the light never quite decides to leave.', '', ''),
  track('cardigan', 'cardigan', 'folklore', 'Soft, warm, and unhurried. It suits a rainy window seat, a good chair, and a pot of tea left to go lukewarm.', '', ''),
  track('kid', 'You’re On Your Own, Kid', 'Midnights', 'Brisk and forward-leaning. It is the song for the first big step on your own, with the quiet knowledge that people are still cheering for you.', '', ''),
]
