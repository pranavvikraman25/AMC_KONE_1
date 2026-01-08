/*
  Simple time tracking utility
  Used for maintenance session analysis
*/

export function createTimeTracker() {
  let startTime = null;
  let totalSeconds = 0;
  let stationarySeconds = 0;
  let interval = null;

  const start = () => {
    startTime = Date.now();
    interval = setInterval(() => {
      totalSeconds += 1;
    }, 1000);
  };

  const stop = () => {
    clearInterval(interval);
    interval = null;
  };

  const addStationarySecond = () => {
    stationarySeconds += 1;
  };

  const reset = () => {
    clearInterval(interval);
    startTime = null;
    totalSeconds = 0;
    stationarySeconds = 0;
  };

  const getSummary = () => ({
    totalTime: totalSeconds,
    stationaryTime: stationarySeconds,
    efficiency:
      totalSeconds > 0
        ? Math.round(
            (stationarySeconds / totalSeconds) * 100
          )
        : 0,
  });

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}m ${sec}s`;
  };

  return {
    start,
    stop,
    reset,
    addStationarySecond,
    getSummary,
    formatTime,
  };
}
