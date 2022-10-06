import React from 'react';
import { View, TouchableOpacity, FlatList, Dimensions, Image } from 'react-native';
import GV from '../../utils/GV';


export default ({ data = [], horizontalScrool = false, verticalScrool = false, mainImageStyl = {}, isServerPic = false, imageHeight = 150 }) => {
  const { width } = Dimensions.get('window');
  const ITEM_WIDTH = width;
  const ITEM_HEIGHT = imageHeight;

  return (

    <FlatList
      data={data}
      horizontal={horizontalScrool}
      vertical={verticalScrool}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item, index, }) => {
        // console.log("item",item);
        return (
          <TouchableOpacity activeOpacity={0.8} key={index}
          //  style={{borderWidth:2}} 

          >
            <View style={[{ width: ITEM_WIDTH, }]}>
              <View style={{
                marginHorizontal: 10,
                alignItems: 'center',
                backgroundColor: 'white',
                borderRadius: 1
              }}>
                <Image
                  source={{
                    // uri: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80'
                    uri: isServerPic ? GV.imageUrlPrefix.concat(item?.filename) : item?.uri
                  }}
                  style={[{
                    height: ITEM_HEIGHT,
                    width: "100%",

                  }, { mainImageStyl }]}
                />

              </View>
            </View>
          </TouchableOpacity>
        );
      }}
    // style={{height:90}}

    />
  )

}
