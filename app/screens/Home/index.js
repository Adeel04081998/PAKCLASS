import React, { useEffect, useState } from 'react';
import { View, Animated, TouchableOpacity, FlatList } from 'react-native';
import {
  Image,
  Text,
  Icon,
  HotelItem,
  Card,
  Button,
  SafeAreaView,
  EventCard,
} from '@components';
import { BaseStyle, Images, useTheme } from '@config';
import * as Utils from '@utils';
import styles from './styles';
import { PromotionData, TourData, HotelData } from '@data';
import { useTranslation } from 'react-i18next';
import Header_pic from '../../assets/images/header_img.jpg';
import { getRequest, postRequest } from '../../manager/Apimanager';
import Endpoints from '../../manager/Endpoints';
import { useSelector } from 'react-redux';
import axios from 'axios';

export default function Home({ navigation }) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [icons] = useState([
    {
      icon: 'car-alt',
      name: 'Vehicles',
      route: 'Currency',
    },
    {
      icon: 'home',
      name: 'Property',
      route: 'Currency',
    },
    {
      icon: 'mobile-alt',
      name: 'Mobile',
      route: 'Currency',
      //route: 'Tour',
    },

    {
      icon: 'suitcase',
      name: 'Jobs',
      route: 'Currency',
    },
    {
      icon: 'industry',
      name: 'Business',
      route: 'Currency',
    },
    {
      icon: 'clipboard',
      name: 'Services',
      route: 'Currency',
    },
    {
      icon: 'graduation-cap',
      name: 'Learning',
      route: 'Currency',
    },
    {
      icon: 'ellipsis-h',
      name: 'more',
      route: 'More',
    },
  ]);
  const [relate] = useState([
    {
      id: '0',
      image: Images.event4,
      title: 'BBC Music Introducing',
      time: 'Thu, Oct 31, 9:00am',
      location: 'Tobacco Dock, London',
    },
    {
      id: '1',
      image: Images.event5,
      title: 'Bearded Theory Spring Gathering',
      time: 'Thu, Oct 31, 9:00am',
      location: 'Tobacco Dock, London',
    },
  ]);
  const [promotion,] = useState(PromotionData);
  const [tours] = useState(TourData);
  const [hotels] = useState(HotelData);
  const [heightHeader, setHeightHeader] = useState(Utils.heightHeader());
  const deltaY = new Animated.Value(0);
  const [mostSearchedPost, setMostSearchedPost] = useState({
    post_section_message: '',
    data: []
  });
  const [mostFeaturedPost, setMostFeaturedPost] = useState({
    post_section_message: '',
    data: []
  });


  const userReducer = useSelector(state => state.userReducer)

  /**
   * @description Show icon services on form searching
   * @author Passion UI <passionui.com>
   * @date 2019-08-03
   * @returns
   */
  const renderIconService = () => {
    return (
      <FlatList
        data={icons}
        numColumns={4}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={styles.itemService}
              activeOpacity={0.9}
              onPress={() => {
                navigation.navigate(item.route);
              }}>
              <View
                style={[styles.iconContent, { backgroundColor: colors.card }]}>
                <Icon name={item.icon} size={20} color={colors.primary} solid />
                <Text
                  style={{ fontSize: 10 }}
                  footnote
                  grayColor
                  numberOfLines={1}>
                  {t(item.name)}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    );
  };

  const heightImageBanner = Utils.scaleWithPixel(140);
  const marginTopBanner = heightImageBanner - heightHeader;

  const loadMostSearchedPost = () => {
    getRequest(Endpoints.GET_MOST_SEARCHED_POST, (res) => {

      console.log("res=>>>> GET_MOST_SEARCHED_POST", JSON.stringify(res.data));

      setMostSearchedPost((pre) => (
        {
        ...pre,
        post_section_message: res.data.message,
        data: res.data.most_search_post

      }))


    },
      (err) => {
        console.log("errr=>>>> GET_MOST_SEARCHED_POST", JSON.stringify(err));

      })
  }
  const loadMostFeaturedPost = () => {
    getRequest(Endpoints.GET_MOST_FEATURED_POST, (res) => {

      console.log("res=>>>> GET_MOST_FEATURED_POST", JSON.stringify(res.data));
    },
      (err) => {
        console.log("errr=>>>> GET_MOST_FEATURED_POST", JSON.stringify(err));

      })
  }
  useEffect(() => {
    loadMostFeaturedPost()
    loadMostSearchedPost()

  }, [userReducer.access_token]);


  console.log('mostSearchedPost========================>>>>', mostSearchedPost.data);

  return (
    <View style={{ flex: 1 }}>
      <Animated.Image
        source={Header_pic}
        style={[
          styles.imageBackground,
          {
            height: deltaY.interpolate({
              inputRange: [
                0,
                Utils.scaleWithPixel(100),
                Utils.scaleWithPixel(100),
              ],
              outputRange: [heightImageBanner, heightHeader, 0],
            }),
          },
        ]}
      />
      <SafeAreaView style={{ flex: 1 }} edges={['right', 'left']}>
        <FlatList
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: { y: deltaY },
              },
            },
          ])}
          onContentSizeChange={() => setHeightHeader(Utils.heightHeader())}
          scrollEventThrottle={8}
          ListHeaderComponent={
            <View style={{ paddingHorizontal: 20 }}>
              <View
                style={[
                  styles.searchForm,
                  {
                    marginTop: marginTopBanner,
                    backgroundColor: colors.background,
                    borderColor: colors.border,
                    shadowColor: colors.border,
                  },
                ]}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Search')}
                  activeOpacity={0.9}>
                  <View
                    style={[
                      {
                        backgroundColor: colors.card,
                        borderRadius: 20,
                        padding: 8
                      },
                    ]}>
                    <Text body1 grayColor>
                      <Icon name={'search'} size={15} color={'grey'} solid />
                      {t(' Search...')}
                    </Text>
                  </View>
                </TouchableOpacity>
                {renderIconService()}
              </View>
            </View>
          }
          ListFooterComponent={
            <View>

{/* Featured Ads Section Start from here ===>>>>>>>>>>>>>>>>>>>>>>>>>>>.*/}

              <View>
                <Text title3 semibold style={styles.titleView}>
                  {t('Featured Ads')}
                </Text>
                <FlatList
                  contentContainerStyle={{ paddingLeft: 5, paddingRight: 20 }}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  data={promotion}
                  keyExtractor={(item, index) => item.id}
                  renderItem={({ item, index }) => (
                    <Card
                      style={[styles.promotionItem, { marginLeft: 15 }]}
                      image={item.image}
                      onPress={() => navigation.navigate('HotelDetail')}>
                      <Text subhead whiteColor>
                        {item.title1}
                      </Text>
                      <Text title2 whiteColor semibold>
                        {item.title2}
                      </Text>
                      <View style={styles.contentCartPromotion}>
                        <Button
                          style={styles.btnPromotion}
                          onPress={() => {
                            navigation.navigate('PreviewBooking');
                          }}>
                          <Text body2 semibold whiteColor>
                            {t('View Ad')}
                          </Text>
                        </Button>
                      </View>
                    </Card>
                  )}
                />
              </View>

{/* Featured Ads Section End here ===>>>>>>>>>>>>>>>>>>>>>>>>>>>.*/}


              {/* Hiking */}
{/* Most Searched Post Section Start from here ===>>>>>>>>>>>>>>>>>>>>>>>>>>>.*/}

              <View style={styles.titleView}>
                <Text title3 semibold>
                  {/* {t('Most Searched')} */}
                  {`${mostSearchedPost.post_section_message}`}
                  {/* {mostSearchedPost.post_section_message} */}
                </Text>
              </View>
              <FlatList
                contentContainerStyle={{ paddingLeft: 5, paddingRight: 20 }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                // data={promotion}
                data={mostSearchedPost.data}
                keyExtractor={(item, index) => item.id}
                renderItem={({ item, index }) => (
                  <Card
                    style={[styles.promotionItem, { marginLeft: 15 }]}
                    image={item.image}
                    onPress={() => navigation.navigate('HotelDetail')}>
                    <Text subhead whiteColor>
                      {item.title}
                    </Text>
                    <Text title2 whiteColor semibold>
                      {item.price}
                    </Text>
                    <View style={styles.contentCartPromotion}>
                      <Button
                        style={styles.btnPromotion}
                        onPress={() => {
                          navigation.navigate('PreviewBooking');
                        }}>
                        <Text body2 semibold whiteColor>
                          {t('View Ad')}
                        </Text>
                      </Button>
                    </View>
                  </Card>
                )}
              />
{/* Most Searched Post Section End  here ===>>>>>>>>>>>>>>>>>>>>>>>>>>>.*/}



{/* Recently Posted Section Start from here ===>>>>>>>>>>>>>>>>>>>>>>>>>>>.*/}

              <View style={styles.titleView}>
                <Text title3 semibold>
                  {t('Recently Posted')}
                </Text>
              </View>

              <FlatList
                columnWrapperStyle={{ paddingLeft: 5, paddingRight: 20 }}
                numColumns={2}
                data={hotels}
                keyExtractor={(item, index) => item.id}
                renderItem={({ item, index }) => (
                  <HotelItem
                    grid
                    image={item.image}
                    name={item.name}
                    location={item.location}
                    price={item.price}
                    available={item.available}
                    rate={item.rate}
                    rateStatus={item.rateStatus}
                    numReviews={item.numReviews}
                    services={item.services}
                    style={{ marginLeft: 15, marginBottom: 15 }}
                    onPress={() => navigation.navigate('HotelDetail')}
                  />
                )}
              />

            </View>
          }
        />
      </SafeAreaView>
    </View>
  );
}
