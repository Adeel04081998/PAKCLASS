// import React, {useEffect, useState} from 'react';
// import {
//   RefreshControl,
//   FlatList,
//   View,
//   TouchableOpacity,
//   Text,
// } from 'react-native';
// import {BaseStyle, useTheme} from '@config';
// import {Header, SafeAreaView, PostItem, ProfileAuthor, Icon} from '@components';
// import styles from './styles';
// import {PostData} from '@data';
// import {useTranslation} from 'react-i18next';
// import { getRequest } from '../../manager/Apimanager';
// import Endpoints from '../../manager/Endpoints';

// export default function Post({navigation}) {
//   const {colors} = useTheme();
//   const {t} = useTranslation();

//   const [icons] = useState([
//     {
//       icon: 'car',
//       name: 'Vehicles',
//       route: 'BusSearch',
//     },
//     {
//       icon: 'home',
//       name: 'Property',
//       route: 'BusSearch',
//     },
//     {
//       icon: 'mobile-alt',
//       name: 'Mobile',
//       route: 'PostAddCatagory',
//       // route: 'BusSearch',
//     },

//     {
//       icon: 'suitcase',
//       name: 'Jobs',
//       route: 'BusSearch',
//     },
//     {
//       icon: 'industry',
//       name: 'Business',
//       route: 'BusSearch',
//     },
//     {
//       icon: 'clipboard',
//       name: 'Services',
//       route: 'BusSearch',
//     },
//     {
//       icon: 'graduation-cap',
//       name: 'Learning',
//       route: 'BusSearch',
//     },
//     {
//       icon: 'cat',
//       name: 'Pets',
//       route: 'BusSearch',
//     },
//     {
//       icon: 'laptop',
//       name: 'Multimedia',
//       route: 'BusSearch',
//     },
//     {
//       icon: 'calendar',
//       name: 'Event',
//       route: 'BusSearch',
//     },
//     {
//       icon: 'newspaper',
//       name: 'Classified',
//       route: 'BusSearch',
//     },
//     {
//       icon: 'ellipsis-h',
//       name: 'more',
//       route: 'BusSearch',
//     },
//   ]);
//   const loadCategoriesList = ()=>{
//     getRequest(Endpoints.GET_CATEGORIES,(res)=>{

//       console.log("res=>>>> GET_CATEGORIES", res);

//     }, 
//     (err)=>{
//       console.log("errr=>>>> GET_CATEGORIES", err);

//     })
//   }
//   useEffect(() => {
//     loadCategoriesList()
//   }, []);

//   return (
//     <View style={{flex: 1}}>
//       <Header title={t('Post Add')} />
//       <SafeAreaView
//         style={BaseStyle.safeAreaView}
//         edges={['right', 'left', 'bottom']}>
//         <FlatList
//           data={icons}
//           numColumns={4}
//           keyExtractor={(item, index) => index.toString()}
//           renderItem={({item}) => {
//             return (
//               <TouchableOpacity
//                 style={styles.itemService}
//                 activeOpacity={0.9}
//                 onPress={() => {
//                   navigation.navigate(item.route);
//                 }}>
//                 <View
//                   style={[styles.iconContent, {backgroundColor: colors.card}]}>
//                   <Icon
//                     name={item.icon}
//                     size={20}
//                     color={colors.primary}
//                     solid
//                   />
//                 </View>
//                 <Text footnote grayColor numberOfLines={1}>
//                   {t(item.name)}
//                 </Text>
//               </TouchableOpacity>
//             );
//           }}
//         />
//       </SafeAreaView>
//     </View>
//   );
// }


import React, { useEffect, useState } from 'react';
import {
  RefreshControl,
  FlatList,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import { BaseStyle, useTheme } from '@config';
import { Header, SafeAreaView, PostItem, ProfileAuthor, Icon, Image } from '@components';
import styles from './styles';
import { PostData } from '@data';
import { useTranslation } from 'react-i18next';
import { getRequest } from '../../manager/Apimanager';
import Endpoints from '../../manager/Endpoints';
import { useSelector } from 'react-redux';

export default function Post({ navigation }) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const userReducer = useSelector(state => state.userReducer)



  // const [icons, setIcons] = useState([]);

  const [icons] = useState([
        {
          icon: 'car',
          name: 'Vehicles',
          route: 'BusSearch',
        },
        {
          icon: 'home',
          name: 'Property',
          route: 'BusSearch',
        },
        {
          icon: 'mobile-alt',
          name: 'Mobile',
          route: 'PostAddCatagory',
          // route: 'BusSearch',
        },
    
        {
          icon: 'suitcase',
          name: 'Jobs',
          route: 'BusSearch',
        },
        {
          icon: 'industry',
          name: 'Business',
          route: 'BusSearch',
        },
        {
          icon: 'clipboard',
          name: 'Services',
          route: 'BusSearch',
        },
        {
          icon: 'graduation-cap',
          name: 'Learning',
          route: 'BusSearch',
        },
        {
          icon: 'cat',
          name: 'Pets',
          route: 'BusSearch',
        },
        {
          icon: 'laptop',
          name: 'Multimedia',
          route: 'BusSearch',
        },
        {
          icon: 'calendar',
          name: 'Event',
          route: 'BusSearch',
        },
        {
          icon: 'newspaper',
          name: 'Classified',
          route: 'BusSearch',
        },
        {
          icon: 'ellipsis-h',
          name: 'more',
          route: 'BusSearch',
        },
      ]);
  const loadCategoriesList = () => {
    getRequest(Endpoints.GET_CATEGORIES, (res) => {

      // console.log("res=>>>> GET_CATEGORIES", res);
      const { categories } = res.data
      setIcons(categories)


    },
      (err) => {
        console.log("errr=>>>> GET_CATEGORIES", err);

      })
  }
  useEffect(() => {
    console.log("in useEffect 111");
    if (userReducer.access_token) {
      console.log("in useEffect byeee", userReducer.access_token);

      // loadCategoriesList()
      // navigation.navigate('SignIn')

    }
  }, [userReducer.access_token]);
  useEffect(() => {
    console.log("in useEffect 2222");
    if (!userReducer.access_token) {
      // loadCategoriesList()
      console.log("in useEffect hy");

      navigation.navigate('Walkthrough')

    }
  }, [!userReducer.access_token]);
  // console.log("icons state=>>>>>>>>>>>>>>>>>>>>>>", icons);
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
            console.log("item=>", item);
            return (
              <TouchableOpacity
                style={styles.itemService}
                activeOpacity={0.9}
                onPress={() => {
                  navigation.navigate('BusSearch', {
                    category_id: item.id
                  });
                }}>
                <View
                  style={[styles.iconContent, { backgroundColor: colors.card }]}>
                  <Icon
                    name={'car'}
                    size={20}
                    color={colors.primary}
                    solid
                  />
                  {/* <Image 
                  source = {item.picture}
                  style={{ height:90 , width:100 , borderWidth:1}}
                  
                  /> */}

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

