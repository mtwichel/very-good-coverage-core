export function tellFortune(n: number): string {
  if (n <= 0) {
    return 'This omen is very bad. Expect misfouturne to follow this week.';
  } else if (n > 0 && n <= 20) {
    return 'This means very good fortune for you. True love will find you when the snow falls lightly.';
  } else if (n > 20 && n <= 1000) {
    return 'Your day will be like any other day, no better, nor worse.';
  } else {
    return 'Be warry of pyramid schemes today, as they may seem legitimate but are not good ways to start businesses.';
  }
}
