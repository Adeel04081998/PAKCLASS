

import React, { useState } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { BaseStyle, useTheme } from '@config';
import { SafeAreaView, BookingHistory, Favourite } from '@components';
import { BookingHistoryData } from '@data';
import { useTranslation } from 'react-i18next';
import { Images } from '../../config/images';
import GV from '../../utils/GV';


export default function Booking({ navigation, postedAdds, isMyAds }) {
  // console.log("Booking",postedAdds);
  const { t } = useTranslation();
  const { colors } = useTheme();

  const [refreshing] = useState(false);
  const [bookingHistory] = useState(BookingHistoryData);

  /**
   * render Item
   *
   * @param {*} item
   * @returns
   */
  const renderItem = itemPost => {
    // image={GV.imageUrlPrefix.concat(item.pictures[0]?.filename)}
    console.log("Bookingitem===>>>>>", itemPost);
    console.log("isMyAds=>", isMyAds);
    let postedTime = itemPost?.created_at?.split('T')
    let image = isMyAds ? GV.imageUrlPrefix?.concat(itemPost?.pictures[0]?.filename) ?? '' : GV.imageUrlPrefix?.concat(itemPost?.post?.pictures[0]?.filename) ?? ''
    const item = isMyAds ? itemPost : itemPost?.post
    // console.log("item=>", item?.id);
    return (
      <BookingHistory
        post_id={item.id}
        location={item.address ?? ''}
        name={item.title}
        PostedOn={postedTime[0]}
        Views={item.Views}
        calls={item.calls}
        price={item.price}
        image={image}
        Likes={item.Likes}
        status={item.status}
        style={{ paddingVertical: 10, marginHorizontal: 20 }}
        // onPress={() => navigation.navigate('HotelDetail')}
        onPress={() => navigation.navigate('HotelDetail', {
          pressedAdd: item ?? {}
        })}
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
    <View style={{ flex: 1 }}>
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={['right', 'left', 'bottom']}>
        <FlatList
          refreshControl={
            <RefreshControl
              colors={[colors.primary]}
              tintColor={colors.primary}
              refreshing={refreshing}
              onRefresh={() => { }}
            />
          }
          // data={bookingHistory}
          data={postedAdds}
          keyExtractor={(item, index) => item.id}
          renderItem={({ item }) => renderItem(item)}
        />
      </SafeAreaView>
    </View>
  );
}

export function Favourites({ navigation, featuredAdds }) {
  // console.log("Favourites props=>", featuredAdds);

  const { t } = useTranslation();
  const { colors } = useTheme();

  const [refreshing] = useState(false);
  const [bookingHistory] = useState(BookingHistoryData);

  /**
   * render Item
   *
   * @param {*} item
   * @returns
   */

  const renderItem = item => {
    // console.log("item Favourite", item);
    let postedTime = item.created_at.split('T')
    let image = GV.imageUrlPrefix.concat(item?.pictures[0]?.filename)
    return (
      <Favourite
        post_id={item.id}
        name={item.title}
        PostedOn={postedTime}
        Views={item.visits}
        calls={item.calls}
        price={item.price}
        image={image}
        Likes={item.Likes}
        style={{ paddingVertical: 10, marginHorizontal: 20 }}
        // onPress={() => navigation.navigate('HotelDetail')}
        onPress={() => navigation.navigate('HotelDetail', {
          pressedAdd: item ?? {}
        })}
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
    <View style={{ flex: 1 }}>
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={['right', 'left', 'bottom']}>
        <FlatList
          refreshControl={
            <RefreshControl
              colors={[colors.primary]}
              tintColor={colors.primary}
              refreshing={refreshing}
              onRefresh={() => { }}
            />
          }
          // data={bookingHistory}
          data={featuredAdds}
          keyExtractor={(item, index) => item.id}
          renderItem={({ item }) => renderItem(item)}
        />
      </SafeAreaView>
    </View>
  );
}
