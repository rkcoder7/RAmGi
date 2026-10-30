export const quizRooms = {
  archive: { title: 'The Archive', text: 'You are a keeper of moments. You remember the small things: the day, the weather, the exact way something was said. People trust you with their stories because you handle them carefully.' },
  observatory: { title: 'The Observatory', text: 'You are a noticer. You catch the details others miss, and you are happiest when you have time to look closely at something. Your talent is patience, and it shows in everything you make.' },
  listening: { title: 'The Listening Room', text: 'You feel things through sound. A song can change your whole afternoon, and you know the exact track for any mood. People come to you for recommendations they did not know they needed.' },
  nook: { title: 'The Reading Nook', text: 'You are a wanderer in stories. Given a free hour, you would happily disappear into somebody else’s world and come back with something to say. You are curious, and your curiosity is the best part of you.' },
}

export const quiz = {
  title: 'Which room of the library are you?',
  questions: [
    { text: 'You have a free afternoon. What sounds best?', options: [{ text: 'Looking through old photos and notes', room: 'archive' }, { text: 'Sketching something until it looks right', room: 'observatory' }, { text: 'Making a playlist for no reason', room: 'listening' }, { text: 'Starting a new book', room: 'nook' }] },
    { text: 'Which sound is the most comforting?', options: [{ text: 'A drawer sliding shut', room: 'archive' }, { text: 'A pencil on paper', room: 'observatory' }, { text: 'The first notes of a favourite song', room: 'listening' }, { text: 'A page being turned', room: 'nook' }] },
    { text: 'A friend asks for advice. You usually…', options: [{ text: 'Remember a similar story from before', room: 'archive' }, { text: 'Ask a question that makes them look closer', room: 'observatory' }, { text: 'Find them a song that fits', room: 'listening' }, { text: 'Recommend a book', room: 'nook' }] },
    { text: 'Pick a window seat.', options: [{ text: 'Looking over a quiet courtyard', room: 'archive' }, { text: 'Looking up at a night sky', room: 'observatory' }, { text: 'Next to a record player', room: 'listening' }, { text: 'Under a reading lamp', room: 'nook' }] },
    { text: 'Which object would you rather keep?', options: [{ text: 'A box of letters', room: 'archive' }, { text: 'A perfectly sharpened pencil', room: 'observatory' }, { text: 'A well-worn pair of headphones', room: 'listening' }, { text: 'A dog-eared paperback', room: 'nook' }] },
    { text: 'What is your ideal kind of quiet?', options: [{ text: 'Thinking back over the week', room: 'archive' }, { text: 'Focusing on one small task', room: 'observatory' }, { text: 'Music at a low volume', room: 'listening' }, { text: 'A good story and a warm drink', room: 'nook' }] },
    { text: 'If the library had one more room, it would be…', options: [{ text: 'A room for keepsakes', room: 'archive' }, { text: 'A room for sketches in progress', room: 'observatory' }, { text: 'A room for live music', room: 'listening' }, { text: 'A room for stories that have no ending', room: 'nook' }] },
  ],
}
