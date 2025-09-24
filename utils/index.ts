export const formatTime = (seconds: number): string => {
  const minutes = String(Math.floor(seconds / 60)); // 2.7 -> 2
  const remainingSeconds = String(seconds % 60).padStart(2, "0"); // 3 -> 03
  return `${minutes}:${remainingSeconds}`;
};
