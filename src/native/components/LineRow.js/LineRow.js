import React from 'react';
import PropTypes from 'prop-types';

import {
  LineContainer,
  LineContent,
  LineText,
  LineNumber,
  NumberContent,
} from '../../Home/HomeView.style';

const LineRow = ({
  item, index, navigation,
}) => {
  const nameA = item.nameA.split().length === 1 ? item.nameA.trim() : item.nameA;

  return (
    <LineContainer key={`line-${item.line}-${index}`} isEvent={index % 2} onPress={() => navigation.navigate('DirectionLine', { line: item.line, headerA: nameA, headerB: item.nameB })}>
      <NumberContent>
        <LineNumber>
          {item.label}
        </LineNumber>
      </NumberContent>
      <LineContent>
        <LineText numbersOfLine={2}>
          {`${nameA} - ${item.nameB}`}
        </LineText>
      </LineContent>
    </LineContainer>
  );
};

LineRow.defaultProps = {
  index: 0,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

LineRow.propTypes = {
  item: PropTypes.shape({
    label: PropTypes.string,
    nameA: PropTypes.string,
    nameB: PropTypes.string,
    line: PropTypes.string,
  }).isRequired,
  index: PropTypes.number,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

export default LineRow;
