import styled from 'styled-components';

export const BusStopContainer = styled.TouchableOpacity`
    flexDirection: row;
    height: 100px;
    backgroundColor: ${(props) => {
    const { isEven } = props;
    return isEven ? '#fafbfd' : '#ffffff';
  }};    
    alignItems:center;
    paddingHorizontal: 8;
`;

export const BusStopContent = styled.View`
    paddingHorizontal:4;
    flex:.6;
`;
export const BusStopContentNumber = styled.View`
    paddingHorizontal: 4;
    alignItems:center;
    flex:.2;
`;
export const BusStopText = styled.Text`
    color: #4c4c4c; 
    fontSize: 16px;
    paddingVertical: 1;
    fontFamily: 'nunito-bold';
`;

export const BusStopNumber = styled.Text`
    color: #027bff;
    fontSize: 16px;
    fontWeight: 500;
    textAlign: center;
    fontFamily: 'nunito-bold';
`;

export const SubTextBusStop = styled.Text`
    color: #99a2b4;
    fontSize: 14px;
    paddingVertical: 1;
    fontFamily: 'nunito-regular';
`;
