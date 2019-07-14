import React from 'react';
import PropTypes from 'prop-types';
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const SearchHeader = ({ navigation, title }) => {
  const openSearch = navigation.getParam('openSearch');
  const index = navigation.getParam('index');
  const searchStop = navigation.getParam('searchStop');
  const searchValue = navigation.getParam('searchValue');

  return (
    <View
      style={{
        flexDirection: 'row',
        height: Platform.select({ ios: 44, android: 56 }),
        alignItems: 'center',
        backgroundColor: '#ffffff',
        elevation: 0,
        borderBottomWidth: openSearch ? 0 : 0.5,
        borderBottomColor: '#d0d8e8',
      }}
    >
      <View style={{ flex: 0.1 }} />
      <View style={{ flex: 0.8 }}>
        {!openSearch && (
          <Text
            style={{
              fontSize: 24,
              paddingVertical: 10,
              fontFamily: 'nunito-bold',
              textAlign: Platform.select({ ios: 'center', android: 'left' }),
              marginLeft: Platform.select({ ios: 0, android: 16 }),
            }}
          >
            {title}
          </Text>
        )}
        {openSearch && (
          <TextInput
            style={{
              height: 36,
              borderColor: '#d0d8e8',
              borderWidth: 1,
              borderRadius: 36 / 2,
              paddingHorizontal: 16,
              marginVertical: 4,
              fontFamily: 'nunito-regular',
              color: '#434343',
            }}
            onChangeText={navigation.getParam('onChangeText')}
            value={searchValue}
            placeholder={
              index === 1 ? 'Línea, Origen, Destino' : 'Código de Parada'
            }
            placeholderTextColor="#d0d8e8"
            autoFocus
            maxLength={50}
            onSubmitEditing={(text) => {
              if (index === 0) {
                searchStop(text);
              }
            }}
            keyboardType={Platform.select({
              ios: index === 0 ? 'number-pad' : 'ascii-capable',
              android: index === 0 ? 'number-pad' : 'default',
            })}
          />
        )}
      </View>
      <View style={{ flex: 0.1 }}>
        {!openSearch && (
          <TouchableOpacity
            onPress={navigation.getParam('changeHeader')}
            style={{
              paddingVertical: 8,
              marginTop: Platform.select({ ios: 4, android: 0 }),
              alignItems: 'center',
            }}
          >
            <FontAwesome name="search" size={18} color="#d0d8e8" />
          </TouchableOpacity>
        )}
        {openSearch && index === 1 && (
          <TouchableOpacity
            onPress={navigation.getParam('changeHeader')}
            style={{ paddingVertical: 8, alignItems: 'center' }}
          >
            <FontAwesome name="times" size={18} color="#027bff" />
          </TouchableOpacity>
        )}
        {openSearch && index === 0 && (
          <TouchableOpacity
            onPress={searchStop}
            style={{ paddingVertical: 8, alignItems: 'center' }}
          >
            <FontAwesome name="search" size={18} color="#027bff" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

SearchHeader.defaultProps = {
  navigation: null,
  title: null,
};

SearchHeader.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
  }),
  title: PropTypes.string,
};

export default SearchHeader;
