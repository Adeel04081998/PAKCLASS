import React, {useState} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {BaseStyle, useTheme} from '@config';
import {Header, SafeAreaView, Icon, Text} from '@components';
import styles from './styles';
import {useTranslation} from 'react-i18next';

export default function Currency({navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();

  const [loading, setLoading] = useState(false);
  const [currency, setCurrency] = useState([
    {id: '1', currency: 'Mobiles' },
    {id: '2', currency: 'Tablets'},
    {id: '3', currency: 'Accessories'},
    {id: '4', currency: 'Others'}
  ]);

  /**
   * @description Called when setting currency is selected
   * @author Passion UI <passionui.com>
   * @date 2019-08-03
   * @param {object} select
   */


  /**
   * @description Load item one by one
   * @author Passion UI <passionui.com>
   * @date 2019-08-03
   * @param {*} item
   * @param {*} index
   * @returns
   */
  const renderItem = (item, index) => {
    return (
      <TouchableOpacity
        style={[styles.item, {borderBottomColor: colors.border}]}
        onPress={() => {
          navigation.navigate('Tour');
        }}
        >
        <Text
          body1
          style={
            item.checked
              ? {
                  color: colors.primary,
                }
              : {}
          }>
          {item.currency}
        </Text>
       
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1}}>
      <Header
        title={t('Select Category')}
        renderLeft={() => {
          return (
            <Icon
              name="arrow-left"
              size={20}
              color={colors.primary}
              enableRTL={true}
            />
          );
        }}
        
        onPressLeft={() => {
          navigation.goBack();
        }}
        onPressRight={() => {
          setLoading(true);
          setTimeout(() => {
            navigation.goBack();
          }, 500);
        }}
      />
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={['right', 'left', 'bottom']}>
        <View style={styles.contain}>
          <View style={{width: '100%', height: '100%'}}>
            <FlatList
              data={currency}
              keyExtractor={(item, index) => item.id}
              renderItem={({item, index}) => renderItem(item, index)}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
