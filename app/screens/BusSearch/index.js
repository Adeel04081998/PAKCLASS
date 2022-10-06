


import React, { useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform, Image, TouchableOpacity, FlatList, Dimensions, Alert } from 'react-native';
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
import { multipartPostRequest, postRequest } from '../../manager/Apimanager';
import Endpoints from '../../manager/Endpoints';
import { useSelector } from 'react-redux';
import Toast from '../../components/Toast/Toast';
import { sharedExceptionHandler, sharedLaunchCameraorGallery } from '../../helpers/sharedActions';
import ModalDropdown from 'react-native-modal-dropdown';
import { Images } from '../../config/images';
import SliderImage from '../../components/SliderImage';

export default function ProfileEdit({ navigation, route }) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });

  const [price, setPrice] = useState(__DEV__ ? '900000' : '');
  const [tittle, setTittle] = useState(__DEV__ ? 'handsfreee single image' : '');
  const [description, setDescription] = useState(__DEV__ ? 'hadsfreecsale single image' : '');
  const [Location, setLocatioin] = useState(__DEV__ ? 'islmbd' : '');
  const [AddType, setAddType] = useState({
    'addTypeName': '',
    'value': 0
  });
  const [localimg, setLocalImage] = useState();


  const [imageData, setImageData] = useState({
    tempImage: ''
  });

  const [isBtnShow, setBtnShow] = useState(true)
  const [loading, setLoading] = useState(false);
  const userReducer = useSelector(state => state.userReducer)
  const { user } = userReducer
  console.log("route.params", route.params);
  const category_id = route.params?.pressedSubCategory?.id ?? ""
  const { width } = Dimensions.get('window');
  const ITEM_WIDTH = width;
  const ITEM_HEIGHT = 150;

  const pickImage = async () => {
    sharedLaunchCameraorGallery(0, (response) => {

      let tempObj = {
        uri: Platform.OS === 'android' ? response.uri : response.uri.replace("file://", ""),
        // uri: newImageUri,
        name: response.uri.split('/').pop(),
        type: response.type
      }
      setImageData((pre) => ({
        ...pre,
        tempImage: [...pre.tempImage, tempObj]
      }))

      setBtnShow(false)
    }, error => {
      // console.log("errror=>>>>>>from back", error);
    },
    );
  }
  const AddPostHandler = () => {
    setLoading(true)
    let formData = new FormData();
    formData.append("name", user.name ?? '');
    formData.append("email", user.email ?? ''),
      formData.append("phone", user.phone),
      formData.append("category_id", category_id),
      formData.append("post_type_id", AddType.value)
    for (const singleitem of imageData.tempImage) {
      const uriParts = singleitem?.uri?.split('.');
      const fileType = uriParts[uriParts?.length - 1];

      formData.append("image[]", {
        name: singleitem?.name,
        type: `image/${fileType}`,
        uri: Platform.OS === 'ios' ? singleitem?.uri.replace('file://', '') : singleitem?.uri,
      });
    }
    formData.append("title", tittle)
    formData.append("description", description);
    formData.append("city", Location);
    formData.append("address", Location);

    
    formData.append("price", price);
    console.log("formData", formData);
    multipartPostRequest(
      Endpoints.Add_Posts,
      formData,
      res => {
        console.log("res================>>>>>", res);
        setLoading(false)
        if (res.status === 'success') {
          setLoading(false)
          Toast.success(res?.message)
          navigation.navigate('Home')
        } else if (res.failed) {
          setLoading(false)
          sharedExceptionHandler(res.data)
        }
      },
      err => {
        console.log("err================>>>>>", err);

        setLoading(false)
      },
    )
  }
  console.log("set adss type", AddType);
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
          style={{ flex: 1 }}

        >

          <ScrollView
            scrollEnabled={true}
          >
            <View style={{ paddingHorizontal: 20, }}>
              <SliderImage
                data={imageData.tempImage}
                horizontalScrool={true}
              />
              <TouchableOpacity style={{ backgroundColor: '#00a651', width: '100%', borderRadius: 10, alignItems: 'center', marginVertical: 5 }} onPress={() => { pickImage() }} >
                <Icon name={'image'} size={30} color={'#eae71b'} solid />
                <Text semibold>{t('Add Images')}</Text>
              </TouchableOpacity>
            </View>


            <View style={{ alignItems: 'center', padding: 20, }}>
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
              <View style={styles.contentTitle}>
                <Text semibold>{t('Ads Type')}</Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#F5F5F5', height: 40, justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                <ModalDropdown
                  options={['Professional Add', 'Featured Add']}
                  style={{ flex: 1, }}
                  dropdownStyle={{ flex: 1, width: '90%', height: 90, marginTop: -18 }}
                  defaultValue={'Please Select Ads Type'}
                  textStyle={{ color: AddType.value ? 'black' : '#9B9B9B', fontSize: 18 }}
                  dropdownTextStyle={{
                    fontSize: 17, color: '#9B9B9B'
                  }}
                  onSelect={(index, value) => {
                    if (index === 0) {
                      ///professional add its type 2
                      setAddType((pre) => ({ ...pre, addTypeName: value, value: 2 }))
                    } else {
                      ///professional add its type 1

                      setAddType((pre) => ({ ...pre, addTypeName: value, value: 1 }))
                    }
                  }}

                />
              </View>
            </View>
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
