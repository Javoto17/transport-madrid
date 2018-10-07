import styled from 'styled-components';

export const BusStopContainer = styled.View`
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
    flex:2;
`;
export const BusStopContentNumber = styled.View`
    paddingHorizontal:4
    alignItems:center;
`;
export const BusStopText = styled.Text`
    color: #4c4c4c; 
    fontSize: 16px;
    paddingVertical: 1 ;
`;

export const BusStopNumber = styled.Text`
    color: #027bff;
    fontSize: 16px;
    fontWeight: 400;
    textAlign:center;
`;

export const SubTextBusStop = styled.Text`
 color: '#99a2b4';
 fontSize: 14;
 paddingVertical: 1;
`;
