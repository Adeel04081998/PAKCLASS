// import React, {useState} from 'react';
// import {View, KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
// import {BaseStyle, useTheme} from '@config';
// import {useTranslation} from 'react-i18next';
// import {Header, SafeAreaView, Icon, Text, Button, TextInput} from '@components';
// import styles from './styles';
// import { useSelector } from 'react-redux';

// export default function ChangePassword({navigation}) {
//   const {t} = useTranslation();
//   const offsetKeyboard = Platform.select({
//     ios: 0,
//     android: 20,
//   });

//   const [loading, setLoading] = useState(false);
//   const [password, setPassword] = useState('');
//   const [repassword, setRepassword] = useState('');
//   const {colors} = useTheme();
//   const userReducer = useSelector(state => state.userReducer)
//   console.log("userReducer",userReducer);
//   const { user } = userReducer;


//   return (
//     <View style={{flex: 1}}>
//       <Header
//         title={t('change_password')}
//         renderLeft={() => {
//           return (
//             <Icon
//               name="arrow-left"
//               size={20}
//               color={colors.primary}
//               enableRTL={true}
//             />
//           );
//         }}
//         onPressLeft={() => {
//           navigation.goBack();
//         }}
//       />
//       <SafeAreaView
//         style={BaseStyle.safeAreaView}
//         edges={['right', 'left', 'bottom']}>
//         <KeyboardAvoidingView
//           behavior={Platform.OS === 'android' ? 'height' : 'padding'}
//           keyboardVerticalOffset={offsetKeyboard}
//           style={{flex: 1, justifyContent: 'center'}}>
//           <ScrollView
//             contentContainerStyle={{
//               flex: 1,
//               justifyContent: 'center',
//               padding: 20,
//             }}>
//             <View style={styles.contentTitle}>
//               <Text headline semibold>
//                 {t('password')}
//               </Text>
//             </View>
//             <TextInput
//               onChangeText={text => setPassword(text)}
//               secureTextEntry={true}
//               placeholder="Password"
//               value={password}
//             />
//             <View style={styles.contentTitle}>
//               <Text headline semibold>
//                 {t('re_password')}
//               </Text>
//             </View>
//             <TextInput
//               onChangeText={text => setRepassword(text)}
//               secureTextEntry={true}
//               placeholder={t('password_confirm')}
//               value={repassword}
//             />
//             <View style={{paddingVertical: 15}}>
//               <Button
//                 loading={loading}
//                 full
//                 onPress={() => {
//                   setLoading(true);

//                   setTimeout(() => {
//                     navigation.goBack();
//                   }, 500);
//                 }}>
//                 {t('confirm')}
//               </Button>
//             </View>
//           </ScrollView>
//         </KeyboardAvoidingView>
//       </SafeAreaView>
//     </View>
//   );
// }

import React, { useState } from 'react';
import { View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { BaseStyle, useTheme } from '@config';
import { useTranslation } from 'react-i18next';
import { Header, SafeAreaView, Icon, Text, Button, TextInput } from '@components';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { sharedExceptionHandler } from '../../helpers/sharedActions';
import { postRequest } from '../../manager/Apimanager';
import Endpoints from '../../manager/Endpoints';
import { setUserAction } from '../../actions/user';
import Toast from '../../components/Toast/Toast';

export default function ChangePassword({ navigation }) {
  const { t } = useTranslation();
  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [oldPassword, setOldPassword] = useState(__DEV__ ? 'Abc12345678' : '');
  const [password, setPassword] = useState(__DEV__ ? 'Abc1234567' : '');
  const [repassword, setRepassword] = useState(__DEV__ ? 'Abc1234567' : '');
  const { colors } = useTheme();
  const userReducer = useSelector(state => state.userReducer)
  console.log("userReducer", userReducer);
  const { user } = userReducer;

  const onChangePasswordHandler = () => {

    postRequest(Endpoints.CHANGE_PASSWORD, {
      'user_id': user.id,
      'old_password': oldPassword ?? '',
      'confirm_password': repassword ?? '',
      'password': password ?? '',
    }, (res) => {

      console.log('if signup==============  res res  .data', JSON.stringify(res.data));


      if (res.data?.status === 'success') {
        const { userdata } = res.data

        dispatch(setUserAction({ user: userdata, }))
        Toast.success(res.data.message)
        navigation.navigate('Home')

      }

    }, err => {
      console.log('if sign_up error=>>>>>>>>>>>>>>>>', err.data);
      if (err.data?.status === "error") {

        Toast.info(err.data.message.old_password)


      }
    });

  }


  return (
    <View style={{ flex: 1 }}>
      <Header
        title={t('change_password')}
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
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={['right', 'left', 'bottom']}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'android' ? 'height' : 'padding'}
          keyboardVerticalOffset={offsetKeyboard}
          style={{ flex: 1, justifyContent: 'center' }}>
          <ScrollView
            contentContainerStyle={{
              flex: 1,
              justifyContent: 'center',
              padding: 20,
            }}>
            <View style={styles.contentTitle}>
              <Text headline semibold>
                {t('old Password')}
              </Text>
            </View>
            <TextInput
              onChangeText={text => setOldPassword(text)}
              secureTextEntry={true}
              placeholder="please enter old Password"
              value={oldPassword}
            />
            <View style={styles.contentTitle}>
              <Text headline semibold>
                {t('new Password')}
              </Text>
            </View>
            <TextInput
              onChangeText={text => setPassword(text)}
              secureTextEntry={true}
              placeholder="please Enter New Password"
              value={password}
            />
            <View style={styles.contentTitle}>
              <Text headline semibold>
                {t('re_password')}
              </Text>
            </View>
            <TextInput
              onChangeText={text => setRepassword(text)}
              secureTextEntry={true}
              placeholder={t('password_confirm Password')}
              value={repassword}
            />
            <View style={{ paddingVertical: 15 }}>
              <Button
                loading={loading}
                full
                onPress={() => {
                  onChangePasswordHandler()
                }}>
                {t('confirm')}
              </Button>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
