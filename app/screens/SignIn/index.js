import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AuthActions } from '@actions';
import {
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { BaseStyle, useTheme } from '@config';
import { Header, SafeAreaView, Icon, Text, Button, TextInput } from '@components';
import styles from './styles';
import { useTranslation } from 'react-i18next';
import { postRequest } from '../../manager/Apimanager';
import Endpoints from '../../manager/Endpoints';
import { setUserAction } from '../../actions/user';
import { sharedExceptionHandler } from '../../helpers/sharedActions';
import Toast from '../../components/Toast/Toast';

export default function SignIn({ navigation }) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });

  // const [id, setId] = useState('');
  const [email, setEmail] = useState('usamaalam46@gmail.com"');

  const [password, setPassword] = useState('12345678');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState({ email: true, password: true });

  /**
   * call when action login
   *
   */
  const onLogin = () => {
    if (email == '' || password == '') {
      setSuccess({
        ...success,
        email: false,
        password: false,
      });
    } else {
      setLoading(true);

      postRequest(Endpoints.Login, {
        'email': email,
        'password': password,
      }, (res) => {
        setLoading(false);
        console.log('if signin==============  res', JSON.stringify(res.data));
        const { access_token, user, status, failed } = res.data
        if (status === 'Success') {
          dispatch(setUserAction({ user: user, access_token: access_token }))
          Toast.success("Successfully Login")
          navigation.navigate('Home')
        }
        else if (failed) {
          setLoading(false);
          sharedExceptionHandler(res.data)

        }

      }, err => {
        setLoading(false);
Toast.error("Invalid credentials")
        console.log('if sign_IN error=>>>>>>>>>>>>>>>>', err);
      }, {}, false);


      // setLoading(true);
      // dispatch(
      //   AuthActions.authentication(true, response => {
      //     setLoading(false);
      //     navigation.goBack();
      //   }),
      // );
    }
  };

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
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={['right', 'left', 'bottom']}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'android' ? 'height' : 'padding'}
          keyboardVerticalOffset={offsetKeyboard}
          style={{ flex: 1 }}>
          <View style={styles.contain}>
            <TextInput
              onChangeText={text => setEmail(text)}
              onFocus={() => {
                setSuccess({
                  ...success,
                  email: true,
                });
              }}
              placeholder={t('Enter Email')}
              success={success.email}
              value={email}
            />
            <TextInput
              style={{ marginTop: 10 }}
              onChangeText={text => setPassword(text)}
              onFocus={() => {
                setSuccess({
                  ...success,
                  password: true,
                });
              }}
              placeholder={t('Enter Password')}
              secureTextEntry={true}
              success={success.password}
              value={password}
            />
            <Button
              style={{ marginTop: 20 }}
              full
              loading={loading}
              onPress={() => {
                onLogin();
              }}>
              {t('sign_in')}
            </Button>
            <TouchableOpacity
              onPress={() => navigation.navigate('ResetPassword')}>
              <Text body1 grayColor style={{ marginTop: 25 }}>
                {t('forgot_your_password')}
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}





// import React, {useState} from 'react';
// import {useDispatch} from 'react-redux';
// import {AuthActions} from '@actions';
// import {
//   View,
//   TouchableOpacity,
//   KeyboardAvoidingView,
//   Platform,
// } from 'react-native';
// import {BaseStyle, useTheme} from '@config';
// import {Header, SafeAreaView, Icon, Text, Button, TextInput} from '@components';
// import styles from './styles';
// import {useTranslation} from 'react-i18next';

// export default function SignIn({navigation}) {
//   const {colors} = useTheme();
//   const {t} = useTranslation();
//   const dispatch = useDispatch();
//   const offsetKeyboard = Platform.select({
//     ios: 0,
//     android: 20,
//   });

//   // const [id, setId] = useState('');
//   const [id, setId] = useState('');

//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState({id: true, password: true});

//   /**
//    * call when action login
//    *
//    */
//   const onLogin = () => {
//     if (id == '' || password == '') {
//       setSuccess({
//         ...success,
//         id: false,
//         password: false,
//       });
//     } else {
//       setLoading(true);
//       dispatch(
//         AuthActions.authentication(true, response => {
//           setLoading(false);
//           navigation.goBack();
//         }),
//       );
//     }
//   };

//   return (
//     <View style={{flex: 1}}>
//       <Header
//         title={t('sign_in')}
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
//           style={{flex: 1}}>
//           <View style={styles.contain}>
//             <TextInput
//               onChangeText={text => setId(text)}
//               onFocus={() => {
//                 setSuccess({
//                   ...success,
//                   id: true,
//                 });
//               }}
//               placeholder={t('Enter Email')}
//               success={success.id}
//               value={id}
//             />
//             <TextInput
//               style={{marginTop: 10}}
//               onChangeText={text => setPassword(text)}
//               onFocus={() => {
//                 setSuccess({
//                   ...success,
//                   password: true,
//                 });
//               }}
//               placeholder={t('Enter Password')}
//               secureTextEntry={true}
//               success={success.password}
//               value={password}
//             />
//             <Button
//               style={{marginTop: 20}}
//               full
//               loading={loading}
//               onPress={() => {
//                 onLogin();
//               }}>
//               {t('sign_in')}
//             </Button>
//             <TouchableOpacity
//               onPress={() => navigation.navigate('ResetPassword')}>
//               <Text body1 grayColor style={{marginTop: 25}}>
//                 {t('forgot_your_password')}
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </KeyboardAvoidingView>
//       </SafeAreaView>
//     </View>
//   );
// }

