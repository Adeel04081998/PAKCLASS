import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Image, Icon, Text} from '@components';
import PropTypes from 'prop-types';
import styles from './styles';
import {useTheme} from '@config';
import {useTranslation} from 'react-i18next';

export default function BookingHistory(props) {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const {style, name, PostedOn, Views, calls, price, Likes, image, onPress} =
    props;

  return (
    <TouchableOpacity
      style={[styles.contain, {shadowColor: colors.border}, style]}
      onPress={onPress}
      activeOpacity={0.9}>
      <View
        style={[
          styles.nameContent,
          {
            borderBottomColor: colors.card,
            backgroundColor: colors.primary,
          },
        ]}>
        <Text body2 whiteColor semibold>
          {name}
        </Text>
        <Icon name={'trash'} size={20} color={'#eae71b'} solid />
      </View>
      <View style={[styles.mainContent, {backgroundColor: colors.primary}]}>
        <Image source={image} style={styles.blockImage} />

        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <Text caption2 whiteColor>
            {t('Posted On')}
          </Text>
          <Text caption2 whiteColor bold>
            {PostedOn}
          </Text>
          <Text caption2 whiteColor>
            {t('Price')}
          </Text>
          <Text body1 whiteColor semibold>
            {price}
          </Text>
          <Text caption2 whiteColor>
            {t('Status')}
          </Text>
          <Text caption2 whiteColor bold>
            Active
          </Text>
        </View>
      </View>
      <View style={[styles.validContent, {backgroundColor: colors.card}]}>
        <Text overline semibold>
          <Icon name={'eye'} size={10} color={'grey'} solid /> {Views}
        </Text>
        <Text overline semibold>
          <Icon name={'phone'} size={10} color={'grey'} solid /> {calls}
        </Text>
        <Text overline semibold>
          <Icon name={'heart'} size={10} color={'grey'} solid /> {Likes}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

BookingHistory.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  name: PropTypes.string,
  checkIn: PropTypes.string,
  checkOut: PropTypes.string,
  total: PropTypes.string,
  price: PropTypes.string,
  onPress: PropTypes.func,
};

BookingHistory.defaultProps = {
  style: {},
  name: '',
  checkIn: '',
  checkOut: '',
  total: '',
  price: '',
  onPress: () => {},
};
