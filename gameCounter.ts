const TIMESTAMPS_COUNT = 50000;
const PROBABILITY_SCORE_CHANGED = 0.0001;
const PROBABILITY_HOME_SCORE = 0.45;
const OFFSET_MAX_STEP = 3;

type Score = {
  home: number;
  away: number;
};

type Stamp = {
  offset: number;
  score: Score;
};

const emptyScoreStamp: Stamp = {
  offset: 0,
  score: {
    home: 0,
    away: 0,
  },
};

export const generateStamps = (): Stamp[] => {
  const scoreStamps = Array(TIMESTAMPS_COUNT)
    .fill(emptyScoreStamp)
    .map(
      ((acc) => () => {
        const scoreChanged = Math.random() > 1 - PROBABILITY_SCORE_CHANGED;
        const homeScoreChange =
          scoreChanged && Math.random() < PROBABILITY_HOME_SCORE ? 1 : 0;
        const awayScoreChange = scoreChanged && !homeScoreChange ? 1 : 0;
        return {
          offset: (acc.offset +=
            Math.floor(Math.random() * OFFSET_MAX_STEP) + 1),
          score: {
            home: (acc.score.home += homeScoreChange),
            away: (acc.score.away += awayScoreChange),
          },
        };
      })(emptyScoreStamp)
    );

  return scoreStamps;
};

export const getScore = (gameStamps: Stamp[], offset: number): Score => {
  // Создаю объект для сохранения значений на момент оффсета
  let score: Score = {
    home: 0,
    away: 0,
  };

  for (const stamp of gameStamps) {
    if (stamp.offset > offset) {
        break;
    }
    
    score = stamp.score;
  }

  return score;
};
