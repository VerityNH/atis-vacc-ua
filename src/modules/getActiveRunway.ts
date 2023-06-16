export const getActiveRunway = (
  runways: { name: string; heading: number }[],
  windDir: number,
): string => {
  let minDifference: number = Infinity;
  let activeRunway: string;

  runways.forEach((runway) => {
    let difference = Math.abs(runway.heading - windDir);
    if (difference > 180) {
      difference = 360 - difference;
    }

    if (difference < minDifference) {
      minDifference = difference;
      activeRunway = runway.name;
    }
  });

  return activeRunway;
};
