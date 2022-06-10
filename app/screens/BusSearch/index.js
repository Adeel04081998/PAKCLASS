// import React, {useState} from 'react';
// import {View, ScrollView, KeyboardAvoidingView, Platform} from 'react-native';
// import {BaseStyle, useTheme} from '@config';
// import {
//   Image,
//   Header,
//   SafeAreaView,
//   Icon,
//   Text,
//   Button,
//   TextInput,
// } from '@components';
// import styles from './styles';
// import {UserData} from '@data';
// import {useTranslation} from 'react-i18next';

// export default function ProfileEdit({navigation}) {
//   const {colors} = useTheme();
//   const {t} = useTranslation();
//   const offsetKeyboard = Platform.select({
//     ios: 0,
//     android: 20,
//   });

//   const [id, setId] = useState('');
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [address, setAddress] = useState('');
//   const [image] = useState(UserData[0].image);
//   const [loading, setLoading] = useState(false);

//   return (
//     <View style={{flex: 1}}>
//       <Header
//         title={t('Enter Details')}
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
//         onPressRight={() => {}}
//       />
//       <SafeAreaView
//         style={BaseStyle.safeAreaView}
//         edges={['right', 'left', 'bottom']}>
//         <KeyboardAvoidingView
//           behavior={Platform.OS === 'android' ? 'height' : 'padding'}
//           keyboardVerticalOffset={offsetKeyboard}
//           style={{flex: 1}}>
//           <ScrollView contentContainerStyle={styles.contain}>
//             <View style={styles.AddImage}>
//               <Icon name={'image'} size={30} color={'#eae71b'} solid />
//               <Text semibold>{t('Add Images')}</Text>
//             </View>
//             <View style={styles.contentTitle}>
//               <Text semibold>{t('Price')}</Text>
//             </View>
//             <TextInput
//               onChangeText={text => setId(text)}
//               placeholder={t('Enter price')}
//               value={id}
//             />
//             <View style={styles.contentTitle}>
//               <Text semibold>{t('Ad Title')}</Text>
//             </View>
//             <TextInput
//               onChangeText={text => setName(text)}
//               placeholder={t('Enter Suitable Title')}
//               value={name}
//             />
//             <View style={styles.contentTitle}>
//               <Text semibold>{t('Description')}</Text>
//             </View>
//             <TextInput
//               style={{marginTop: 10, height: 120}}
//               onChangeText={text => setEmail(text)}
//               textAlignVertical="top"
//               multiline={true}
//               placeholder={t('Provide Description')}
//               value={email}
//             />
//             <View style={styles.contentTitle}>
//               <Text semibold>{t('Location')}</Text>
//             </View>
//             <TextInput
//               onChangeText={text => setAddress(text)}
//               placeholder={t('input_address')}
//               value={address}
//             />
//           </ScrollView>
//           <View style={{paddingVertical: 15, paddingHorizontal: 20}}>
//             <Button
//               loading={loading}
//               full
//               onPress={() => {
//                 setLoading(true);
//                 setTimeout(() => {
//                   navigation.goBack();
//                 }, 500);
//               }}>
//               {t('Post')}
//             </Button>
//           </View>
//         </KeyboardAvoidingView>
//       </SafeAreaView>
//     </View>
//   );
// }
import React, { useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { BaseStyle, useTheme } from '@config';
import {
  // Image,
  Header,
  SafeAreaView,
  Icon,
  Text,
  Button,
  TextInput,
} from '@components';
import styles from './styles';
import { UserData } from '@data';
import { useTranslation } from 'react-i18next';
import { getRequest, postRequest } from '../../manager/Apimanager';
import Endpoints from '../../manager/Endpoints';
import { useSelector } from 'react-redux';
import Toast from '../../components/Toast/Toast';
import { sharedExceptionHandler } from '../../helpers/sharedActions';



export default function ProfileEdit({ navigation, route }) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });

  // const [id, setId] = useState('');
  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  // const [address, setAddress] = useState('');

  const [price, setPrice] = useState('');
  const [tittle, setTittle] = useState('');
  const [description, setDescription] = useState('');
  const [Location, setLocatioin] = useState('');








  const [imagess] = useState(UserData[0].image);
  const [loading, setLoading] = useState(false);
  const userReducer = useSelector(state => state.userReducer)
  const { user } = userReducer
  const { category_id } = route.params
  let idnew = Math.random()

  console.log("route", category_id);
  console.log("navigation", Math.round(idnew) + 1);

  let tempObj = {
    uri: "https://cdn.pixabay.com/photo/2014/11/13/06/12/boy-529067_960_720.jpg",
    name: "testImage",
    type: 'jpg'
  }
  const AddPostHandler = () => {
    postRequest(Endpoints.Add_Posts, {
      'name': user.name ?? '',
      'email': user.email ?? '',
      'phone': user.phone ?? '',
      'category_id': 1,
      'post_type_id': Math.random(),
      // 'image':tempObj,
      'title': tittle,
      'description': description,
      'city': Location,
      'price': price
    }, (res) => {

      console.log("AddPostHandler===>>ress====>>>>>", JSON.stringify(res.data));

      const { access_token, user, status, failed } = res.data

      if (status === 'Success') {
        Toast.success(res.data.message)
        navigation.navigate('Home')

      } else if (failed) {
        console.log("hyyplzz");
        sharedExceptionHandler(res.data)
      }

    }), (err) => {
      console.log("AddPostHandler===>>errr", JSON.stringify(err));
    }

  }

  return (
    <View style={{ flex: 1 }}>
      <Header
        title={t('Enter Details')}
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
        onPressRight={() => { }}
      />
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={['right', 'left', 'bottom']}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'android' ? 'height' : 'padding'}
          keyboardVerticalOffset={offsetKeyboard}
          style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={styles.contain}>
            <View style={styles.AddImage}>
              <Icon name={'image'} size={30} color={'#eae71b'} solid />
              <Text semibold>{t('Add Images')}</Text>
            </View>
            <View style={styles.contentTitle}>
              <Text semibold>{t('Price')}</Text>
            </View>
            <TextInput
              onChangeText={text => setPrice(text)}
              placeholder={t('Enter price')}
              value={price}
            />
            <View style={styles.contentTitle}>
              <Text semibold>{t('Ad Title')}</Text>
            </View>
            <TextInput
              onChangeText={text => setTittle(text)}
              placeholder={t('Enter Suitable Title')}
              value={tittle}
            />
            <View style={styles.contentTitle}>
              <Text semibold>{t('Description')}</Text>
            </View>
            <TextInput
              style={{ marginTop: 10, height: 120 }}
              onChangeText={text => setDescription(text)}
              textAlignVertical="top"
              multiline={true}
              placeholder={t('Provide Description')}
              value={description}
            />
            <View style={styles.contentTitle}>
              <Text semibold>{t('Location')}</Text>
            </View>
            <TextInput
              onChangeText={text => setLocatioin(text)}
              placeholder={t('input_address')}
              value={Location}

            />
          </ScrollView>


          <View style={{ paddingVertical: 15, paddingHorizontal: 20 }}>
            <Button
              loading={loading}
              full
              onPress={() => AddPostHandler()}

            >
              {t('Post')}
            </Button>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
