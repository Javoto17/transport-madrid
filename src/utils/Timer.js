export const getTime = (time) => {
  if (time >= 1200) {
    return '>20';
  }
  if (time === 0) {
    return '>>';
  }
  return ((time % 3600) / 60).toFixed();
};
