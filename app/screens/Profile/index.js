// import React, {useState} from 'react';
// import {View, ScrollView, TouchableOpacity} from 'react-native';
// import {useDispatch} from 'react-redux';
// import {AuthActions} from '@actions';
// import {BaseStyle, useTheme} from '@config';
// import {
//   Header,
//   SafeAreaView,
//   Icon,
//   Text,
//   Button,
//   ProfileDetail,
//   ProfilePerformance,
// } from '@components';
// import styles from './styles';
// import {UserData} from '@data';
// import {useTranslation} from 'react-i18next';

// export default function Profile({navigation}) {
//   const {colors} = useTheme();
//   const {t} = useTranslation();

//   const [loading, setLoading] = useState(false);
//   const [userData] = useState(UserData[0]);
//   const dispatch = useDispatch();

//   /**
//    * @description Simple logout with Redux
//    * @author Passion UI <passionui.com>
//    * @date 2019-08-03
//    */
//   const onLogOut = () => {
//     setLoading(true);
//     dispatch(AuthActions.authentication(false, response => {}));
//   };

//   return (
//     <View style={{flex: 1}}>
//       <Header
//         title={t('profile')}
//         renderRight={() => {
//           return <Icon name="bell" size={24} color={colors.primary} />;
//         }}
//         onPressRight={() => {
//           navigation.navigate('Notification');
//         }}
//       />
//       <SafeAreaView
//         style={BaseStyle.safeAreaView}
//         edges={['right', 'left', 'bottom']}>
//         <ScrollView>
//           <View style={styles.contain}>
//             <ProfileDetail
//               image={userData.image}
//               textFirst={userData.name}
//               point={userData.point}
//               textSecond={userData.address}
//               textThird={userData.id}
//               onPress={() => navigation.navigate('ProfileExanple')}
//             />

//             <TouchableOpacity
//               style={[
//                 styles.profileItem,
//                 {borderBottomColor: colors.border, borderBottomWidth: 1},
//               ]}
//               onPress={() => {
//                 navigation.navigate('ProfileEdit');
//               }}>
//               <Text body1>{t('edit_profile')}</Text>
//               <Icon
//                 name="angle-right"
//                 size={18}
//                 color={colors.primary}
//                 style={{marginLeft: 5}}
//                 enableRTL={true}
//               />
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={[
//                 styles.profileItem,
//                 {borderBottomColor: colors.border, borderBottomWidth: 1},
//               ]}
//               onPress={() => {
//                 navigation.navigate('ChangePassword');
//               }}>
//               <Text body1>{t('change_password')}</Text>
//               <Icon
//                 name="angle-right"
//                 size={18}
//                 color={colors.primary}
//                 style={{marginLeft: 5}}
//                 enableRTL={true}
//               />
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={[
//                 styles.profileItem,
//                 {borderBottomColor: colors.border, borderBottomWidth: 1},
//               ]}
//               onPress={() => {
//                 navigation.navigate('AboutUs');
//               }}>
//               <Text body1>{t('Help and Support')}</Text>
//               <View
//                 style={{
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                 }}>

//                 <Icon
//                   name="angle-right"
//                   size={18}
//                   color={colors.primary}
//                   style={{marginLeft: 5}}
//                   enableRTL={true}
//                 />
//               </View>
//             </TouchableOpacity>
//             {/* <TouchableOpacity
//               style={[
//                 styles.profileItem,
//                 {borderBottomColor: colors.border, borderBottomWidth: 1},
//               ]}
//               onPress={() => navigation.navigate('MyPaymentMethod')}>
//               <Text body1>{t('my_cards')}</Text>
//               <Icon
//                 name="angle-right"
//                 size={18}
//                 color={colors.primary}
//                 style={{marginLeft: 5}}
//                 enableRTL={true}
//               />
//             </TouchableOpacity> */}
//             <TouchableOpacity
//               style={styles.profileItem}
//               onPress={() => {
//                 navigation.navigate('Setting');
//               }}>
//               <Text body1>{t('setting')}</Text>
//               <Icon
//                 name="angle-right"
//                 size={18}
//                 color={colors.primary}
//                 style={{marginLeft: 5}}
//                 enableRTL={true}
//               />
//             </TouchableOpacity>
//           </View>
//         </ScrollView>
//         <View style={{paddingHorizontal: 20, paddingVertical: 15}}>
//           <Button full loading={loading} onPress={() => onLogOut()} 

//           >
//             {t('sign_out')}
//           </Button>
//         </View>
//       </SafeAreaView>
//     </View>
//   );
// }


import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AuthActions } from '@actions';
import { BaseStyle, useTheme } from '@config';
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  Button,
  ProfileDetail,
  ProfilePerformance,
} from '@components';
import styles from './styles';
import { UserData } from '@data';
import { useTranslation } from 'react-i18next';
import { setUserAction } from '../../actions/user';
import { CLEAR_USER_ACTION } from '../../actions/actionTypes';
import Toast from '../../components/Toast/Toast';

export default function Profile({ navigation }) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const userReducer = useSelector(state => state.userReducer)
  const { user } = userReducer
  console.log("userReducer=>>", userReducer);
  const [loading, setLoading] = useState(false);
  const [userData] = useState(UserData[0]);
  const dispatch = useDispatch();

  /**
   * @description Simple logout with Redux
   * @author Passion UI <passionui.com>
   * @date 2019-08-03
   */
  const onLogOut = () => {
    // setLoading(true);
    // dispatch(AuthActions.authentication(false, response => {}));
    dispatch(setUserAction({ user: {}, access_token: '' }))
    Toast.success("Successfully LogOut")
    navigation.navigate('Home')
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        title={t('profile')}
        renderRight={() => {
          return <Icon name="bell" size={24} color={colors.primary} />;
        }}
        onPressRight={() => {
          navigation.navigate('Notification');
        }}
      />
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={['right', 'left', 'bottom']}>
        <ScrollView>
          <View style={styles.contain}>
            <ProfileDetail
              // image={userData.image}
              image={user?.photo}
              textFirst={user.name}
              // point={userData.point}
              textSecond={user.address}
              textThird={user.email}
            // onPress={() => Alert.alert("hy")}
            />

            <TouchableOpacity
              style={[
                styles.profileItem,
                { borderBottomColor: colors.border, borderBottomWidth: 1 },
              ]}
              onPress={() => {
                navigation.navigate('ProfileEdit');
              }}>
              <Text body1>{t('edit_profile')}</Text>
              <Icon
                name="angle-right"
                size={18}
                color={colors.primary}
                style={{ marginLeft: 5 }}
                enableRTL={true}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.profileItem,
                { borderBottomColor: colors.border, borderBottomWidth: 1 },
              ]}
              onPress={() => {
                navigation.navigate('ChangePassword');
              }}>
              <Text body1>{t('change_password')}</Text>
              <Icon
                name="angle-right"
                size={18}
                color={colors.primary}
                style={{ marginLeft: 5 }}
                enableRTL={true}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.profileItem,
                { borderBottomColor: colors.border, borderBottomWidth: 1 },
              ]}
              onPress={() => {
                navigation.navigate('AboutUs');
              }}>
              <Text body1>{t('Help and Support')}</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>

                <Icon
                  name="angle-right"
                  size={18}
                  color={colors.primary}
                  style={{ marginLeft: 5 }}
                  enableRTL={true}
                />
              </View>
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={[
                styles.profileItem,
                {borderBottomColor: colors.border, borderBottomWidth: 1},
              ]}
              onPress={() => navigation.navigate('MyPaymentMethod')}>
              <Text body1>{t('my_cards')}</Text>
              <Icon
                name="angle-right"
                size={18}
                color={colors.primary}
                style={{marginLeft: 5}}
                enableRTL={true}
              />
            </TouchableOpacity> */}
            {/* <TouchableOpacity
              style={styles.profileItem}
              onPress={() => {
                navigation.navigate('Setting');
              }}>
              <Text body1>{t('setting')}</Text>
              <Icon
                name="angle-right"
                size={18}
                color={colors.primary}
                style={{marginLeft: 5}}
                enableRTL={true}
              />
            </TouchableOpacity> */}
          </View>
        </ScrollView>
        <View style={{ paddingHorizontal: 20, paddingVertical: 15 }}>
          <Button full loading={loading}
            onPress={() => onLogOut()}


          >
            {t('sign_out')}
          </Button>
        </View>
      </SafeAreaView>
    </View>
  );
}

