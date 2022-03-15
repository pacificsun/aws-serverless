export function getLevelNumber(level) {
  let levelNumber = 0;
  switch (level) {
    case 'Beginner':
      levelNumber = 1;
      break;

    case 'Improver':
      levelNumber = 2;
      break;

    case 'Intermediate':
      levelNumber = 3;
      break;

    case 'Semi-Advance':
    case 'Semi-advance':
      levelNumber = 4;
      break;

    case 'Advance':
      levelNumber = 5;
      break;

    case 'Professional':
      levelNumber = 6;
      break;

    default:
      levelNumber = 0;
      break;
  }

  return levelNumber;
}
