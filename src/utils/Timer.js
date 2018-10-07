export const getTime = (time) => {
  if (time >= 1200) {
    return '>20';
  }
  return ((time % 3600) / 60).toFixed();
};
