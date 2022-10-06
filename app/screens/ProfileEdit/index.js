

import React, { useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, Alert, Image, } from 'react-native';
import { BaseStyle, useTheme } from '@config';
import {

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
import { sharedExceptionHandler, sharedLaunchCameraorGallery } from '../../helpers/sharedActions';
import { useDispatch, useSelector } from 'react-redux';
import { multipartPostRequest } from '../../manager/Apimanager';
import Endpoints from '../../manager/Endpoints';
import Toast from '../../components/Toast/Toast';
import { setUserAction } from '../../actions/user';
import GV from '../../utils/GV';

export default function ProfileEdit({ navigation }) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });
  const userReducer = useSelector(state => state.userReducer)
  const { user } = userReducer;
  console.log("user", user);
  const dispatch = useDispatch();

  const [id, setId] = useState(user.id);
  const [name, setName] = useState(user.name ?? '');
  const [email, setEmail] = useState(user.email ?? '');
  const [address, setAddress] = useState(user.address ?? '');
  const [image, setImage] = useState({
    imageObj: {},
    islocalChange: false
  });
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState(user.phone ?? '');

  const [imageData, setImageData] = useState({
    tempImage: ''
  });


  const splitted_Image = user?.photo?.split('.com/') ?? [];
  let user_Profile_Pic = GV.imageUrlPrefix.concat(splitted_Image[1])
  console.log("user_Profile_Pic", user_Profile_Pic);

  const pickImage = async () => {
    sharedLaunchCameraorGallery(0, (response) => {
      let tempObj = {
        uri: Platform.OS === 'android' ? response.uri : response.uri.replace("file://", ""),
        name: response.uri.split('/').pop(),
        type: response.type
      }
      // setImage(tempObj)
      setImage((pre) => ({
        ...pre,
        imageObj: tempObj,
        islocalChange: true

      }))
      setImageData((pre) => ({
        ...pre,
        tempImage: [...pre.tempImage, tempObj]
      }))
    }, error => {
      console.log("errror=>>>>>>from back", error);
    },
    );
  }

  const onEditProfileHandler = () => {

    setLoading(true)
    let formData = new FormData();
    formData.append("id", id ?? '');
    formData.append("name", name ?? '');
    formData.append("email", user.email ?? ''),
      formData.append("address", address)
    for (const singleitem of imageData.tempImage) {
      const uriParts = singleitem?.uri?.split('.');
      const fileType = uriParts[uriParts?.length - 1];
      formData.append("image", {
        name: singleitem?.name,
        type: `image/${fileType}`,
        uri: Platform.OS === 'ios' ? singleitem?.uri.replace('file://', '') : image.islocalChange ? singleitem?.uri : user?.photo,
      });
    }
    // console.log("formData", formData);

    multipartPostRequest(
      Endpoints.EDIT_PROFILE,
      formData,
      res => {

        console.log("if res=>>>>>>", res);

        if (res.status === "success") {
          dispatch(setUserAction({ user: res?.user, access_token: res?.access_token }))
          setLoading(false)
          Toast.success("Profile Updated SuccessFully")
          navigation.navigate('Home')
        } else {

        }
      },
      err => {
        console.log("if err=>>>>>>", err);
        setLoading(false)
        sharedExceptionHandler(err)
      },
      {})
  }

  console.log("iamge=>>", image);

  return (
    <View style={{ flex: 1 }}>
      <Header
        title={t('edit_profile')}
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
            <TouchableOpacity >

              <Image
                // source={imageData.tempImage.uri}
                source={{
                  uri: image.islocalChange ? image.imageObj?.uri : user_Profile_Pic
                  // uri: 'https://pakclass.com/storage/avatars//113/538d994f296ceb81318c5f4841601889.gif'
                }}
                style={{ width: 110, height: 110, borderRadius: 60, backgroundColor: '#dcdcdc' }}
                resizeMode={'stretch'}
                resizeMethod={'auto'}

              />
              <Icon
                name="camera"
                size={30}
                color={colors.primary}
                enableRTL={true}
                style={{ position: 'absolute', top: 80, bottom: 0, left: 80, right: 0, }}
                onPress={() => { pickImage() }}
              />
            </TouchableOpacity>


            <View style={styles.contentTitle}>
              <Text headline semibold>
                {t('name')}
              </Text>
            </View>
            <TextInput
              onChangeText={text => setName(text)}
              placeholder={t('input_name')}
              value={name}

            />
            <View style={styles.contentTitle}>
              <Text headline semibold>
                {t('email')}
              </Text>
            </View>
            <TextInput
              onChangeText={text => setEmail(text)}
              placeholder={t('input_email')}
              value={email}
              editable={false}

            />
            <View style={styles.contentTitle}>
              <Text headline semibold>
                {t('Phone Number')}
              </Text>
            </View>
            <TextInput
              onChangeText={text => setPhone(text)}
              placeholder={t('input_phone number')}
              value={phone}
            />
            <View style={styles.contentTitle}>
              <Text headline semibold>
                {t('address')}
              </Text>
            </View>
            <TextInput
              onChangeText={text => setAddress(text)}
              placeholder={t('input_address')}
              value={address}
            />
          </ScrollView>
          <View style={{ paddingVertical: 15, paddingHorizontal: 20 }}>
            <Button
              loading={loading}
              full
              onPress={() => {
                // setLoading(true);
                onEditProfileHandler()

              }}



            >
              {t('confirm')}
            </Button>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
