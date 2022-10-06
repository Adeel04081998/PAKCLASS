import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Icon, Text } from '@components';
import PropTypes from 'prop-types';
import styles from './styles';
import { useTheme } from '@config';
import { useTranslation } from 'react-i18next';
import { postRequest } from '../../manager/Apimanager';
import Endpoints from '../../manager/Endpoints';
import Toast from '../../components/Toast/Toast';
// import Toast from '../../components/Toast/Toast';


export default function BookingHistory(props) {
  const { t } = useTranslation();
  const { colors } = useTheme();

  const { style, post_id, name, PostedOn, Views, calls, price, Likes, image, onPress, status, location } = props

  const deletePostHandler = () => {


    postRequest(Endpoints.DELETE_MY_ADS, {
      "post_id": post_id ?? ""
    }, (res) => {
      console.log("deletePostHandler===>>ress====>>>>>", JSON.stringify(res.data));
      if (res.data.status === 'success') {
        Toast.success(res.data.message)
        nav
      }
    }, (err) => {
      console.log("deletePostHandler===>>errr", err);

    })
  }
  return (
    <TouchableOpacity
      style={[styles.contain, { shadowColor: colors.border }, style]}
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
        <Icon name={'trash'} size={20} color={'#eae71b'} solid
          onPress={() => { deletePostHandler() }}
        />
      </View>
      <View style={[styles.mainContent, { backgroundColor: colors.primary }]}>
        {/* <Image source={image} style={styles.blockImage} />
         */}
        <Image
          source={{
            // uri: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80'
            uri: image
          }}
          style={styles.blockImage}

        />
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
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
            {/* Active */}
            {status}

          </Text>
          <Text caption2 whiteColor>
            {t('Location')}
          </Text>
          <Text caption2 whiteColor bold>
            {/* Active */}
            {location}

          </Text>
        </View>
      </View>
      <View style={[styles.validContent, { backgroundColor: colors.card }]}>
        {/* <Text overline semibold>
          <Icon name={'eye'} size={10} color={'grey'} solid /> {Views}
        </Text>
        <Text overline semibold>
          <Icon name={'phone'} size={10} color={'grey'} solid /> {calls}
        </Text>
        <Text overline semibold>
          <Icon name={'heart'} size={10} color={'grey'} solid /> {Likes}
        </Text> */}
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
  status: PropTypes.string,
  onPress: PropTypes.func,
};

BookingHistory.defaultProps = {
  style: {},
  name: '',
  checkIn: '',
  checkOut: '',
  total: '',
  price: '',
  status: 'Active',
  onPress: () => { },
};
