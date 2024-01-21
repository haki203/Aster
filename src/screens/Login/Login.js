import { StyleSheet, Text, View, Dimensions, ImageBackground, Image, TouchableOpacity, Alert, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
const { width, height } = Dimensions.get('window');
const backgroundColor = '#FDFDFD';
import TouchID from 'react-native-touch-id'

const color = '#FFFFFF';
import { useDispatch } from 'react-redux';
import { toggleTheme } from '../../redux/actions/themeActions';
import { optionalConfigObject } from './config';

const Login = (props) => {

  const [isLoading, setIsLoading] = useState(false);
  const [isSupportTouchId, setIsSupportTouchId] = useState(false);
  const [isSupportFaceId, setIsSupportFaceId] = useState(false);
  const dispatch = useDispatch();
  const { navigation } = props;
  const toggleThemeHandler = () => {
    dispatch(toggleTheme());
  };
  useEffect(() => {
    const checkIsSupported = async () => {
      TouchID.isSupported(optionalConfigObject)
        .then(biometryType => {
          // Success code
          if (biometryType === 'FaceID') {
            console.log('FaceID is supported.');
            setIsSupportTouchId(false)

          } else {
            console.log('TouchID is supported.');
            setIsSupportTouchId(true)
          }
        })
        .catch(error => {
          // Failure code
          console.log(error);
        });
    }
    checkIsSupported();

  }, []);
  const onTouchId = async() => {
    console.log("cham vao di");
    try {
      await TouchID.authenticate('Chạm vào cảm biến vân tay để đăng nhập', optionalConfigObject)
      .then(success => {
        ToastAndroid.show('Đăng nhập thành công',ToastAndroid.SHORT);
        console.log('thanh cong');
        navigation.navigate('Home');
      })
      .catch(error => {
        console.log('that bai');
      });
    } catch (error) {
      console.log('loi ne: ',error);
    }
    console.log("cham thanh cong");

  }
  return (
    <View>
      {isLoading ? (
        <View
          style={{
            width: width,
            height: height,
            alignContent: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator size={30} color={'black'} />
        </View>
      ) : (
        <View style={styles.container}>
          <ImageBackground
            style={{ width: width, height: '100%' }}
            source={require('../../assets/images/bg_welcome.png')}>
            <View style={styles.body}>
              <View style={styles.title}>
                <Image
                  style={styles.image}
                  source={require('../../assets/images/logo-aster.png')}
                />
                <View style={styles.textView}>
                  <Text style={styles.textView_2}>
                    Thông minh hơn AI của bạn
                  </Text>
                </View>
              </View>

              <View style={styles.touchable}>
                <TouchableOpacity
                  onPress={() => onTouchId()}
                  style={styles.touchableGG}
                >
                  <Image
                    style={[styles.icon, { width: 23, height: 23 }]}
                    source={require('../../assets/images/otp.png')}></Image>
                  <Text style={styles.textView_GG}>Đăng nhập bằng vân tay</Text>
                </TouchableOpacity>
                <Text style={styles.textView_3}>HOẶC</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}
                  style={styles.touchableGG}
                >
                  <Image
                    style={styles.icon}
                    source={require('../../assets/images/ic_gg.png')}></Image>
                  <Text style={styles.textView_GG}>Đăng nhập bằng Google</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>
      )}
    </View>
  );
}

export default Login

const styles = StyleSheet.create({
  container: {
    // backgroundColor: backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
  body: {
    flex: 1,
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    borderRadius: 150,
    width: 100,
    height: 100,
  },
  title: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textView: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: height * 0.04
  },
  textView_1: {
    color: color,
    fontSize: 40,
    fontFamily: 'italic',
  },
  textView_2: {
    color: '#d5d5d5',
    width: 300,
    fontSize: 15,
    paddingTop: 20,
    textAlign: 'center',
  },
  touchable: {
    width: '100%',
    alignItems: 'center',
    marginTop: height * 0.15,
    height: height * 0.3
  },

  textView_FB: {
    color: color,
    fontSize: 15,
    fontWeight: 'bold',
  },
  textView_3: {
    paddingTop: 10,
    paddingBottom: 10,
    color: '#D9D9D9',
  },
  touchableGG: {
    width: '100%',
    height: '32%',
    borderRadius: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: color,
    flexDirection: 'row',
  },
  textView_GG: {
    color: color,
    fontSize: 15,
    fontWeight: 'bold',
    position: 'relative',
    left: '40%'

  },
  textView_4: {
    color: color,
    fontSize: 15,
    fontWeight: 'bold',
  },
  icon: {
    position: 'absolute',
    left: '21%',
    width: 20,
    height: 20,
  },
});