import styled from 'styled-components';

export const LineContainer = styled.TouchableOpacity`
    flexDirection: row;
    height: 73px;
    backgroundColor: ${(props) => {
    const { isEvent } = props;
    return isEvent ? '#fafbfd' : '#ffffff';
  }};
    alignItems:center;
    paddingHorizontal: 2;
    flexDirection:row;
`;

export const LineContent = styled.View`
    flex:.82;
`;

export const NumberContent = styled.View`
    flex:.18;
`;
export const LineText = styled.Text`
    color: #4c4c4c; 
    fontSize: 16px;
    fontWeight: bold;
    fontFamily: 'nunito-bold';

`;
export const LineNumber = styled.Text`
    color: #027bff;
    fontSize: 16px;
    fontWeight: 500;
    textAlign:center;
    fontFamily: 'nunito-bold';
`;
