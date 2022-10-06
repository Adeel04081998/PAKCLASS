


import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, View, Animated, Text, Alert } from 'react-native';
import { BaseStyle, useTheme } from '@config';
import {
  Header, SafeAreaView, Icon, TourItem, FilterSort,
  HotelItem,

} from '@components';
import styles from './styles';
import * as Utils from '@utils';
import { TourData } from '@data';
import { useTranslation } from 'react-i18next';
import { postRequest } from '../../manager/Apimanager';
import Endpoints from '../../manager/Endpoints';
import Toast from '../../components/Toast/Toast';
import { Images } from '../../config/images';
import GV from '../../utils/GV';
import { useSelector } from 'react-redux';
import { sharedMakeAddFavourite } from '../../helpers/sharedActions';

export default function Tour({ navigation, route }) {
  const { t } = useTranslation();
  const scrollAnim = new Animated.Value(0);
  const offsetAnim = new Animated.Value(0);
  const clampedScroll = Animated.diffClamp(
    Animated.add(
      scrollAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolateLeft: 'clamp',
      }),
      offsetAnim,
    ),
    0,
    40,
  );
  const { colors } = useTheme();

  const [refreshing] = useState(false);
  const [modeView, setModeView] = useState('list');
  const [tours, setToursData] = useState('');
  console.log("roye==>", route);
  const Subcategory_Id = route?.params?.pressedSubCategory?.id ? route?.params?.pressedSubCategory?.id : '0'
  const userReducer = useSelector(state => state.userReducer)

  const onChangeSort = () => { };

  /**
   * @description Open modal when filterring mode is applied
   * @author Passion UI <passionui.com>
   * @date 2019-08-03
   */
  const onFilter = () => {
    navigation.navigate('Filter');
  };

  /**
   * @description Open modal when view mode is pressed
   * @author Passion UI <passionui.com>
   * @date 2019-08-03
   */
  const onChangeView = () => {
    Utils.enableExperimental();
    switch (modeView) {
      case 'block':
        setModeView('grid');

        break;
      case 'grid':
        setModeView('list');
        break;
      case 'list':
        setModeView('block');
        break;
      default:
        setModeView('block');
        break;
    }
  };

  /**
   * @description Render container view
   * @author Passion UI <passionui.com>
   * @date 2019-08-03
   * @returns
   */
  const renderContent = () => {
    const navbarTranslate = clampedScroll.interpolate({
      inputRange: [0, 40],
      outputRange: [0, -40],
      extrapolate: 'clamp',
    });



    switch (modeView) {
      case 'block':
        return (
          <View style={{ flex: 1 }}>
            <Animated.FlatList
              contentContainerStyle={{
                paddingTop: 50,
              }}
              refreshControl={
                <RefreshControl
                  colors={[colors.primary]}
                  tintColor={colors.primary}
                  refreshing={refreshing}
                  onRefresh={() => { }}
                />
              }
              scrollEventThrottle={1}
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: {
                      contentOffset: {
                        y: scrollAnim,
                      },
                    },
                  },
                ],
                { useNativeDriver: true },
              )}
              data={tours}
              key={'block'}
              keyExtractor={(item, index) => item.id}
              renderItem={({ item, index }) => (
                <TourItem
                  block
                  image={item.image}
                  name={item.name}
                  // location={item.location}
                  location={item.address ?? ''}
                  travelTime={item.location}
                  startTime={item.startTime}
                  price={item.price}
                  rate={item.rate}
                  rateCount={item.rateCount}
                  numReviews={item.numReviews}
                  author={item.author}
                  services={item.services}
                  style={{
                    marginBottom: 10,
                  }}
                  onPress={() => {
                    navigation.navigate('TourDetail');

                  }}
                  onPressBookNow={() => {
                    navigation.navigate('PreviewBooking');
                  }}
                />
              )}
            />
            <Animated.View
              style={[
                styles.navbar,
                { transform: [{ translateY: navbarTranslate }] },
              ]}>
              <FilterSort
                modeView={modeView}
                onChangeSort={onChangeSort}
                onChangeView={onChangeView}
                onFilter={onFilter}
              />
            </Animated.View>
          </View>
        );
      case 'grid':
        return (
          <View style={{ flex: 1 }}>
            <Animated.FlatList
              contentContainerStyle={{
                paddingTop: 50,
              }}
              columnWrapperStyle={{
                paddingLeft: 5,
                paddingRight: 20,
              }}
              refreshControl={
                <RefreshControl
                  colors={[colors.primary]}
                  tintColor={colors.primary}
                  refreshing={refreshing}
                  onRefresh={() => { }}
                />
              }
              scrollEventThrottle={1}
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: {
                      contentOffset: {
                        y: scrollAnim,
                      },
                    },
                  },
                ],
                { useNativeDriver: true },
              )}
              showsVerticalScrollIndicator={false}
              numColumns={2}
              data={tours}
              key={'gird'}
              keyExtractor={(item, index) => item.id}
              renderItem={({ item, index }) => (
                <TourItem
                  grid
                  image={item.image}
                  name={item.name}
                  // location={item.location}
                  location={item.address ?? ''}
                  travelTime={item.travelTime}
                  startTime={item.startTime}
                  price={item.price}
                  rate={item.rate}
                  rateCount={item.rateCount}
                  numReviews={item.numReviews}
                  author={item.author}
                  services={item.services}
                  style={{
                    marginBottom: 15,
                    marginLeft: 15,
                  }}
                  onPress={() => {
                    navigation.navigate('TourDetail');
                  }}
                  onPressBookNow={() => {
                    navigation.navigate('PreviewBooking');
                  }}
                />
              )}
            />
            <Animated.View
              style={[
                styles.navbar,
                {
                  transform: [{ translateY: navbarTranslate }],
                },
              ]}>
              <FilterSort
                modeView={modeView}
                onChangeSort={onChangeSort}
                onChangeView={onChangeView}
                onFilter={onFilter}
              />
            </Animated.View>
          </View>
        );

      case 'list':
        return (
          <View style={{ flex: 1 }}>
            <Animated.FlatList
              contentContainerStyle={{
                paddingTop: 50,
                paddingHorizontal: 20,
              }}
              refreshControl={
                <RefreshControl
                  colors={[colors.primary]}
                  tintColor={colors.primary}
                  refreshing={refreshing}
                  onRefresh={() => { }}
                />
              }
              scrollEventThrottle={1}
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: {
                      contentOffset: {
                        y: scrollAnim,
                      },
                    },
                  },
                ],
                { useNativeDriver: true },
              )}
              data={tours}
              key={'list'}
              keyExtractor={(item, index) => item.id}

              renderItem={({ item, index }) => (
                console.log("item", item),
                // image={GV.imageUrlPrefix.concat(item.pictures[0]?.filename)}
                <TourItem
                  list
                  // image={item.picture ?? Images.profile1}
                  image={GV.imageUrlPrefix.concat(item.pictures[0]?.filename)}
                  name={item.title}
                  // location={item?.address}
                  location={item.address ?? ''}
                  travelTime={item.travelTime}
                  startTime={item.created_at_ta}
                  price={item.price}
                  rate={item.rate}
                  rateCount={item.rateCount}
                  numReviews={item.numReviews}
                  author={item.author}
                  services={item.services}
                  style={{
                    marginBottom: 20,
                  }}
                  // onPress={() => {
                  //   navigation.navigate('TourDetail');
                  // }}
                  onPress={() => navigation.navigate('HotelDetail', {
                    pressedAdd: item
                  })}
                  onPressBookNow={() => {
                    navigation.navigate('PreviewBooking');
                  }}
                  onFavPress={() => {



                    if (userReducer.access_token) {

                      sharedMakeAddFavourite(item?.id)

                    } else {
                      navigation.navigate('Walkthrough')
                    }

                  }}
                />
              )}
            />
            <Animated.View
              style={[
                styles.navbar,
                {
                  transform: [{ translateY: navbarTranslate }],
                },
              ]}>
              {/* <FilterSort
                modeView={modeView}
                onChangeSort={onChangeSort}
                onChangeView={onChangeView}
                onFilter={onFilter}
              /> */}
            </Animated.View>
          </View>
        );
      default:
        return (
          <View style={{ flex: 1 }}>
            <Animated.FlatList
              contentContainerStyle={{
                paddingTop: 50,
              }}
              refreshControl={
                <RefreshControl
                  colors={[colors.primary]}
                  tintColor={colors.primary}
                  refreshing={refreshing}
                  onRefresh={() => { }}
                />
              }
              scrollEventThrottle={1}
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: {
                      contentOffset: {
                        y: scrollAnim,
                      },
                    },
                  },
                ],
                { useNativeDriver: true },
              )}
              data={tours}
              key={'block'}
              keyExtractor={(item, index) => item.id}
              renderItem={({ item, index }) => (
                <TourItem
                  block
                  image={item.image}
                  name={item.name}
                  // location={item.location}
                  location={item.address ?? ''}
                  travelTime={item.travelTime}
                  startTime={item.startTime}
                  price={item.price}
                  rate={item.rate}
                  rateCount={item.rateCount}
                  numReviews={item.numReviews}
                  author={item.author}
                  services={item.services}
                  style={{
                    marginBottom: 10,
                  }}
                  onPress={() => {
                    navigation.navigate('TourDetail');
                  }}
                  onPressBookNow={() => {
                    navigation.navigate('PreviewBooking');
                  }}
                />
              )}
            />
            <Animated.View
              style={[
                styles.navbar,
                { transform: [{ translateY: navbarTranslate }] },
              ]}>
              <FilterSort
                modeView={modeView}
                onChangeSort={onChangeSort}
                onChangeView={onChangeView}
                onFilter={onFilter}
              />
            </Animated.View>
          </View>
        );
    }

  };



  const loadPostSubCategoriesWise = () => {
    postRequest(Endpoints.GET_POST_ONBASIS_OF_SUBCATEGORY, {
      "subCatId": Subcategory_Id
    }, (res) => {

      console.log('if loadPostSubCategoriesWise===  res ', res);
      if (res?.data?.status === 'success') {
        setToursData(res.data.post_with_sub_cat)


      } else {
        Toast.info("No Record Found")
        // navigation.navigate("Home")
      }

    }, err => {
      console.log('if loadPostSubCategoriesWise error=>>>>>>>>>>>>>>>>', err.data);

    });
  }

  useEffect(() => {

    loadPostSubCategoriesWise()

  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Header
        title={t('Sub-Categories')}
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
        renderRight={() => {
          return <Icon name="search" size={20} color={colors.primary} />;
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
        onPressRight={() => {
          navigation.navigate('SearchHistory');
        }}
      />
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={['right', 'left', 'bottom']}>
        {renderContent()}
      </SafeAreaView>
    </View>
  );
}

