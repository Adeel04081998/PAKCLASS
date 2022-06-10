import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { store, persistor } from 'app/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Navigator from './navigation';
import Toast,{ BaseToast } from 'react-native-toast-message';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';




console.disableYellowBox = true;

export default function App() {
  const toastConfig = {
    success: ({ text1, ...rest }) => {
      if (!(rest.text2)) return
      return <BaseToast
        text1NumberOfLines={10}
        text2NumberOfLines={5}
        {...rest}
        text1Style={{ fontWeight: "500", fontSize: 14,  }}
        text2Style={{ color: '#272727', fontSize: 14,  }}
        style={{borderColor:'green'}}
        contentContainerStyle={{ paddingLeft: 45, margin: 0, }}
        text1={text1}
        text2={rest.text2}
      />
    },
    error: ({ text1, ...rest }) => {
      if (!(rest.text2)) return
      return <BaseToast
        text1NumberOfLines={10}
        text2NumberOfLines={5}
        {...rest}
        style={{borderColor:'green'}}
        contentContainerStyle={{ paddingLeft: 51, margin: 0, }}
        text1Style={{ fontWeight: '500', fontSize: 14,  }}
        text2Style={{ color: '#272727', fontSize: 14,  }}
        text1={text1}
        text2={rest.text2}
      />
    }
    ,
    info: ({ text1, ...rest }) => {
      if (!(rest.text2)) return
      return <BaseToast
        text1NumberOfLines={10}
        text2NumberOfLines={5}
        {...rest}
        style={{borderColor:'green'}}
        contentContainerStyle={{ paddingLeft: 51, margin: 0, }}
        text1Style={{ fontWeight: '500', fontSize: 14,  }}
        text2Style={{ color: '#272727', fontSize: 14,  }}
        text1={text1}
        text2={rest.text2}   
      />
    },
    warning: ({ text1, ...rest }) => {
      if (!(rest.text2)) return
      return <BaseToast
        text1NumberOfLines={10}
        text2NumberOfLines={5}
        {...rest}
        style={{borderColor:'green'}}
        contentContainerStyle={{ paddingLeft: 51, margin: 0, }}
        text1Style={{ fontWeight: '500', fontSize: 14,  }}
        text2Style={{ color: '#272727', fontSize: 14,  }}
        text1={text1}
        text2={rest.text2}
   
      />
    },

  };
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex:1, backgroundColor:'bllue'}}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Navigator />
            <Toast
            config = {toastConfig}

            />
          </PersistGate>

        </Provider>
      </SafeAreaView>


    </GestureHandlerRootView>
  );
}
