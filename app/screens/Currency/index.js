



import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { BaseStyle, useTheme } from '@config';
import { Header, SafeAreaView, Icon, Text } from '@components';
import styles from './styles';
import { useTranslation } from 'react-i18next';
import { postRequest } from '../../manager/Apimanager';
import { sharedExceptionHandler } from '../../helpers/sharedActions';
import Endpoints from '../../manager/Endpoints';
import Toast from '../../components/Toast/Toast';
import Tour from '../Tour';


export default function Currency({ navigation, route }) {
  // console.log("navigation", route);
  const { colors } = useTheme();
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);
  console.log("route?.params?.pressedCategory?.id ? route?.params?.pressedCategory?.id ", route?.params?.pressedCategory?.id ? route?.params?.pressedCategory?.id : '');
  const [subCategoriesList, SetSubCategoriesList] = useState('')
  const category_Id = route?.params?.pressedCategory?.id ? route?.params?.pressedCategory?.id : '0';
  const isToMakePost = route?.params?.isToMakePost ? route?.params?.isToMakePost : false;
  const routeToNavigate = isToMakePost ? 'BusSearch' : 'Tour';



  /**
   * @description Called when setting currency is selected
   * @author Passion UI <passionui.com>
   * @date 2019-08-03
   * @param {object} select
   */


  /**
   * @description Load item one by one
   * @author Passion UI <passionui.com>
   * @date 2019-08-03
   * @param {*} item
   * @param {*} index
   * @returns
   */
  const renderItem = (item, index) => {
    console.log("itemrenderItem", item);
    if (subCategoriesList.length) {
      return (
        <TouchableOpacity
          style={[styles.item, { borderBottomColor: colors.border }]}
          onPress={() => navigation.navigate(routeToNavigate, {
            pressedSubCategory: item
          }
            // :
            // {
            //   category_id: item.id
            // }


          )}
        >
          <Text
            body1
            style={
              item.checked
                ? {
                  color: colors.primary,
                }
                : {}
            }>
            {item.name}
          </Text>

        </TouchableOpacity>
      );
    } else {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text> No Subcategory Found</Text>
        </View>
      )


    }

  };
  const loadSubCategoriesList = () => {
    postRequest(Endpoints.SUB_CATEGORIES_LIST, {
      'category_id': category_Id ?? '',

    }, (res) => {

      console.log("loadSubCategoriesList===>>ress====>>>>>", JSON.stringify(res));
      if (res?.data?.status === 'success' && res?.data?.subcategories?.length) {
        SetSubCategoriesList(res.data.subcategories)


      } else {
        Toast.info("No Record Found")
        // navigation.navigate("Home")
      }


    }, (err) => {
      console.log("loadSubCategoriesList===>>errr", JSON.stringify(err));
      sharedExceptionHandler(err)

    })

  }
  useEffect(() => {
    loadSubCategoriesList()

  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Header
        title={t('Select Category')}
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
        onPressRight={() => {
          setLoading(true);
          setTimeout(() => {
            navigation.goBack();
          }, 500);
        }}
      />
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={['right', 'left', 'bottom']}>
        <View style={styles.contain}>
          <View style={{ width: '100%', height: '100%' }}>
            <FlatList
              data={subCategoriesList}
              keyExtractor={(item, index) => item.id}
              renderItem={({ item, index }) => renderItem(item, index)}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
