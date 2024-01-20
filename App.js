// App.js
import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { useDispatch } from 'react-redux';
import { toggleTheme } from './src/redux/actions/themeActions';
import store from './src/redux/store';
import { Provider } from 'react-redux';
import ThemeWrapper from './src/components/ThemeWrapper ';
import Login from './src/components/page/Login/Login';
import Home from './src/screens/Home';
import AppNavigator from './src/navigation/AppNavigator';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import {LogBox} from 'react-native';
LogBox.ignoreAllLogs(true);

const App = () => {
   //const dispatch = useDispatch();

   // const toggleThemeHandler = () => {
   //    dispatch(toggleTheme());
   // };

   return (
      <Provider store={store}>
         <ThemeWrapper>
            <SafeAreaView style={{ flex: 1 }}>
               <NavigationContainer>
                  <AppNavigator />
               </NavigationContainer>
            </SafeAreaView>
         </ThemeWrapper>
      </Provider>
   );
};

export default App;
