import { View, Text, TouchableOpacity, Image, StyleSheet, SafeAreaView, Alert, TextInput, Switch, Dimensions, TouchableWithoutFeedback, FlatList, KeyboardAvoidingView, BackHandler, ToastAndroid } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { StatusBar, Platform, Keyboard } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/actions/themeActions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { GoogleGenerativeAI } from "@google/generative-ai";
import ItemHomeChat from '../components/ItemHomeChat';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring, withTiming
} from 'react-native-reanimated';
const API_KEY = "AIzaSyCZzpJPgL00Tc2elV7oYeOrHXKJbGCCXQw";
const { width, height } = Dimensions.get('window');
import Loader from 'react-native-three-dots-loader'
// Access your API key (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(API_KEY);
const HEIGHT_TEXT_INPUT = 40;
import { showModal, hideModal } from '../redux/actions/modalActions';
import CustomAlert from '../components/CustomAlert';
const Home = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [action, setAction] = useState(0);
  const [stt, setStt] = useState(0);
  const [test, setTest] = useState(0);
  const [loading, setIsLoading] = useState(false);
  const flatListRef = useRef(null);
  const [ai, setAi] = useState(1);
  const [onNe, setOnNe] = useState(false);
  const [result, setResult] = useState("");
  Animated.addWhitelistedNativeProps({ offset: true });
  const [dataHistory, setDataHistory] = useState([]);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const isModalVisible = useSelector((state) => state.modal.isModalVisible);
  const toggleThemeHandler = () => {
    dispatch(toggleTheme());
  };
  //modal
  const onOk = () => {
    console.log('OK pressed');
    dispatch(hideModal());
  };

  const onCancel = () => {
    console.log('Cancel pressed');
    dispatch(hideModal());
  };
  const onClickAlert = () => {
    console.log("ccc");
    ToastAndroid.show("ccc", ToastAndroid.SHORT);

  } 
  const onShowModal = () => {
    console.log('click');
    console.log(isModalVisible);
    dispatch(showModal());
    
  }

  //modal
  // animation
  const widthAn = useSharedValue(0);
  const heightAn = useSharedValue(0);

  const handlePress = () => {
    if (widthAn.value > 1) {
      widthAn.value = 0;

    } else {
      widthAn.value = widthAn.value + width + 10;
    }
  };
  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(widthAn.value, { duration: 100 }),
      height: height,
      zIndex: 1,

    };
  });
  // animation

  const [stBarHeight, setStBarHeight] = useState(Platform.OS === 'android' ? StatusBar.currentHeight : 0);
  const handlePressOutside = () => {
    Keyboard.dismiss();
  };
  function generateRandomId() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomId = '';

    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomId += characters.charAt(randomIndex);
    }

    return randomId;
  }
  const scrollToBottom = () => {
    //flatListRef.current.scrollToEnd({animated: true});
    //flatListRef.current.scrollToIndex({index:0},{ animated: true});
    const timeout = setTimeout(() => {
      if (flatListRef.current && dataHistory && dataHistory.length > 0) {
        flatListRef.current.scrollToEnd({ animated: true });
        console.log("size 3s: ", dataHistory.length);
      }
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };

  };
  const sendApi = async () => {
    try {
      Keyboard.dismiss();
      setIsLoading(true)
      console.log("cau hoi ne: ", text);
      const prompt = "" + text;
      setText("")
      if (!action) setAction(1);

      const bodyQuestion = { _id: generateRandomId(), role: 1, stt: stt, message: text }
      dataHistory.push(bodyQuestion);

      //test nha
      setTimeout(() => {
        // const bodyAnswer = { _id: generateRandomId(), role: 0, stt: stt, message: 'dumamay' };
        const bodyAnswer = { _id: generateRandomId(), role: 0, stt: stt, message: 'Câu hỏi của bạn có chứa từ ngữ nhạy cảm! Xin hãy kiềm chế.' }
        setDataHistory((prevData) => [...prevData, bodyAnswer]);
        setStt(parseInt(stt) + 1);
        dataHistory.push(bodyAnswer);
        setIsLoading(false)
        //scrollToBottom()


      }, 1000);
      //test nha

      // const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      // try {
      //   const result = await model.generateContent(prompt);
      //   const response = result.response;
      //   const textNe = await response.text();
      //   const error = await response.error();
      //   console.log(error);
      //   const bodyAnswer = { _id: generateRandomId(), role: 0, stt: stt, message: '' + response.text() }
      //   setTimeout(() => {
      //     // const bodyAnswer = { _id: generateRandomId(), role: 0, stt: stt, message: 'dumamay' };
      //     const bodyAnswer = { _id: generateRandomId(), role: 0, stt: stt, message: '' + response.text() }
      //     setDataHistory((prevData) => [...prevData, bodyAnswer]);
      //     setStt(parseInt(stt) + 1);
      //     dataHistory.push(bodyAnswer);

      //   }, 3000);

      //   console.log(dataHistory);
      // } catch (error) {
      //   setTimeout(() => {
      //     // const bodyAnswer = { _id: generateRandomId(), role: 0, stt: stt, message: 'dumamay' };
      //     const bodyAnswer = { _id: generateRandomId(), role: 0, stt: stt, message: 'Câu hỏi của bạn có chứa từ ngữ nhạy cảm! Xin hãy kiềm chế.' }
      //     setDataHistory((prevData) => [...prevData, bodyAnswer]);
      //     setStt(parseInt(stt) + 1);
      //     dataHistory.push(bodyAnswer);

      //   }, 3000);
      //   return;
      // }

    } catch (error) {
      console.log(error);
      try {
        if (error.some(item => item.includes("SAFETY"))) {
          console.log("Từ ngữ nhạy cảm");
        }
      } catch (error) {

      }
    }
  }
  const handlePressView = () => {
    setOnNe(false)
    Keyboard.dismiss()
    // Thực hiện các thao tác khác bạn muốn khi View được nhấn
  };
  const handleScroll = (event) => {

  };

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Xác nhận', 'Bạn có muốn tắt ứng dụng?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        { text: 'OK', onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => {
      backHandler.remove();
    };
  }, []);
  useEffect(() => {
    const keyboardHideListener = Keyboard.addListener('keyboardDidHide', () => {
      handlePressView();
      // Thực hiện các hành động bạn muốn khi bàn phím ảo bị tắt
    });

    return () => {
      keyboardHideListener.remove();
    };
  }, []);
  try {
    return (

      <SafeAreaView style={{ flex: 1, backgroundColor: isDarkMode ? 'black' : '#E9E4D1', paddingTop: stBarHeight, alignItems: 'center' }}>

        <View style={{ alignItems: 'center', paddingHorizontal: 10, justifyContent: 'space-between', flexDirection: 'row', paddingVertical: 10, width: '100%', height: '8%', display: !onNe ? 'flex' : 'none' }}>
          <Ionicons onPress={() => handlePress()} name="menu" size={24} color={isDarkMode ? 'white' : 'black'} />
          <TouchableOpacity onPress={() => onShowModal()} style={{}}>
            <FontAwesome5 name="user-circle" size={22} color={isDarkMode ? 'white' : 'black'} />
          </TouchableOpacity>
        </View>
        
        {/* display: isModalVisible ? 'flex' : 'none' */}
        {
          isModalVisible &&
          (
            <View style={{ display: isModalVisible ? 'flex' : 'none', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', position: 'absolute', backgroundColor: 'rgba(0, 0, 0, 0.4)', bottom: 0, left: 0, right: 0, zIndex: 1 }}>
              <CustomAlert isModalVisible={isModalVisible} onOk={onOk} onCancel={onCancel} handleClickAlert={onClickAlert} message={"adum asd asd asda may"} />
            </View>
          )
        }
        <View style={{ width: '100%', backgroundColor: '#E9E4D1', }}></View>

        {
          !action ?
            (<TouchableOpacity onPress={handlePressView} activeOpacity={1} style={{ alignItems: 'center', paddingHorizontal: 10, justifyContent: 'center', height: onNe ? '100%' : '80%', borderRadius: 10, paddingBottom: 10 }}>
              <Image style={{ width: 100, height: 100, borderRadius: 100, marginBottom: 20 }} source={require('../assets/images/logo-aster.png')} />
              <Text style={[styles.textHello, { color: isDarkMode ? 'white' : 'black', paddingHorizontal: 5 }]}>I'm here to help you with whatever you need, from answering questions to providing recommendations. Let's chat!</Text>
              <Text style={[styles.textHello, { paddingHorizontal: 20, color: isDarkMode ? 'white' : 'black' }]}>Example: Some text example goes in here</Text>
            </TouchableOpacity>) :
            (<View style={{ width: '100%', height: onNe ? '100%' : '80%', paddingHorizontal: 10, }}>
              <FlatList
                ref={flatListRef}
                style={{ width: '100%', height: '100%' }}
                onPress={handlePressView}
                onScroll={handleScroll}
                data={dataHistory}

                renderItem={({ item }) => <ItemHomeChat isDarkMode={isDarkMode} dulieu={item} />}
                keyExtractor={item => item._id}
                // cach1
                onContentSizeChange={() => { flatListRef.current.scrollToEnd({ animated: true }) }}
                onLayout={() => { flatListRef.current.scrollToEnd({ animated: true }) }}

                onScrollToIndexFailed={(info) => {
                  console.warn('onScrollToIndexFailed info:', info);
                }}
              />
            </View>)
        }
        <View style={[styles.chatContainer, { height: !onNe ? '12%' : '20%', paddingHorizontal: 10, }]}>
          <View style={[styles.chatAI, { height: !onNe ? '80%' : '100%', }]}>
            <TextInput
              onFocus={() => setOnNe(true)}
              onBlur={() => setOnNe(false)}
              value={text} onChangeText={(text) => setText(text)}
              style={{ flex: 1, paddingStart: 10, color: '#000', fontSize: 14, }}
              placeholderTextColor={'#A6A39D'} placeholder='Nói gì nói đi...'></TextInput>
            <TouchableOpacity disabled={text.length < 1} onPress={() => sendApi()} style={{ padding: 10 }}>
              {!loading ?
                (<Image style={{ width: 28, height: 28, padding: 10 }} source={require('../assets/images/home/message-send.png')} />)
                :
                (
                  <View>
                    <Loader size={8} />
                  </View>
                )
              }
            </TouchableOpacity>
          </View>
        </View>
        <Animated.View
          style={[animatedStyle, {
            overflow: 'hidden', backgroundColor: 'transparent',
            position: 'absolute',
            left: 0,
            right: 0,
            flexDirection: 'row',
          }]}
        >
          <View style={{ backgroundColor: '#AFAA96', height: height + stBarHeight, flex: 1, paddingTop: stBarHeight * 2, paddingStart: 10, alignItems: 'center' }}>
            <View style={styles.menuItem}>
              <Text >Đoạn chat mới</Text>
              <Switch trackColor={'black'} thumbColor={'white'} value={test} onValueChange={(value) => setTest(value)} />
            </View>
            <TouchableOpacity style={styles.menuItem}>
              <Image style={styles.iconAI} source={require('../assets/images/home/chatgpt.png')} />
              <Text >Google AI</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Image style={styles.iconAI} source={require('../assets/images/home/chatgpt.png')} />
              <Text >Chat GPT</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Image style={styles.iconAI} source={require('../assets/images/home/claudeAI.png')} />
              <Text >Claude AI</Text>
            </TouchableOpacity>

          </View>
          <TouchableOpacity onPress={() => handlePress()} style={{ height: '100%', flex: 1, backgroundColor: 'transparent', }}>
          </TouchableOpacity>
        </Animated.View>
      </SafeAreaView>
    )
  } catch (error) {
    console.log(error);
  }
}

export default Home

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white', // Màu nền của StatusBar
  },
  iconAI: {
    width: 25,
    height: 25,
    borderRadius: 50,
    marginRight: 5
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: -1, // Đảm bảo rằng phần nền được vẽ trước phía trước của các phần tử khác
  },
  chatContainer: {
    position: 'absolute', width: '100%', bottom: 0,
    borderRadius: 15
  },
  chatAI: {
    backgroundColor: 'grey', justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%', flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10
  },
  textHello: {
    fontFamily: 'Poppins',
    textAlign: 'center', fontSize: 14, fontWeight: '500',
    color: '#403E39'

  },
  menuItem: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 10,
    width: '80%'

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