import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { FontAwesome } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';

import { LineText, DirectionContainer } from './DirectionLineView.style';

class DirectionLineView extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Direccion',
    headerLeft: (
      <View
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16 }}
        >
          <FontAwesome
            name="angle-left"
            style={{ color: '#b0b7c4', fontSize: 30 }}
          />
        </TouchableOpacity>
      </View>
    ),
  });

  constructor(props) {
    super(props);
    this.fetchDirectionLine = props.fetchDirectionLine.bind(this);
    this.navigation = props.navigation;

    this.state = {
      lineNumber: props.navigation.getParam('line'),
    };
  }

  componentDidMount() {
    const { fetchDirectionLine, navigation } = this.props;

    fetchDirectionLine(navigation.getParam('line'));
  }

  renderDirection = (infoLine, direction) => {
    const { navigation } = this.props;
    const { lineNumber } = this.state;
    const directionLine = direction ? 1 : 2;

    if (!infoLine) {
      return null;
    }
    const line = infoLine.Line;

    return (
      <DirectionContainer key={`line-direction-${directionLine}`} onPress={() => navigation.navigate('DetailLine', { lineNumber, directionLine })}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ paddingHorizontal: 4 }}>
            <LineText>
              {`${direction && line ? line.headerA : line.headerB}`}
            </LineText>
          </View>
          <View style={{ paddingHorizontal: 4, alignItems: 'center' }}>
            <FontAwesome
              name="long-arrow-right"
              size={20}
              style={{ color: '#027bff' }}
            />
          </View>
          <View style={{ paddingHorizontal: 4 }}>
            <LineText>
              {`${direction && line ? line.headerB : line.headerA}`}
            </LineText>
          </View>
        </View>
        <View>
          <FontAwesome
            name="angle-right"
            size={26}
            style={{ color: '#027bff' }}
          />
        </View>
      </DirectionContainer>
    );
  };

  render() {
    const { directionLine } = this.props;

    return (
      <View style={{ flex: 1, backgroundColor: '#fafbfd' }}>
        <View>
          {
            this.renderDirection(directionLine, false)
          }
        </View>
        <View>
          {
            this.renderDirection(directionLine, true)
          }
        </View>
      </View>
    );
  }
}

DirectionLineView.defaultProps = {
  fetchDirectionLine: this.fetchDirectionLine,
  directionLine: null,
  navigation: this.navigation,

};

DirectionLineView.propTypes = {
  fetchDirectionLine: PropTypes.func,
  directionLine: PropTypes.shape({
    Line: PropTypes.shape({
      headerA: PropTypes.string,
      headerB: PropTypes.string,
    }),
  }),
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    getParam: PropTypes.func,
  }),
};

export default withNavigation(DirectionLineView);
