export const formatTime = (param) => {
  if(typeof param !== 'number' || param < 0) {
    return null;
  } else {
    let hours = Math.floor(param / 3600);
    let minutes = Math.floor((param / 60) % 60);
    let seconds = Math.floor(param % 60);
    hours = hours.toString().padStart(2, '0');
    minutes = minutes.toString().padStart(2, '0');
    seconds = seconds.toString().padStart(2, '0');
    let totalTime = `${hours}:${minutes}:${seconds}`;
    return totalTime;
  }
};
