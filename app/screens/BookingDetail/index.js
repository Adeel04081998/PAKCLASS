




import React, { useEffect, useState } from 'react';
import { View, ScrollView, Alert, Text } from 'react-native';
import { BaseStyle, BaseColor, useTheme } from '@config';
import { Header, SafeAreaView, Icon, } from '@components';
import { TabView, TabBar } from 'react-native-tab-view';
import { useTranslation } from 'react-i18next';
import styles from './styles';
import Booking, { Favourites } from '@screens/Booking';
import { useSelector } from 'react-redux';
import { getRequest, postRequest } from '../../manager/Apimanager';
import Endpoints from '../../manager/Endpoints';
import axios from 'axios';
import Toast from '../../components/Toast/Toast'
import { useFocusEffect } from '@react-navigation/native';


export default function BookingDetail({ navigation }) {
  const { colors } = useTheme();
  const { t } = useTranslation();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'Posted Ads', title: t('Posted Ads') },
    { key: 'Favourite Ads', title: t('Favourite Ads') },
  ]);
  const [data, setData] = useState({
    postType: 1,
    AdsRecord: '',
    postedAds: ''
  });


  const [state, setState] = useState({
    isDataAvalible: true
  })


  const [favouriteAds, setFavouriteAds] = useState()
  const [myAds, setMyAds] = useState()

  const userReducer = useSelector(state => state.userReducer)

  // When tab is activated, set what's index value
  const handleIndexChange = index => {
    setIndex(index);
  };

  // Customize UI tab bar
  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={[styles.indicator, { backgroundColor: colors.primary }]}
      style={[styles.tabbar, { backgroundColor: colors.background }]}
      tabStyle={styles.tab}
      inactiveColor={BaseColor.grayColor}
      activeColor={colors.text}
      renderLabel={({ route, focused, color }) => (
        <View>
          <Text style={{ color }}>{route.title}</Text>
        </View>
      )}
    />
  );

  // Render correct screen container when tab is activated
  const renderScene = ({ route, jumpTo }) => {

    if (favouriteAds?.length && index === 1) {
      console.log("here if1", favouriteAds);

      // return <PreviewTab jumpTo={jumpTo} navigation={navigation} postedAdds={data.AdsRecord} />;

      return <PreviewTab jumpTo={jumpTo} navigation={navigation} postedAdds={favouriteAds} isMyAds={false} />;


    } else if (myAds?.length && index === 0) {
      console.log("here if2", myAds);
      // return <ConfirmTab jumpTo={jumpTo} navigation={navigation} featuredAdds={data.postedAds} />;
      // return <PreviewTab jumpTo={jumpTo} navigation={navigation} postedAdds={favouriteAds} />;

      return <PreviewTab jumpTo={jumpTo} navigation={navigation} postedAdds={myAds} isMyAds={true} />;
    }
    else {
      return (
        <View>
          <Text style={{ justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }}>No Record Found</Text>
        </View>
      )
    }


    // if (data.AdsRecord.length && index === 1) {
    //   // console.log("here if1");

    //   // return <PreviewTab jumpTo={jumpTo} navigation={navigation} postedAdds={data.AdsRecord} />;
    //   return <PreviewTab jumpTo={jumpTo} navigation={navigation} postedAdds={myAds} />;


    // } else if (data?.postedAds.length && index === 0) {
    //   // console.log("here if2");
    //   // return <ConfirmTab jumpTo={jumpTo} navigation={navigation} featuredAdds={data.postedAds} />;
    //   return <PreviewTab jumpTo={jumpTo} navigation={navigation} postedAdds={favouriteAds} />;

    // }


  };

  const loadPersonalAdds = () => {


    postRequest(Endpoints.MY_ADS, {}, (res) => {

      console.log("loadPersonalAdds===>>ress====>>>>>", res.data);

      const { access_token, myAds, status, failed } = res.data
      let vla = 0
      // let tempArray = res.data.myAds.map((x, i) => {
      //   if (x.post_type_id === '1') {
      //     ///professional add its type 2
      //     // setData((pre) => ({ ...pre, postType: x.post_type_id, postedAds: [x] }))
      //     setData((pre) => ({ ...pre, postType: x.post_type_id, AdsRecord: myAds }))
      //   console.log("x 11->", x);


      //   } else {
      //     ///favouriteads add its type 1
      //     // console.log("xx=>",x);

      //     // setData((pre) => ({ ...pre, postType: x.post_type_id, AdsRecord:[x] }))
      //     setData((pre) => ({ ...pre, postType: x.post_type_id, postedAds: [x] }))
      //   console.log("x 22->", x);



      //   }
      // })
      // console.log("lenght",res.data.myAds.length);


      let filteredpostedAds = res.data.myAds.filter((touchTrack) => {
        if (touchTrack) {
          return touchTrack && touchTrack.post_type_id === "2";
        }
      });
      let filteredfeaturedAds = res.data.myAds.filter((touchTrack) => {
        if (touchTrack) {
          return touchTrack && touchTrack.post_type_id === "1";
        }
      })
      setData((pre) => ({ ...pre, postType: 2, postedAds: filteredpostedAds, AdsRecord: filteredfeaturedAds }))


      console.log("filteredfeaturedAds", filteredfeaturedAds);

      // if (vla !== 0) {
      //   setData((pre) => ({
      //     ...pre,
      //     AdsRecord: myAds,
      //     postType: vla
      //   }))

      // }

    }, (err) => {
      console.log("loadPersonalAdds===>>errr", err);
      if (err.status === 404) {
        setState((pre) => ({
          ...pre,
          isDataAvalible: false
        }))
        Toast.error(err?.data?.message)
      }

    })
  }

  const loadMyAdds = () => {
    postRequest(Endpoints.MY_ADS, {}, (res) => {

      console.log("loadMyAdds===>>ress====>>>>>", res.data);

      const { access_token, myAds, status, failed } = res.data

      setMyAds(res.data.myAds)

    }, (err) => {
      console.log("loadMyAdds===>>errr", err);
      if (err.status === 404) {
        setState((pre) => ({
          ...pre,
          isDataAvalible: false
        }))
        Toast.error(err?.data?.message)
      }

    })
  }
  const loadMyFavouriteAds = () => {
    postRequest(Endpoints.load_Favourite_Ads, {}, (res) => {

      console.log("loadMyFavouriteAds===>>ress====>>>>>", res.data);

      const { access_token, myAds, status, failed } = res.data

      setFavouriteAds(res.data.favourite_ads)


    }, (err) => {
      console.log("loadMyFavouriteAds===>>errr", err);
      if (err.status === 404) {
        setState((pre) => ({
          ...pre,
          isDataAvalible: false
        }))
        Toast.error(err?.data?.message)
      }

    })
  }

  useFocusEffect(
    React.useCallback(() => {
      if (userReducer.access_token) {
        // loadPersonalAdds()
        loadMyAdds()
        loadMyFavouriteAds()
      } else {
        navigation.navigate('Walkthrough')
      }
    }, [])
  );
  console.log("my ads===>.", myAds);
  console.log("favouriteAds  ===>.", favouriteAds);



  return (
    <View style={{ flex: 1 }}>
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
        {
          myAds?.length || favouriteAds?.length ?
            <TabView
              lazy
              navigationState={{ index, routes }}
              renderScene={renderScene}
              renderTabBar={renderTabBar}
              onIndexChange={handleIndexChange}
            />
            : <View />
        }

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
function PreviewTab({ navigation, postedAdds, isMyAds }) {
  // console.log("PreviewTab", postedAdds);

  return <Booking navigation={navigation} postedAdds={postedAdds} isMyAds={isMyAds} />;
}

/**
 * @description Show when tab Confirm activated
 * @author Passion UI <passionui.com>
 * @date 2019-08-03
 * @class PreviewTab
 * @extends {Component}
 */
function ConfirmTab({ navigation, featuredAdds }) {
  // console.log("featuredAdds", featuredAdds);
  return <Favourites navigation={navigation} featuredAdds={featuredAdds} />;
}
