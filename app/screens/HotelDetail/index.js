


import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  FlatList,
  Animated,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import { BaseColor, useTheme } from '@config';
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  StarRating,
  PostListItem,
  ProfileDetail,
  HelpBlock,
  Button,
  RoomType,
  HotelItem
} from '@components';
import * as Utils from '@utils';
import { InteractionManager } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import styles from './styles';
import { HelpBlockData } from '@data';
import { useTranslation } from 'react-i18next';
import { UserData } from '@data';
import { getRequest } from '../../manager/Apimanager';
import Endpoints from '../../manager/Endpoints';
import { sharedExceptionHandler } from '../../helpers/sharedActions';
import { Images } from '../../config/images'
import SliderImage from '../../components/SliderImage';
import GV from '../../utils/GV';
import userReducer from '../../reducers/userReducer';
import { useSelector } from 'react-redux';

export default function HotelDetail({ navigation, route }) {

  const { colors } = useTheme();
  const { t } = useTranslation();
  const [userData] = useState(UserData[0]);
  const [heightHeader, setHeightHeader] = useState(Utils.heightHeader());
  const [renderMapView, setRenderMapView] = useState(false);
  const [region] = useState({
    latitude: 25.96146850382255,
    longitude: 69.89856876432896,
    latitudeDelta: 24.20619842968337,
    longitudeDelta: 15.910217463970177,

  });

  const [roomType] = useState([
    {
      id: '1',
      image: Images.room8,
      name: 'Standard Twin Room',
      price: '$399,99',
      available: 'Hurry Up! This is your last room!',
      services: [
        { icon: 'wifi', name: 'Free Wifi' },
        { icon: 'shower', name: 'Shower' },
        { icon: 'users', name: 'Max 3 aduts' },
        { icon: 'subway', name: 'Nearby Subway' },
      ],
    },
    {
      id: '2',
      image: Images.room5,
      name: 'Delux Room',
      price: '$399,99',
      available: 'Hurry Up! This is your last room!',
      services: [
        { icon: 'wifi', name: 'Free Wifi' },
        { icon: 'shower', name: 'Shower' },
        { icon: 'users', name: 'Max 3 aduts' },
        { icon: 'subway', name: 'Nearby Subway' },
      ],
    },
  ]);
  const [todo] = useState([
    {
      id: '1',
      title: 'South Travon',
      image: Images.trip1,
    },
    {
      id: '2',
      title: 'South Travon',
      image: Images.trip2,
    },
    {
      id: '3',
      title: 'South Travon',
      image: Images.trip3,
    },
    {
      id: '4',
      title: 'South Travon',
      image: Images.trip4,
    },
    {
      id: '5',
      title: 'South Travon',
      image: Images.trip5,
    },
  ]);
  const [helpBlock] = useState(HelpBlockData);
  const deltaY = new Animated.Value(0);
  const [AddDetails, SetAddDetails] = useState({})
  const [showData, setShowData] = useState(false)

  const userReducer = useSelector(state => state.userReducer)
  console.log("userReducer", userReducer);
  const postId = route?.params?.pressedAdd.id ? route?.params?.pressedAdd.id : '0'

  const loadPostDetails = () => {
    getRequest(`${Endpoints.Posts}/${postId}`, (res) => {

      console.log("res=>>>PostDetail", res.data);
      const { access_token, post, status, failed, message } = res.data

      if (status === 'success') {
        // console.log("post=>>>>>>>>>",post);
        SetAddDetails(post)
        setShowData(true)
      }



    },
      (err) => {
        console.log("errr=>>>> PostDetails", JSON.stringify(err.data));
        sharedExceptionHandler(err)

      })
  }

  useEffect(() => {
    console.log("hy");
    loadPostDetails()


  }, []);
  console.log("AddDetails===============>>>>>>", AddDetails);


  const heightImageBanner = Utils.scaleWithPixel(250, 1);
  const marginTopBanner = heightImageBanner - heightHeader - 40;
  const mobilenumber = AddDetails?.phone ? AddDetails?.phone : '923005069491'
  if (!showData) return <View style={{}} />
  else {
    return (
      <View style={{ flex: 1 }}>
        <Header
          title={t('sign_in')}
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





        {/* <Animated.Image
          source={Images.room6}
          style={[
            styles.imgBanner,
            {
              height: deltaY.interpolate({
                inputRange: [
                  0,
                  Utils.scaleWithPixel(200),
                  Utils.scaleWithPixel(200),
                ],
                outputRange: [heightImageBanner, heightHeader, heightHeader],
              }),
            },
          ]}
        /> */}
        <View>
          <SliderImage
            data={AddDetails?.pictures}
            horizontalScrool={true}
            isServerPic={true}
            imageHeight={250}
          />
        </View>





        <SafeAreaView style={{ flex: 1, }} edges={['right', 'left', 'bottom']}>
          <ScrollView
            onScroll={Animated.event([
              {
                nativeEvent: {
                  contentOffset: { y: deltaY },
                },
              },
            ])}
            onContentSizeChange={() => setHeightHeader(Utils.heightHeader())}
            scrollEventThrottle={8}>
            {/* Main Container */}
            <View style={{ paddingHorizontal: 20 }}>
              {/* Information */}
              <View
                style={[
                  styles.contentBoxTop,
                  {
                    // marginTop: marginTopBanner,
                    backgroundColor: colors.card,
                    shadowColor: colors.border,
                    borderColor: colors.border,
                  },
                ]}>
                <Text title4 semibold style={{ marginBottom: 5 }}>
                  {/* Ad Title */}
                  {AddDetails?.title ? AddDetails.title : "Hello"}
                </Text>
                <View>
                  <Text title3 primaryColor semibold>
                    {/* RS 2000 */}
                    {AddDetails?.price ? AddDetails?.price : "2300"}
                  </Text>
                </View>
                <View
                  body2
                  style={{
                    marginTop: 5,
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'row',
                  }}>
                  <Text caption2 grayColor style={{ marginBottom: 5, right: 10, fontSize: 17 }}>
                    <Icon name={'map-marker-alt'} size={20} color={'grey'} solid

                    />
                    {AddDetails.address}
                  </Text>
                  <Text caption2 grayColor style={{ marginBottom: 5, fontSize: 17 }}>
                    <Icon name={'calendar'} size={20} color={'grey'} solid />
                    {/* {'   2 days ago '} */}
                    {AddDetails?.created_at_ta ? AddDetails?.created_at_ta : "21-04-2012"}
                  </Text>
                </View>
              </View>
              {/* Rating Review */}
              <View
                style={[styles.blockView, { borderBottomColor: colors.border }]}>
                <ProfileDetail
                  image={AddDetails?.user?.photo}
                  // textFirst={'Ahmed K'}
                  textFirst={AddDetails?.contact_name ? AddDetails?.contact_name : userReducer?.user?.name}
                  point={userData?.point ? userData.point : '0'}
                  textSecond={'Member since 2021'}
                  textThird={'View Profile'}

                // onPress={() => { navigation.navigate('ProfileExanple') }}
                />
              </View>
              {/* Description */}
              <View
                style={[styles.blockView, { borderBottomColor: colors.border }]}>
                <Text headline semibold>
                  {t('Description')}
                </Text>
                <Text body2 style={{ marginTop: 5 }}>
                  {AddDetails?.description ? AddDetails?.description : "hello test"}
                </Text>
              </View>
              {/* Facilities Icon */}

              {/* Map location */}
              <View
                style={[styles.blockView, { borderBottomColor: colors.border }]}>
                <Text headline style={{ marginBottom: 5 }} semibold>
                  {t('location')}
                </Text>
                <Text body2 numberOfLines={2}>
                  {AddDetails.address}

                </Text>
                <View
                  style={{
                    height: 180,
                    width: '100%',
                    marginTop: 10,
                  }}>
                  {/* {renderMapView && (
                    <MapView
                      provider={PROVIDER_GOOGLE}
                      style={styles.map}
                      region={region}

                      onRegionChange={(location) => {

                      }}>
                      <Marker
                        coordinate={{
                          latitude: AddDetails.lat ? AddDetails.lat : 1.9344,
                          longitude: AddDetails.lon ? AddDetails.lon : 103.358727,
                          // latitude: 33.738045,for islamabad
                          // longitude: 73.084488,
                        }}

                      />

                    </MapView>
                  )} */}
                </View>
              </View>
              {/* Rooms */}
              {/* <View
                style={[styles.blockView, { borderBottomColor: colors.border }]}>
                <Text headline semibold>
                  {t('Similar Deals')}
                </Text>
                <FlatList
                  data={roomType}
                  keyExtractor={(item, index) => item.id}
                  renderItem={({ item }) => (
                    console.log("iteeem=>>>>>", item),
                    <HotelItem
                      grid
                      // image={item.image}
                      name={item.name}
                      location={"location"}
                      price={"Rs 256"}
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
              </View> */}
            </View>
          </ScrollView>
          {/* Pricing & Booking Process */}
          <View
            style={[styles.contentButtonBottom, { borderTopColor: colors.border }]}>
            <TouchableOpacity
              style={styles.itemService}
              activeOpacity={0.9}
            // onPress={() => {
            //   navigation.navigate(item.route);
            // }}
            >
              <View
                style={[styles.iconContent, { backgroundColor: colors.primary }]}>
                <Icon name={'comment'} size={10} color={'white'} solid />
                <Text caption2 whiteColor>
                  Chat
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.itemService}
              activeOpacity={0.9}
            // onPress={() => {
            //   navigation.navigate(item.route);
            // }}
            >
              <TouchableOpacity
                style={[styles.iconContent, { backgroundColor: colors.primary }]}
                onPress={() => {
                  Linking.openURL(`tel:${mobilenumber ? mobilenumber : '923005069491'}`)

                }}
              >
                <Icon name={'phone'} size={10} color={'white'} solid


                />
                <Text caption2 whiteColor>
                  Call
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.itemService}
              activeOpacity={0.9}
              onPress={() => {
                // const separator = Platform.OS === 'ios' ? '&' : '?'
                // const url = `sms:${cellNo}${separator}body=${message}`
                Linking.openURL(`sms:${mobilenumber ? mobilenumber : '923005069491'}`)

              }}
            >
              <View
                style={[styles.iconContent, { backgroundColor: colors.primary }]}>
                <Icon name={'envelope'} size={10} color={'white'} solid />
                <Text caption2 whiteColor>
                  SMS
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    );
  }

}

