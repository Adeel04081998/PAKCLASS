import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import {BaseStyle, BaseColor, useTheme} from '@config';
import {Header, SafeAreaView, Icon, Text} from '@components';
import {TabView, TabBar} from 'react-native-tab-view';
import {useTranslation} from 'react-i18next';
import styles from './styles';
import Booking, {Favourites} from '@screens/Booking';

export default function BookingDetail({navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'Posted Ads', title: t('Posted Ads')},
    {key: 'Favourite Ads', title: t('Favourite Ads')},
  ]);

  // When tab is activated, set what's index value
  const handleIndexChange = index => {
    setIndex(index);
  };

  // Customize UI tab bar
  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={[styles.indicator, {backgroundColor: colors.primary}]}
      style={[styles.tabbar, {backgroundColor: colors.background}]}
      tabStyle={styles.tab}
      inactiveColor={BaseColor.grayColor}
      activeColor={colors.text}
      renderLabel={({route, focused, color}) => (
        <View>
          <Text style={{color}}>{route.title}</Text>
        </View>
      )}
    />
  );

  // Render correct screen container when tab is activated
  const renderScene = ({route, jumpTo}) => {
    switch (route.key) {
      case 'Posted Ads':
        return <PreviewTab jumpTo={jumpTo} navigation={navigation} />;
      case 'Favourite Ads':
        return <ConfirmTab jumpTo={jumpTo} navigation={navigation} />;
    }
  };

  return (
    <View style={{flex: 1}}>
      <Header
        title={t('My Ads')}
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
          navigation.navigate('Home');
        }}
      />
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={['right', 'left', 'bottom']}>
        <TabView
          lazy
          navigationState={{index, routes}}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={handleIndexChange}
        />
      </SafeAreaView>
    </View>
  );
}

/**
 * @description Show when tab Preview activated
 * @author Passion UI <passionui.com>
 * @date 2019-08-03
 * @class PreviewTab
 * @extends {Component}
 */
function PreviewTab({navigation} ) {
  return <Booking navigation={navigation}  />;
}

/**
 * @description Show when tab Confirm activated
 * @author Passion UI <passionui.com>
 * @date 2019-08-03
 * @class PreviewTab
 * @extends {Component}
 */
function ConfirmTab( {navigation}) {
  return <Favourites navigation={navigation}  />;
}
