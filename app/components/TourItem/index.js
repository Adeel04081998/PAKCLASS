import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Image, Text, Icon, StarRating, Tag, ProfileDetail} from '@components';
import {BaseColor, useTheme} from '@config';
import PropTypes from 'prop-types';
import styles from './styles';
import {useTranslation} from 'react-i18next';
export default function TourItem(props) {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const {
    list,
    block,
    grid,
    style,
    image,
    name,
    price,
    rate,
    rateCount,
    author,
    onPress,
    onPressUser,
    onPressBookNow,
    location,
    startTime,
    services,
    travelTime,
  } = props;

  /**
   * Display Tour item as block
   */
  const renderBlock = () => {
    return (
      <View style={style}>
        <View style={{paddingHorizontal:10}}>
        <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
          <Image source={image} style={styles.blockImage} />
          <View
            style={[
              styles.blockPriceContent,
              {backgroundColor: colors.primary},
            ]}>
            <Text title3 whiteColor semibold>
              {price}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            title3
            semibold
           
            numberOfLines={1}>
            {name}
          </Text>
          <Icon name={'heart'} size={20} color={'grey'} solid />
        </View>
        
          <Text
            caption2
            grayColor
            style={{
              marginLeft: 3,
            }}>
            <Icon name="map-marker-alt" color={colors.primary} size={10} />{' '}
            {location}
          </Text>
          <Text
                caption1
                grayColor
                style={{
                  marginLeft: 3,
                }}>
                {startTime}
              </Text>
        
        
        <Text
          primaryColor
          semibold
          style={{
            marginTop: 5,
          }}>
          {price}
        </Text>
        </View>
      </View>
    );
  };

  /**
   * Display Tour item as list
   */
  const renderList = () => {
    return (
      <View style={[styles.listContent, style]}>
        <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
          <Image source={image} style={styles.listImage} />
        </TouchableOpacity>
        <View style={styles.listContentRight}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text headline semibold>
              {name}
            </Text>
            <Icon name={'heart'} size={15} color={'grey'} solid />
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 5,
            }}>
            <View style={styles.listContentIcon}>
              <Icon
                name="calendar-alt"
                color={BaseColor.grayColor}
                size={10}
                solid
              />
              <Text
                caption1
                grayColor
                style={{
                  marginLeft: 3,
                }}>
                {startTime}
              </Text>
            </View>
            <View style={styles.listContentIcon}>
              <Icon
                name="map-marker-alt"
                color={BaseColor.grayColor}
                size={10}
              />
              <Text
                caption1
                grayColor
                style={{
                  marginLeft: 3,
                }}>
                {location}
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              marginTop: 5,
            }}>
            <Text title3 primaryColor semibold>
              {price}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  /**
   * Display Tour item as grid
   */
  const renderGrid = () => {
    return (
      <View style={[styles.girdContent, style]}>
        <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
          <Image source={image} style={styles.girdImage} />
        </TouchableOpacity>
        <View style={styles.girdContentLocation}>
          <Text
            caption2
            grayColor
            style={{
              marginLeft: 3,
            }}>
            <Icon name="map-marker-alt" color={colors.primary} size={10} />{' '}
            {location}
          </Text>
          <Icon name={'heart'} size={15} color={'grey'} solid />
        </View>
        <Text
          body2
          semibold
          style={{
            marginTop: 5,
          }}
          numberOfLines={1}>
          {name}
        </Text>
        <View style={styles.girdContentRate}>
          <Text caption1 accentColor>
            {travelTime}
          </Text>
        </View>
        <Text
          primaryColor
          semibold
          style={{
            marginTop: 5,
          }}>
          {price}
        </Text>
      </View>
    );
  };

  if (grid) return renderGrid();
  else if (block) return renderBlock();
  else return renderList();
}

TourItem.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  list: PropTypes.bool,
  block: PropTypes.bool,
  grid: PropTypes.bool,
  image: PropTypes.node.isRequired,
  name: PropTypes.string,
  location: PropTypes.string,
  startTime: PropTypes.string,
  price: PropTypes.string,
  travelTime: PropTypes.string,
  rateCount: PropTypes.string,
  rate: PropTypes.number,
  numReviews: PropTypes.number,
  author: PropTypes.object,
  services: PropTypes.array,
  onPress: PropTypes.func,
  onPressBookNow: PropTypes.func,
  onPressUser: PropTypes.func,
};

TourItem.defaultProps = {
  style: {},
  list: true,
  block: false,
  grid: false,
  image: '',
  name: '',
  location: '',
  price: '',
  rate: 0,
  rateCount: '',
  numReviews: 0,
  travelTime: '',
  startTime: '',
  author: {},
  services: [],
  onPress: () => {},
  onPressBookNow: () => {},
  onPressUser: () => {},
};
