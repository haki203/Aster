import { View, Text, TouchableOpacity, Image, StyleSheet, SafeAreaView, TextInput, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar, Platform, Keyboard } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/actions/themeActions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';

const apiKey = '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';
const apiUrl = 'https://api.openai.com/v1/completions';
const Home = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const toggleThemeHandler = () => {
    dispatch(toggleTheme());
  };
  const [stBarHeight, setStBarHeight] = useState(Platform.OS === 'android' ? StatusBar.currentHeight : 0);
  const handlePressOutside = () => {
    Keyboard.dismiss();
  };
  const sendApi = async() => {


  }
  // useEffect(() => {
  //   // Hàm để lấy chiều cao của StatusBar
  //   const getStatusBarHeight = () => {
  //     return ;
  //   };

  //   // Sử dụng hàm để lấy chiều cao và in ra console
  //   console.log('StatusBar Height:', setStBarHeight(getStatusBarHeight()));
  // }, [])
  return (
    <TouchableWithoutFeedback onPress={handlePressOutside}>
      <SafeAreaView style={{ flex: 1, backgroundColor: isDarkMode ? 'black' : '#E9E4D1', paddingTop: stBarHeight, paddingHorizontal: 10, alignItems: 'center' }}>
        <View style={{ alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', paddingVertical: 10, width: '100%' }}>
          <Ionicons name="menu" size={24} color={isDarkMode ? 'white' : 'black'} />
          <FontAwesome5 name="user-circle" size={24} color={isDarkMode ? 'white' : 'black'} />
        </View>
        <View style={{ width: '100%', height: 1, backgroundColor: '#E9E4D1' }}></View>
        <View style={{ alignItems: 'center', justifyContent: 'center', height: '80%' }}>
          <Image style={{ width: 100, height: 100, borderRadius: 100, marginBottom: 20 }} source={require('../assets/images/logo-aster.png')} />
          <Text style={[styles.textHello, { color: isDarkMode ? 'white' : 'black' }]}>I'm here to help you with whatever you need, from answering questions to providing recommendations. Let's chat!</Text>
          <Text style={[styles.textHello, { paddingHorizontal: 20, color: isDarkMode ? 'white' : 'black' }]}>Example: Some text example goes in here</Text>
        </View>
        <View style={styles.chatContainer}>
          <TextInput onChangeText={(text)=>setText(text)} style={{ flex: 1, paddingStart: 10, color: '#000', fontSize: 14 }} placeholderTextColor={'#A6A39D'} placeholder='Nói gì nói đi...'></TextInput>
          <TouchableOpacity onPress={() => sendApi()} style={{ padding: 10 }}>
            <Image style={{ width: 25, height: 25, padding: 10 }} source={require('../assets/images/home/message-send.png')} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default Home

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white', // Màu nền của StatusBar
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'blue', // Màu nền của phần nền màn hình
    zIndex: -1, // Đảm bảo rằng phần nền được vẽ trước phía trước của các phần tử khác
  },
  chatContainer: {
    position: 'absolute', width: '100%', height: '8%', backgroundColor: 'white', bottom: '5%',
    justifyContent: 'space-between', flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
  },
  textHello: {
    fontFamily: 'Poppins',
    textAlign: 'center', fontSize: 14, fontWeight: '500',
    color: '#403E39'

  },
  icon: {
    width: 50,
    height: 50,
    marginLeft: '33%', // 1/3 chiều rộng của màn hình
    marginTop: 50,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textView_GG: {
    marginBottom: 10,
    // ... other styles
  },
  iconNav: {
    width: 20,
    height: 20,
  },
  button: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});