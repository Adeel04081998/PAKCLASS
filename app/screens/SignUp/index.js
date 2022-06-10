import React, { useState } from 'react';
import { View, KeyboardAvoidingView, Platform } from 'react-native';
import { BaseStyle, useTheme } from '@config';
import { Header, SafeAreaView, Icon, Button, TextInput } from '@components';
import styles from './styles';
import { useTranslation } from 'react-i18next';
import { postRequest } from '../../manager/Apimanager';
import Endpoints from '../../manager/Endpoints';
import { Alert } from 'react-native-web';
import GV from '../../utils/GV';
import { sharedExceptionHandler } from '../../helpers/sharedActions';
import Toast from '../../components/Toast/Toast';
import { useDispatch } from 'react-redux';
import {setUserAction} from '../../actions/user';



export default function SignUp({ navigation }) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confrmpassword, setcnfrmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState({
    name: true,
    email: true,
    phone:true,
    password: true,
    confrmpassword: true,
  });



  /**
   * call when action signup
   *d
   */
  const onSignUp = () => {   
    if (name == '' || email == '' || phone == '' || password == '' || confrmpassword == '') {
      setSuccess({
        ...success,
        name: name != '' ? true : false,
        email: email != '' ? true : false,
        phone : phone != '' ? true : false,
        password : password != '' ? true : false,
        confrmpassword : confrmpassword != '' ? true : false,
      });
      Toast.info("Please Fill Empty Rows")
    } else {
      setLoading(true);

      postRequest(Endpoints.REGISTER, {
        'name':name,
        'phone':phone,
        'password': password,
        'confirm_password':confrmpassword,
        'email': email,
      }, (res) => {
      setLoading(false);
        console.log('if signup==============  res', JSON.stringify(res.data.user));
        const {access_token,user, status,failed}= res.data
        if (status === 'Success') {      
        dispatch(setUserAction({user: user, access_token : access_token }))
        Toast.success("Successfully Registered")
          navigation.navigate('Walkthrough')
        }
        else if (failed) {
             setLoading(false);
        sharedExceptionHandler(res.data)
  
        }
  
      }, err => {
        setLoading(false);
        console.log('if sign_up error=>>>>>>>>>>>>>>>>', err.data);
      }, {}, false);

    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        title={t('sign_up')}
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
        style={{ flex:1,justifyContent:'center'}}
        edges={['right', 'left', 'bottom']}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'android' ? 'height' : 'padding'}
          keyboardVerticalOffset={offsetKeyboard}
          style={{ flex: 1 }} 
          >
          <View style={[styles.contain, {}]}>

              <TextInput
                onChangeText={text => setEmail(text)}
                placeholder={t('Enter email')}
                success={success.email}
                value={email}
                style={{ marginVertical: 6 }}

              />
              <TextInput
                onChangeText={text => setName(text)}
                placeholder={t('Enter Name')}
                success={success.name}
                value={name}
                style={{ marginVertical: 6 }}

              />
              <TextInput
                onChangeText={text => setPhone(text)}
                placeholder={t('Enter PhoneNumber')}
                success={success.phone}
                value={phone}
                style={{ marginVertical: 6 }}

              />
              <TextInput
                onChangeText={text => setPassword(text)}
                placeholder={t('Enter Password')}
                success={success.password}
                value={password}
                style={{ marginVertical: 6 }}

              />
              <TextInput
                onChangeText={text => setcnfrmPassword(text)}
                placeholder={t('Confirm Password')}
                success={success.confrmpassword}
                value={confrmpassword}
                // style={{ marginVertical: 6 }}

              />

         
            {/* <TextInput
              onChangeText={text => setName(text)}
              placeholder={t('input_id')}
              success={success.name}
              value={name}
            />
            <TextInput
              style={{ marginTop: 10 }}
              onChangeText={text => setEmail(text)}
              placeholder={t('input_email')}
              keyboardType="email-address"
              success={success.email}
              value={email}
            />
            <TextInput
              style={{ marginTop: 10 }}
              onChangeText={text => setAddress(text)}
              placeholder={t('input_address')}
              success={success.address}
              value={address}
            /> */}
            <Button
              full
              style={{ marginTop: 20 }}
              loading={loading}
              onPress={() => onSignUp()}>
              {t('sign_up')}
            </Button>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}



// return

// <SafeAreaView
// style={{ flex:1,justifyContent:'center'}}
// edges={['right', 'left', 'bottom']}>
// <KeyboardAvoidingView
//   behavior={Platform.OS === 'android' ? 'height' : 'padding'}
//   keyboardVerticalOffset={offsetKeyboard}
//   // style={{ flex: 1 }} 
//   >
//   <View style={[styles.contain, {}]}>

//       <TextInput
//         onChangeText={text => setEmail(text)}
//         placeholder={t('Enter email')}
//         success={success.name}
//         value={email}
//         style={{ marginVertical: 6 }}

//       />
//       <TextInput
//         onChangeText={text => setName(text)}
//         placeholder={t('Enter Name')}
//         success={success.name}
//         value={name}
//         style={{ marginVertical: 6 }}

//       />
//       <TextInput
//         onChangeText={text => setPhone(text)}
//         placeholder={t('Enter PhoneNumber')}
//         success={success.name}
//         value={phone}
//         style={{ marginVertical: 6 }}

//       />
//       <TextInput
//         onChangeText={text => setPassword(text)}
//         placeholder={t('Enter Password')}
//         success={success.name}
//         value={password}
//         style={{ marginVertical: 6 }}

//       />
//       <TextInput
//         onChangeText={text => setcnfrmPassword(text)}
//         placeholder={t('Confirm Password')}
//         success={success.name}
//         value={confrmpassword}
//         // style={{ marginVertical: 6 }}

//       />

 
//     {/* <TextInput
//       onChangeText={text => setName(text)}
//       placeholder={t('input_id')}
//       success={success.name}
//       value={name}
//     />
//     <TextInput
//       style={{ marginTop: 10 }}
//       onChangeText={text => setEmail(text)}
//       placeholder={t('input_email')}
//       keyboardType="email-address"
//       success={success.email}
//       value={email}
//     />
//     <TextInput
//       style={{ marginTop: 10 }}
//       onChangeText={text => setAddress(text)}
//       placeholder={t('input_address')}
//       success={success.address}
//       value={address}
//     /> */}
//     <Button
//       full
//       style={{ marginTop: 20 }}
//       loading={loading}
//       onPress={() => onSignUp()}>
//       {t('sign_up')}
//     </Button>
//   </View>
// </KeyboardAvoidingView>
// </SafeAreaView>
