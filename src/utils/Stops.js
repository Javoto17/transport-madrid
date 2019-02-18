export const convertLineNumber = (numberLine) => {
  if (numberLine === 68) {
    return 'C1';
  }
  if (numberLine === 69) {
    return 'C2';
  }
  if (numberLine >= 400 && numberLine < 500) {
    return `E${parseInt(numberLine.substring(3, 1), 10)}`;
  }
  if (numberLine >= 500 && numberLine < 600) {
    return `N${parseInt(numberLine.substring(3, 1), 10)}`;
  }
  if (numberLine >= 600 && numberLine < 700) {
    return `M${parseInt(numberLine.substring(3, 2), 10)}`;
  }
  if (numberLine >= 700 && numberLine < 800) {
    return `SE${parseInt(numberLine.substring(3, 1), 10)}`;
  }
  return `${parseInt(numberLine, 10)}`;
};
