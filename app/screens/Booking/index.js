import React, {useState} from 'react';
import {FlatList, RefreshControl, View} from 'react-native';
import {BaseStyle, useTheme} from '@config';
import {SafeAreaView, BookingHistory,Favourite} from '@components';
import {BookingHistoryData} from '@data';
import {useTranslation} from 'react-i18next';

export default function Booking({navigation}) {
  const {t} = useTranslation();
  const {colors} = useTheme();

  const [refreshing] = useState(false);
  const [bookingHistory] = useState(BookingHistoryData);

  /**
   * render Item
   *
   * @param {*} item
   * @returns
   */
  const renderItem = item => {
    return (
      <BookingHistory
        name={item.name}
        PostedOn={item.PostedOn}
        Views={item.Views}
        calls={item.calls}
        price={item.price}
        image={item.image}
        Likes={item.Likes}
        style={{paddingVertical: 10, marginHorizontal: 20}}
         onPress={() => navigation.navigate('HotelDetail')}
      />
    );
  };

  /**
   * @description Loading booking item history one by one
   * @author Passion UI <passionui.com>
   * @date 2019-08-03
   * @returns
   */
  return (
    <View style={{flex: 1}}>
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={['right', 'left', 'bottom']}>
        <FlatList
          refreshControl={
            <RefreshControl
              colors={[colors.primary]}
              tintColor={colors.primary}
              refreshing={refreshing}
              onRefresh={() => {}}
            />
          }
          data={bookingHistory}
          keyExtractor={(item, index) => item.id}
          renderItem={({item}) => renderItem(item)}
        />
      </SafeAreaView>
    </View>
  );
}

export  function Favourites({navigation}) {
  const {t} = useTranslation();
  const {colors} = useTheme();

  const [refreshing] = useState(false);
  const [bookingHistory] = useState(BookingHistoryData);

  /**
   * render Item
   *
   * @param {*} item
   * @returns
   */
  const renderItem = item => {
    return (
      <Favourite
        name={item.name}
        PostedOn={item.PostedOn}
        Views={item.Views}
        calls={item.calls}
        price={item.price}
        image={item.image}
        Likes={item.Likes}
        style={{paddingVertical: 10, marginHorizontal: 20}}
        onPress={() => navigation.navigate('HotelDetail')}
      />
    );
  };

  /**
   * @description Loading booking item history one by one
   * @author Passion UI <passionui.com>
   * @date 2019-08-03
   * @returns
   */
  return (
    <View style={{flex: 1}}>
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={['right', 'left', 'bottom']}>
        <FlatList
          refreshControl={
            <RefreshControl
              colors={[colors.primary]}
              tintColor={colors.primary}
              refreshing={refreshing}
              onRefresh={() => {}}
            />
          }
          data={bookingHistory}
          keyExtractor={(item, index) => item.id}
          renderItem={({item}) => renderItem(item)}
        />
      </SafeAreaView>
    </View>
  );
}
