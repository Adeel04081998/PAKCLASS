

import React, { useEffect, useState } from 'react';
import {
  RefreshControl,
  FlatList,
  View,
  TouchableOpacity,
  Text,
  Image
} from 'react-native';
import { BaseStyle, useTheme } from '@config';
import { Header, SafeAreaView, PostItem, ProfileAuthor, Icon, } from '@components';
import styles from './styles';
import { PostData } from '@data';
import { useTranslation } from 'react-i18next';
import { getRequest } from '../../manager/Apimanager';
import Endpoints from '../../manager/Endpoints';
import { useSelector } from 'react-redux';
// import { Images } from '../../config/images';

export default function Post({ navigation }) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const userReducer = useSelector(state => state.userReducer)

  console.log("userReducer.access_token", userReducer.access_token);

  const [icons, setIcons] = useState([]);

  // const [icons] = useState([
  //       {
  //         icon: 'car',
  //         name: 'Vehicles',
  //         route: 'BusSearch',
  //       },
  //       {
  //         icon: 'home',
  //         name: 'Property',
  //         route: 'BusSearch',
  //       },
  //       {
  //         icon: 'mobile-alt',
  //         name: 'Mobile',
  //         route: 'PostAddCatagory',
  //         // route: 'BusSearch',
  //       },

  //       {
  //         icon: 'suitcase',
  //         name: 'Jobs',
  //         route: 'BusSearch',
  //       },
  //       {
  //         icon: 'industry',
  //         name: 'Business',
  //         route: 'BusSearch',
  //       },
  //       {
  //         icon: 'clipboard',
  //         name: 'Services',
  //         route: 'BusSearch',
  //       },
  //       {
  //         icon: 'graduation-cap',
  //         name: 'Learning',
  //         route: 'BusSearch',
  //       },
  //       {
  //         icon: 'cat',
  //         name: 'Pets',
  //         route: 'BusSearch',
  //       },
  //       {
  //         icon: 'laptop',
  //         name: 'Multimedia',
  //         route: 'BusSearch',
  //       },
  //       {
  //         icon: 'calendar',
  //         name: 'Event',
  //         route: 'BusSearch',
  //       },
  //       {
  //         icon: 'newspaper',
  //         name: 'Classified',
  //         route: 'BusSearch',
  //       },
  //       {
  //         icon: 'ellipsis-h',
  //         name: 'more',
  //         route: 'BusSearch',
  //       },
  //     ]);
  const loadCategoriesList = () => {
    getRequest(Endpoints.GET_CATEGORIES, (res) => {

      console.log("res=>>>> GET_CATEGORIES", res);
      const { categories } = res.data
      setIcons(categories)


    },
      (err) => {
        // console.log("errr=>>>> GET_CATEGORIES", err);

      })
  }
  useEffect(() => {
    if (userReducer.access_token) {
      loadCategoriesList()

    }
  }, [userReducer.access_token]);
  useEffect(() => {
    if (!userReducer.access_token) {

      navigation.navigate('Walkthrough')

    }
  }, [!userReducer.access_token]);


  return (
    <View style={{ flex: 1, }}>
      <Header title={t('Post Add')} />
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={['right', 'left', 'bottom']}>
        <FlatList
          data={icons}
          numColumns={4}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={styles.itemService}
                activeOpacity={0.9}
                // onPress={() => {
                //   navigation.navigate('BusSearch', {
                //     category_id: item.id
                //   });
                // }}
                onPress={() => navigation.navigate('Currency', {
                  pressedCategory: item,
                  isToMakePost: true
                })}


              >
                <View
                  style={[styles.iconContent, { backgroundColor: colors.card }]}>
                  {/* <Icon
                    name={'car'}
                    size={20}
                    color={colors.primary}
                    solid
                  /> */}
                  <Image
                    // source = {Images.room1}
                    source={{
                      uri: item.picture
                    }}
                    // source={{
                    //   uri:'https://pakclass.com/public/app/default/categories/fa-folder-skin-green.png'
                    // }}

                    style={{ height: 50, width: 50, }}

                  />

                </View>
                <Text footnote grayColor numberOfLines={1}>
                  {(item.name)}

                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </SafeAreaView>
    </View>
  );
}

