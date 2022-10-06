import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Icon, Text } from '@components';
import styles from './styles';
import PropTypes from 'prop-types';
import { BaseColor, useTheme } from '@config';
import { useSelector } from 'react-redux';
import GV from '../../utils/GV';

export default function ProfileDetail(props) {
  const { colors } = useTheme();
  const {
    style,
    image,
    styleLeft,
    styleThumb,
    styleRight,
    onPress,
    textFirst,
    point,
    textSecond,
    textThird,
    icon,
  } = props;
  const userReducer = useSelector(state => state.userReducer)
  const { user } = userReducer
  // console.log("user=>", user);
  // let splitted_Image = ''
  // let user_Profile_Pic = ''
  let splitted_Image = user?.photo?.split('.com/') ?? [];
  let user_Profile_Pic = GV.imageUrlPrefix.concat(splitted_Image[1])

  // if (user) {
  //   splitted_Image = user?.photo?.split('.com/');
  //   user_Profile_Pic = GV.imageUrlPrefix.concat(splitted_Image[1])

  // }else{
  //   splitted_Image = image.split('.com/');
  //   user_Profile_Pic = GV.imageUrlPrefix.concat(splitted_Image[1])
  // }
  // console.log("user==>pic",user_Profile_Pic);
  return (
    <TouchableOpacity
      style={[styles.contain, style]}
      onPress={onPress}
      activeOpacity={0.9}>
      <View style={[styles.contentLeft, styleLeft]}>
        <View>
          <Image


            source={{
              uri: user_Profile_Pic
            }} style={[styles.thumb, styleThumb]}


          />
          {
            point ?
              <View style={[styles.point, { backgroundColor: colors.primaryLight }]}>
                <Text overline whiteColor semibold>
                  {point}
                </Text>
              </View>
              : <View />
          }
        </View>
        <View style={{ alignItems: 'flex-start' }}>
          <Text headline semibold numberOfLines={1}>
            {textFirst}
          </Text>
          <Text
            body2
            style={{
              marginTop: 3,
              paddingRight: 10,
            }}
            numberOfLines={1}>
            {textSecond}
          </Text>
          <Text footnote grayColor numberOfLines={1}>
            {textThird}
          </Text>
        </View>
      </View>
      {icon && (
        <View style={[styles.contentRight, styleRight]}>
          <Icon
            name="angle-right"
            size={18}
            color={BaseColor.grayColor}
            enableRTL={true}
          />
        </View>
      )}
    </TouchableOpacity>
  );
}

ProfileDetail.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  image: PropTypes.node.isRequired,
  textFirst: PropTypes.string,
  point: PropTypes.string,
  textSecond: PropTypes.string,
  textThird: PropTypes.string,
  styleLeft: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleThumb: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleRight: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  icon: PropTypes.bool,
  onPress: PropTypes.func,
};

ProfileDetail.defaultProps = {
  image: '',
  textFirst: '',
  textSecond: '',
  icon: true,
  point: '',
  style: {},
  styleLeft: {},
  styleThumb: {},
  styleRight: {},
  onPress: () => { },
};
