
import React, { useEffect, useState } from 'react';
import { View, Animated, TouchableOpacity, FlatList, Image, Alert } from 'react-native';
import {
  Text,
  Icon,
  HotelItem,
  Card,
  Button,
  SafeAreaView,
  EventCard,
} from '@components';
import { BaseStyle, useTheme } from '@config';
import * as Utils from '@utils';
import styles from './styles';
import { PromotionData, TourData, HotelData } from '@data';
import { useTranslation } from 'react-i18next';
import Header_pic from '../../assets/images/header_img.jpg';
import { getRequest, postRequest } from '../../manager/Apimanager';
import Endpoints from '../../manager/Endpoints';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { sharedExceptionHandler, sharedLaunchCameraorGallery, sharedMakeAddFavourite } from '../../helpers/sharedActions';
import { Images } from '../../config/images'
import * as ImagePicker from 'expo-image-picker';
import GV from '../../utils/GV';



export default function Home({ navigation }) {

  const { t } = useTranslation();
  // const { colors } = useTheme();\
  const { colors } = useTheme();
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
  // State region Start HEre
  const [promotion,] = useState(PromotionData);
  const [tours] = useState(TourData);
  const [hotels] = useState(HotelData);
  const [heightHeader, setHeightHeader] = useState(Utils.heightHeader());
  const deltaY = new Animated.Value(0);
  const [mostSearchedPost, setMostSearchedPost] = useState({
    post_section_message: '',
    data: []
  });

  const [mostFeaturedPost, setMostFeaturedPost] = useState([]);
  const [recentPost, setMostRecentPost] = useState([]);
  const [icons, setIcons] = useState([]);
  const userReducer = useSelector(state => state.userReducer)
  console.log("userReducer", userReducer);
  // const [newimage, setImage] = useState(null);

  // State region End Here


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
          console.log("item.name=>>>>>>>>>>>>>", item.name);
          return (
            <TouchableOpacity
              style={styles.itemService}
              activeOpacity={0.9}
              onPress={() => navigation.navigate('Currency', {
                pressedCategory: item
              })}

            >
              <View
                style={[styles.iconContent, { backgroundColor: colors.card }]}>
                {/* <Icon name={item.icon} size={20} color={colors.primary} solid /> */}
                <Image
                  source={{
                    // uri:'https://pakclass.com/storage/app/categories/skin-green/fa-car.png'
                    uri: item.picture ?? ''

                  }}
                  style={{ height: 50, width: 50, }}



                />
                <Text
                  style={{ fontSize: 10 }}
                  footnote
                  grayColor
                  numberOfLines={1}>
                  {t(item.name)}
                </Text>
              </View>
            </TouchableOpacity>
          ); 0
        }}
      />
    );
  };

  const heightImageBanner = Utils.scaleWithPixel(140);
  const marginTopBanner = heightImageBanner - heightHeader;

  const loadMostSearchedPost = () => {
    getRequest(Endpoints.GET_MOST_SEARCHED_POST, (res) => {

      // console.log("res=>>>> GET_MOST_SEARCHED_POST", JSON.stringify(res.data));

      setMostSearchedPost((pre) => (
        {
          ...pre,
          post_section_message: res.data.message,
          data: res.data.most_search_post

        }))


    },
      (err) => {
        // console.log("errr=>>>> GET_MOST_SEARCHED_POST", JSON.stringify(err));

      })
  }
  const loadMostFeaturedPost = () => {
    getRequest(Endpoints.GET_MOST_FEATURED_POST, (res) => {

      // console.log("res=>>>> GET_MOST_FEATURED_POST", JSON.stringify(res.data));
      const { access_token, user, status, failed } = res.data
      // setMostFeaturedPost((pre) => (
      //   {
      //     ...pre,
      //     post_section_message: res.data.message,
      //     data: res.data.mostfeaturedPost

      //   }))
      setMostFeaturedPost(res.data)

    },
      (err) => {
        // console.log("errr=>>>> GET_MOST_FEATURED_POST", JSON.stringify(err));

      })
  }
  const loadRecentlyAddedPost = () => {
    getRequest(Endpoints.ALL_POST_LIST, (res) => {

      // console.log("res=>>>> loadRecentlyAddedPost", JSON.stringify(res.data));
      const { access_token, user, status, failed } = res.data
      if (status === 'success') {
        setMostRecentPost(res.data.posts)

      }
      else if (failed) {
        // sharedExceptionHandler(res.data)

      }
    },
      (err) => {
        // console.log("errr=>>>> loadRecentlyAddedPost", JSON.stringify(err));

      })
  }
  const loadCategoriesList = () => {
    getRequest(Endpoints.GET_CATEGORIES, (res) => {

      // console.log("res=>>>> GET_CATEGORIES", res);
      const { categories } = res.data
      if (categories) {
        setIcons(categories)


      }


    },
      (err) => {
        // console.log("errr=>>>> GET_CATEGORIES", err);
        sharedExceptionHandler(err)

      })
  }


  useEffect(() => {
    loadMostFeaturedPost()
    loadMostSearchedPost()
    loadRecentlyAddedPost()
    loadCategoriesList()

  }, []);


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
                  {/* {`${mostFeaturedPost.post_section_message}`} */}

                </Text>
                <FlatList
                  contentContainerStyle={{ paddingLeft: 5, paddingRight: 20 }}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  // data={promotion}
                  data={mostFeaturedPost ?? []}
                  keyExtractor={(item, index) => item.id}
                  renderItem={({ item, index }) => (
                    console.log("itemmmm=faturred>>>>..", item),
                    <Card
                      style={[styles.promotionItem, { marginLeft: 15 }]}
                      // image={item.image}
                      image={GV.imageUrlPrefix.concat(item.pictures[0]?.filename)}
                      onPress={() => navigation.navigate('HotelDetail', {
                        pressedAdd: item ?? {}
                      })}

                    >
                      <Text subhead whiteColor>
                        {item.title}
                      </Text>
                      <Text title2 whiteColor semibold>
                        {item.price}
                      </Text>
                      <View style={styles.contentCartPromotion}>
                        <Button
                          style={styles.btnPromotion}
                          // onPress={() => {
                          //   navigation.navigate('PreviewBooking');
                          // }} 
                          onPress={() => navigation.navigate('HotelDetail', {
                            pressedAdd: item
                          })}


                        >
                          <Text body2 semibold whiteColor>
                            {t('View Ad')}
                          </Text>
                        </Button>
                        <View style={{ flexDirection: 'row', width: '65%', justifyContent: 'flex-end', alignItems: 'center' }}>
                          <Icon name={'heart'} size={30} color={colors.primary} solid
                            onPress={() => {
                              // Alert.alert("HY")
                              if (userReducer.access_token) {

                                sharedMakeAddFavourite(item?.id)

                              } else {
                                navigation.navigate('Walkthrough')
                              }
                            }}
                          />
                        </View>
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
                  console.log("itemmmm= most search>>>>2..", item),

                  <Card
                    style={[styles.promotionItem, { marginLeft: 15 }]}
                    // image={item.image}
                    image={GV.imageUrlPrefix.concat(item.pictures[0]?.filename)}
                    onPress={() => navigation.navigate('HotelDetail', {
                      pressedAdd: item
                    })}
                  >
                    <Text subhead whiteColor>
                      {item.title}
                    </Text>
                    <Text title2 whiteColor semibold>
                      {item.price}
                    </Text>
                    <View style={styles.contentCartPromotion}>
                      <Button
                        style={styles.btnPromotion}
                        // onPress={() => {
                        //   navigation.navigate('PreviewBooking');
                        // }} 
                        onPress={() => navigation.navigate('HotelDetail', {
                          pressedAdd: item
                        })}
                      >
                        <Text body2 semibold whiteColor>
                          {t('View Ad')}
                        </Text>
                      </Button>
                      <View style={{ flexDirection: 'row', width: '65%', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <Icon name={'heart'} size={30} color={colors.primary} solid
                          onPress={() => {
                            // Alert.alert("HY")
                            if (userReducer.access_token) {

                              sharedMakeAddFavourite(item?.id)

                            } else {
                              navigation.navigate('Walkthrough')
                            }
                          }}
                        />

                      </View>
                    </View>

                  </Card>
                )}
              />
              {/* Most Searched Post Section End  here ===>>>>>>>>>>>>>>>>>>>>>>>>>>>.*/}



              {/* Recently Posted Section Start from here ===>>>>>>>>>>>>>>>>>>>>>>>>>>>.*/}

              <View style={styles.titleView}>
                <Text title3 semibold>
                  {recentPost.length ?
                    t('Recently Posted') : null}
                </Text>
              </View>

              <FlatList
                columnWrapperStyle={{ paddingLeft: 5, paddingRight: 20 }}
                numColumns={2}
                // data={hotels}
                data={recentPost}
                keyExtractor={(item, index) => item.id}
                renderItem={({ item, index }) => (
                  console.log("itemmmm= recent>>>>2..", item),

                  <HotelItem
                    grid

                    image={GV.imageUrlPrefix.concat(item.pictures[0]?.filename)}
                    name={item.title}
                    location={item.address ?? ''}
                    price={item.price}
                    available={item.available}
                    rate={item.rate}
                    rateStatus={item.rateStatus}
                    numReviews={item.numReviews}
                    services={item.services}
                    style={{ marginLeft: 15, marginBottom: 15 }}
                    // onPress={() => navigation.navigate('HotelDetail')}
                    onPress={() => navigation.navigate('HotelDetail', {
                      pressedAdd: item
                    })}
                    favIconOnPress={() => {
                      if (userReducer.access_token) {

                        sharedMakeAddFavourite(item?.id)

                      } else {
                        navigation.navigate('Walkthrough')
                      }

                    }}
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
