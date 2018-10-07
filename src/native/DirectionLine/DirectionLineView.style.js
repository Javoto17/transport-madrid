import styled from 'styled-components';

export const LineContainer = styled.TouchableOpacity`
    flexDirection: row;
    height: 73px;
    backgroundColor: #ffffff;
    alignItems:center;
    paddingHorizontal: 8;
`;

export const LineContent = styled.View`
`;
export const LineText = styled.Text`
    color: #4c4c4c; 
    fontSize: 16px;
    fontFamily: 'nunito-bold';
`;

export const DirectionContainer = styled.TouchableOpacity`
    flexDirection: row;
    height: 73px;
    backgroundColor: #ffffff;
    borderBottomWidth: 2;
    borderBottomColor: #fafbfd;
    alignItems:center;
    paddingHorizontal: 8;
    justifyContent:space-between;
`;
