import React from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import { Image, Icon, Text } from '@components';
import PropTypes from 'prop-types';
import styles from './styles';
import { useTheme } from '@config';
import { useTranslation } from 'react-i18next';
import Endpoints from '../../manager/Endpoints';
import { postRequest } from '../../manager/Apimanager';
import Toast from '../../components/Toast/Toast';


export default function Favourite(props) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { style, post_id, name, PostedOn, Views, calls, price, Likes, image, onPress } =
    props;

  // console.log("props=>", props);

  const deletePostHandler = () => {


    postRequest(Endpoints.DELETE_MY_ADS, {
      "post_id": post_id ?? ""
    }, (res) => {
      console.log("deletePostHandler===>>ress====>>>>>", JSON.stringify(res.data));
      if (res.data.status === 'success') {
        Toast.success(res.data.message)
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
        {/* <Icon name={'pencil-alt'} size={20} color={'#eae71b'} solid /> */}
        <Icon name={'trash'} size={20} color={'#eae71b'} solid
          onPress={() => { deletePostHandler() }} />

      </View>
      <View
        style={[
          styles.mainContent,
          { backgroundColor: colors.primary },
        ]}>
        <Image source={image} style={styles.blockImage} />

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
            Active
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

Favourite.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  name: PropTypes.string,
  checkIn: PropTypes.string,
  checkOut: PropTypes.string,
  total: PropTypes.string,
  price: PropTypes.string,
  onPress: PropTypes.func,
};

Favourite.defaultProps = {
  style: {},
  name: '',
  checkIn: '',
  checkOut: '',
  total: '',
  price: '',
  onPress: () => { },
};
