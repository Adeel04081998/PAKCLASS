import React, {useState} from 'react';
import {FlatList, RefreshControl, View, TouchableOpacity} from 'react-native';
import {BaseStyle, useTheme} from '@config';
import {Header, SafeAreaView, Icon, Text} from '@components';
import styles from './styles';
import {useTranslation} from 'react-i18next';

export default function More({navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();

  const [refreshing] = useState(false);
  const [screen] = useState([
    {
      screen: 'Currency',
      icon: 'car',
      title: 'Vehicles',
    },
    {
      screen: 'Currency',
      icon: 'home',
      title: 'Property for rent',
    },
    {
      screen: 'Currency',
      icon: 'home',
      title: 'Property for sale',
    },
    {
      screen: 'Currency',
      icon: 'mobile',
      title: 'Mobile Phones',
    },
    {
      screen: 'Currency',
      icon: 'suitcase',
      title: 'Jobs',
    },
    {
      screen: 'Currency',
      icon: 'industry',
      title: 'Business and Industry',
    },
    {
      screen: 'Currency',
      icon: 'newspaper',
      title: 'Classified',
    },
    {
      screen: 'Currency',
      icon: 'laptop',
      title: 'Multimedia',
    },
    {
      screen: 'Currency',
      icon: 'clipboard',
      title: 'Services',
    },
    {
      screen: 'Currency',
      icon: 'calendar',
      title: 'Local Events',
    },
    {
      screen: 'Currency',
      icon: 'graduation-cap',
      title: 'Learning',
    },
    {
      screen: 'Currency',
      icon: 'cat',
      title: 'Pets and Live Stock',
    },
  ]);

  return (
    <View style={{flex: 1}}>
      <Header
        title={t('more')}
        subTitle="Browse by Category "
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
      />
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={['right', 'left', 'bottom']}>
        <FlatList
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingBottom: 10,
          }}
          refreshControl={
            <RefreshControl
              colors={[colors.primary]}
              tintColor={colors.primary}
              refreshing={refreshing}
              onRefresh={() => {}}
            />
          }
          data={screen}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={[styles.item, {borderBottomColor: colors.border}]}
              onPress={() => navigation.navigate(item.screen)}>
              <View style={{flexDirection: 'row'}}>
                <Icon
                  name={item.icon}
                  color={colors.primary}
                  size={18}
                  solid
                  style={{marginHorizontal: 10}}
                />
                <Text body1>{item.title}</Text>
              </View>
              <Icon
                name="angle-right"
                size={18}
                color={colors.primary}
                enableRTL={true}
              />
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
    </View>
  );
}
