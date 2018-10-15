export const convertLineNumber = (numberLine) => {
  if (numberLine >= 500 && numberLine < 600) {
    return `N${parseInt(numberLine.substring(3, 1), 10)}`;
  }
  if (numberLine >= 600 && numberLine < 700) {
    return `M${parseInt(numberLine.substring(3, 2), 10)}`;
  }
  if (numberLine >= 700 && numberLine < 800) {
    return `SE${parseInt(numberLine.substring(3, 1), 10)}`;
  }
  return parseInt(numberLine, 10);
};
