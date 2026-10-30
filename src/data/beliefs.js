export const beliefs = [
  { front: 'A friend is someone you can be quiet with.', back: 'Not every good moment needs a soundtrack. Some of the best ones are just two people in the same row.' },
  { front: 'Showing up beats saying the right thing.', back: 'Presence tends to do more than speeches. Most people remember who stayed, not what was said.' },
  { front: 'Learning is better when it is shared.', back: 'Ideas get sharper when you hand them across a desk and watch what someone else does with them.' },
  { front: 'Good luck is nicer when it is shared.', back: 'Out of hundreds of people, a handful got through. It was better that the handful had company.' },
  { front: 'Inside jokes are tiny, private libraries.', back: 'Two letters can hold an entire shelf of memories that nobody else is able to borrow.' },
  { front: 'Kindness does not need an audience.', back: 'The best help is the kind that was offered quietly and never mentioned again.' },
  { front: 'Curiosity is contagious.', back: 'One person asking a good question tends to start a small chain reaction across the whole row.' },
  { front: 'Being understood is a quiet luxury.', back: 'A look across a room that says everything is worth more than a long paragraph.' },
  { front: 'Friends are allowed to grow in different directions.', back: 'Good friendships are made of two people who keep waving across the distance, whatever the distance is.' },
  { front: 'Encouragement is a form of craft.', back: 'It is shaped slowly, with patience, and it makes whatever you are building a little taller.' },
  { front: 'Small traditions matter.', back: 'The same seat, the same glance, the same running joke. These things keep the days from blurring together.' },
  { front: 'No gift needs a return gift.', back: 'The nicest surprises are the ones given with no expectations attached.' },
].map((item, index) => ({ id: `belief-${index}`, front: item.front, back: item.back }))
