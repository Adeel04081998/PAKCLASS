import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Picker
} from 'react-native';
import {BaseStyle, BaseColor, useTheme} from '@config';
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  Button,
  BookingTime,
  TextInput,
} from '@components';
import Modal from 'react-native-modal';
import styles from './styles';
import {useTranslation} from 'react-i18next';

export default function Search({navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });

  const [keyword, setKeyword] = useState('');
  const [adult, setAdult] = useState(1);
  const [children, setChildren] = useState(1);
  const [night, setNight] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  /**
   * call when action modal
   * @param {*} modal
   */
  const openModal = modal => {
    setModalVisible(modal);
  };

  /**
   * call when on change value
   * @param {*} mode
   * @param {*} value
   */
  const setValue = (mode, value) => {
    switch (value) {
      case 'adult':
        if (mode == 'up') {
          setAdult(adult + 1);
        } else {
          setAdult(adult - 1 > 0 ? adult - 1 : 0);
        }
        break;
      case 'children':
        if (mode == 'up') {
          setChildren(children + 1);
        } else {
          setChildren(children - 1 > 0 ? children - 1 : 0);
        }
        break;
      case 'night':
        if (mode == 'up') {
          setNight(night + 1);
        } else {
          setNight(night - 1 > 0 ? night - 1 : 0);
        }
        break;
    }
  };

  /**
   * render UI modal
   * @returns
   */


  return (
    <View style={{flex: 1}}>
      <Header
        title={t('search')}
        renderLeft={() => {
          return <Icon name="arrow-left" size={20} color={colors.primary} />;
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={['right', 'left', 'bottom']}>
        

        <KeyboardAvoidingView
          behavior={Platform.OS === 'android' ? 'height' : 'padding'}
          keyboardVerticalOffset={offsetKeyboard}
          style={{flex: 1}}>
          <ScrollView contentContainerStyle={{padding: 20}}>
            <TextInput
              onChangeText={text => setKeyword(text)}
              placeholder={t('what are you looking for ?')}
              value={keyword}
            />
            <TextInput
              style={{marginTop: 15}}
              onChangeText={text => setKeyword(text)}
              placeholder={t('where is your location ?')}
              value={keyword}
            />
          </ScrollView>
          <View style={{paddingHorizontal: 20, paddingVertical: 15}}>
            <Button
              full
              onPress={() => {
                setLoading(true);
                setTimeout(() => {
                  navigation.navigate('Hotel');
                  setLoading(false);
                }, 500);
              }}
              loading={loading}>
              {t('Find')}
            </Button>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
