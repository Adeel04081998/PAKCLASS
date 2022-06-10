import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  FlatList,
  Animated,
  TouchableOpacity,
} from 'react-native';
import {BaseColor, Images, useTheme} from '@config';
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
import {InteractionManager} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import styles from './styles';
import {HelpBlockData} from '@data';
import {useTranslation} from 'react-i18next';
import {UserData} from '@data';

export default function HotelDetail({navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const [userData] = useState(UserData[0]);
  const [heightHeader, setHeightHeader] = useState(Utils.heightHeader());
  const [renderMapView, setRenderMapView] = useState(false);
  const [region] = useState({
    latitude: 1.9344,
    longitude: 103.358727,
    latitudeDelta: 0.05,
    longitudeDelta: 0.004,
  });
  const [roomType] = useState([
    {
      id: '1',
      image: Images.room8,
      name: 'Standard Twin Room',
      price: '$399,99',
      available: 'Hurry Up! This is your last room!',
      services: [
        {icon: 'wifi', name: 'Free Wifi'},
        {icon: 'shower', name: 'Shower'},
        {icon: 'users', name: 'Max 3 aduts'},
        {icon: 'subway', name: 'Nearby Subway'},
      ],
    },
    {
      id: '2',
      image: Images.room5,
      name: 'Delux Room',
      price: '$399,99',
      available: 'Hurry Up! This is your last room!',
      services: [
        {icon: 'wifi', name: 'Free Wifi'},
        {icon: 'shower', name: 'Shower'},
        {icon: 'users', name: 'Max 3 aduts'},
        {icon: 'subway', name: 'Nearby Subway'},
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

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      setRenderMapView(true);
    });
  }, []);

  const heightImageBanner = Utils.scaleWithPixel(250, 1);
  const marginTopBanner = heightImageBanner - heightHeader - 40;

  return (
    <View style={{flex: 1}}>
      <Animated.Image
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
      />
      {/* Header */}
      <Header
        title=""
        renderLeft={() => {
          return (
            <Icon
              name="arrow-left"
              size={20}
              color={BaseColor.whiteColor}
              enableRTL={true}
            />
          );
        }}
        renderRight={() => {
          return <Icon name="images" size={20} color={BaseColor.whiteColor} />;
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
        onPressRight={() => {
          navigation.navigate('PreviewImage');
        }}
      />
      <SafeAreaView style={{flex: 1}} edges={['right', 'left', 'bottom']}>
        <ScrollView
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {y: deltaY},
              },
            },
          ])}
          onContentSizeChange={() => setHeightHeader(Utils.heightHeader())}
          scrollEventThrottle={8}>
          {/* Main Container */}
          <View style={{paddingHorizontal: 20}}>
            {/* Information */}
            <View
              style={[
                styles.contentBoxTop,
                {
                  marginTop: marginTopBanner,
                  backgroundColor: colors.card,
                  shadowColor: colors.border,
                  borderColor: colors.border,
                },
              ]}>
              <Text title4 semibold style={{marginBottom: 5}}>
                Ad Title
              </Text>
              <View>
                <Text title3 primaryColor semibold>
                  RS 2000
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
               <Text caption2 grayColor style={{marginBottom: 5}}>
                <Icon name={'map-marker-alt'} size={10} color={'grey'} solid />
                {'   Location   '}
              </Text>
                <Text caption2 grayColor style={{marginBottom: 5}}>
                  <Icon name={'calendar'} size={10} color={'grey'} solid />
                  {'   2 days ago '}
                </Text>
              </View>
            </View>
            {/* Rating Review */}
            <View
              style={[styles.blockView, {borderBottomColor: colors.border}]}>
              <ProfileDetail
                image={userData.image}
                textFirst={'Ahmed K'}
                point={userData.point}
                textSecond={'Member since 2021'}
                textThird={'View Profile'}
                onPress={() => navigation.navigate('ProfileExanple')}
              />
            </View>
            {/* Description */}
            <View
              style={[styles.blockView, {borderBottomColor: colors.border}]}>
              <Text headline semibold>
                {t('Description')}
              </Text>
              <Text body2 style={{marginTop: 5}}>
                Good condition 1 hand use only serious buyer contact.. i am
                selling cuz need money
              </Text>
            </View>
            {/* Facilities Icon */}

            {/* Map location */}
            <View
              style={[styles.blockView, {borderBottomColor: colors.border}]}>
              <Text headline style={{marginBottom: 5}} semibold>
                {t('location')}
              </Text>
              <Text body2 numberOfLines={2}>
                218 Austen Mountain, consectetur adipiscing, sed do eiusmod
                tempor incididunt ut labore et …
              </Text>
              <View
                style={{
                  height: 180,
                  width: '100%',
                  marginTop: 10,
                }}>
                {renderMapView && (
                  <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    region={region}
                    onRegionChange={() => {}}>
                    <Marker
                      coordinate={{
                        latitude: 1.9344,
                        longitude: 103.358727,
                      }}
                    />
                  </MapView>
                )}
              </View>
            </View>
            {/* Rooms */}
            <View
              style={[styles.blockView, {borderBottomColor: colors.border}]}>
              <Text headline semibold>
                {t('Similar Deals')}
              </Text>
              <FlatList
                data={roomType}
                keyExtractor={(item, index) => item.id}
                renderItem={({item}) => (
                  <HotelItem
                  grid
                  image={item.image}
                  name={item.name}
                  location={"location"}
                  price={"Rs 256"}
                  available={item.available}
                  rate={item.rate}
                  rateStatus={item.rateStatus}
                  numReviews={item.numReviews}
                  services={item.services}
                  style={{marginLeft: 15, marginBottom: 15}}
                  onPress={() => navigation.navigate('HotelDetail')}
                />
                )}
              />
            </View>
          </View>
        </ScrollView>
        {/* Pricing & Booking Process */}
        <View
          style={[styles.contentButtonBottom, {borderTopColor: colors.border}]}>
          <TouchableOpacity
            style={styles.itemService}
            activeOpacity={0.9}
            // onPress={() => {
            //   navigation.navigate(item.route);
            // }}
          >
            <View
              style={[styles.iconContent, {backgroundColor: colors.primary}]}>
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
            <View
              style={[styles.iconContent, {backgroundColor: colors.primary}]}>
              <Icon name={'phone'} size={10} color={'white'} solid />
              <Text caption2 whiteColor>
                Call
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
            <View
              style={[styles.iconContent, {backgroundColor: colors.primary}]}>
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
