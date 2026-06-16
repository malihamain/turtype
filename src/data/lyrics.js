export const lyrics = [
  {
    artist: "Traditional",
    title: "Amazing Grace",
    line: "Amazing grace how sweet the sound that saved a wretch like me"
  },
  {
    artist: "Traditional",
    title: "Twinkle Twinkle Little Star",
    line: "Twinkle twinkle little star how I wonder what you are"
  },
  {
    artist: "Traditional",
    title: "Row Row Row Your Boat",
    line: "Row row row your boat gently down the stream"
  },
  {
    artist: "Traditional",
    title: "London Bridge Is Falling Down",
    line: "London Bridge is falling down falling down falling down"
  },
  {
    artist: "Traditional",
    title: "Baa Baa Black Sheep",
    line: "Baa baa black sheep have you any wool"
  },
  {
    artist: "Traditional",
    title: "This Little Light of Mine",
    line: "This little light of mine I'm going to let it shine"
  },
  {
    artist: "Traditional",
    title: "Scarborough Fair",
    line: "Are you going to Scarborough Fair parsley sage rosemary and thyme"
  }
];

export function getRandomLyricLine() {
  if (!Array.isArray(lyrics) || lyrics.length === 0) {
    return {
      artist: "Unknown",
      title: "Untitled",
      line: "type type type keep typing to the end"
    };
  }
  const index = Math.floor(Math.random() * lyrics.length);
  return lyrics[index];
}

export function getRandomLyricPassage(minWords = 30) {
  const base = getRandomLyricLine();
  const parts = base.line.trim().split(/\s+/);
  if (parts.length >= minWords) {
    return {
      artist: base.artist,
      title: base.title,
      line: base.line
    };
  }
  const words = [];
  while (words.length < minWords) {
    words.push(...parts);
  }
  const final = words.slice(0, minWords).join(" ");
  return {
    artist: base.artist,
    title: base.title,
    line: final
  };
}


