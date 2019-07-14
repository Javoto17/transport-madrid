export const getTime = (time) => {
  const parseTime = parseInt(time, 10);

  if (parseTime >= 1200) {
    return '>20 min';
  }
  if (parseTime === 0) {
    return '>>';
  }
  return `${((parseTime % 3600) / 60).toFixed()} min`;
};
