import { Animated, Dimensions, FlatList, Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import ItemCoffeeHome from '../components/ItemList/ItemCoffeeHome';
import { useNavigation } from '@react-navigation/native';
import ListMiniCart from '../components/ListMiniCart';
const images = [
  'https://th.bing.com/th/id/OIP.SEb16b9s2aJkSStpWzwTbgHaHa?w=175&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
  'https://th.bing.com/th/id/OIP.SEb16b9s2aJkSStpWzwTbgHaHa?w=175&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
  'https://th.bing.com/th/id/OIP.SEb16b9s2aJkSStpWzwTbgHaHa?w=175&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7'
]
const { width, height } = Dimensions.get('window');
const HomeScreen = ({route,navigation}) => {
  const stBarHeight = useSelector((state) => state.theme.stBarHeight);
  const [listCart, setListCart] = useState([]);
  const [onMiniCart, setOnMiniCart] = useState(false);
  const parent = navigation.getParent();
  // animation
  const animatedValue = useRef(new Animated.Value(0)).current;
  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: animatedValue } } }],
    { useNativeDriver: false } // Make sure to set useNativeDriver to false for Android
  );
  useEffect(() => {
    console.log('Component is rerendered!');
    console.log(listCart.length);
  });
  // animation
  const handleItemPress = (item) => {
    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    const isProductInCart = listCart.some((product) => product.id === item.id);
    if (isProductInCart) {
      // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng lên 1
      setListCart((prevListCart) =>
        prevListCart.map((product) =>
          product.id === item.id ? { ...product, quantity: product.quantity + 1 } : product
        )
      );
    } else {
      // Nếu sản phẩm chưa có trong giỏ hàng, thêm vào giỏ hàng với quantity là 1
      setListCart((prevListCart) => [
        ...prevListCart,
        { id: item.id, name: item.name, quantity: 1, image: item.image, price: item.price },
      ]);
    }
    console.log('Item pressed:', item.name);
    console.log(listCart);
  };
  const onPressItem=(item)=>{
    navigation.navigate('Detail',{item:item,previousScreen:route.name});
  }
  const onBtnCartMini = () => {
    console.log('---------------');
    parent.setOptions({ tabBarStyle: { display: 'none' } })
    setOnMiniCart(true);

  };
  const onCloseMini = () => {
    parent.setOptions({ tabBarStyle: { display: 'flex' } })
    setOnMiniCart(false);
  }
  return (
    <View style={{ flex: 1, paddingTop: 24, backgroundColor: '#F9F9F9' }}>

      {/* header ne */}
      <View
        style={{
          backgroundColor: 'white',
          padding: 20,
          paddingBottom: 10,
          paddingTop: 25,
        }}>
        <View style={{ flexDirection: 'row', marginBottom: 20, alignItems: 'center', justifyContent: 'space-between', }}>
          <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
            <Text style={styles.txtHeader}>Vị trí</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={[styles.txtHeader, { fontWeight: '700', fontSize: 16, marginRight: 5 }]}>Hoc Mon, Ho chi minh</Text>
              <AntDesign size={14} color={'white'} name={'down'} />
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Animated.View style={{
              opacity: animatedValue.interpolate({
                inputRange: [0, 20],
                outputRange: [0, 1],
              }),
            }}>
              <TouchableOpacity >
                <Feather size={30} color={'black'} name={'search'} />
              </TouchableOpacity>
            </Animated.View>
            <TouchableOpacity style={{ marginLeft: 10 }}>
              <Image style={{ width: 44, height: 44, borderRadius: 10 }} source={{ uri: 'https://th.bing.com/th/id/OIP.SEb16b9s2aJkSStpWzwTbgHaHa?w=175&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7' }} />
            </TouchableOpacity>
          </View>
        </View>
        {/* search ne */}
        <Animated.View
          style={{
            backgroundColor: '#313131',
            height: animatedValue.interpolate({
              inputRange: [0, 80],
              outputRange: [55, 0],
              extrapolate: 'clamp',
            }),
            borderRadius: 15,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 20,
            justifyContent: 'center',
            opacity: animatedValue.interpolate({
              inputRange: [0, 80],
              outputRange: [1, 0],
              extrapolate: 'clamp',
            }),
          }}
        >
          <View>
            <Feather size={25} color={'white'} name={'search'} />
          </View>
          <TextInput
            style={{
              height: '100%',
              width: '90%',
              color: 'white',
              paddingHorizontal: 10
            }}
            placeholder="Search..."
            placeholderTextColor="white"
          />
          <TouchableOpacity>
            <Feather size={25} color={'white'} name={'menu'} />
          </TouchableOpacity>
        </Animated.View>

      </View >

      {/* content ne */}
      <ScrollView onScroll={handleScroll} style={{ flex: 1, zIndex: 10, backgroundColor: 'white' }}>
        <Text style={[styles.txtHeader, { paddingHorizontal: 20, fontSize: 18, fontWeight: '500', color: 'black', marginTop: 20 }]}>Tất cả sản phẩm</Text>
        <FlatList
          scrollEnabled={false}
          style={{ width: '100%', zIndex: 10 }}
          data={listCoffee}
          contentContainerStyle={{
            justifyContent: 'center', // Hoặc có thể sử dụng 'space-around'
            alignItems: 'center',
          }}
          renderItem={({ item }) => <ItemCoffeeHome onPressItem={onPressItem} item={item} width={width - 40 - 20} />}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
        />
      </ScrollView>
      {/* {listCart.length > 0 && (
        <TouchableOpacity
          onPress={onBtnCartMini}
          style={{
            position: 'absolute', bottom: 10, start: 20,zIndex:10,
            backgroundColor: 'orange',
            width: 53, height: 53, justifyContent: 'center', alignItems: 'center', borderRadius: 80,
          }}>
          <Feather style={{ marginStart: -3, marginTop: 2 }} size={28} color={'white'} name={'shopping-cart'} />
          <Text style={{ color: 'white', position: 'absolute', end: 8, top: 2, fontSize: 14, fontWeight: 'bold', }}>
            {listCart.length}
          </Text>
        </TouchableOpacity>
      )} */}
      {/* {
        onMiniCart && (
          <ListMiniCart
            styles={{
              width: '100%',
              height: '100%',
            }}
            onPress={onCloseMini}
            navigation={navigation}
            listCart={listCart}
            setListCart={setListCart}
          />
        )
      } */}
      {/* go to top page */}
      <Animated.View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          zIndex: 10,
          justifyContent: 'center',
          alignItems: 'flex-end',
          paddingHorizontal: 20,
          opacity: animatedValue.interpolate({
            inputRange: [0, 60], // Điều chỉnh dựa trên cần thiết
            outputRange: [0, 1],
            extrapolate: 'clamp',
          }),
        }}
      >
        <TouchableOpacity>
          <FontAwesome size={30} color={'black'} name={'angle-double-up'} />
        </TouchableOpacity>
      </Animated.View>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  txtHeader: {
    fontSize: 13,
    color: 'black',
    fontFamily: 'Sora',
  }
})
const listCoffee = [
  {
    id: 1,
    name: 'Cafe da xay1',
    image: ['https://bonjourcoffee.vn/blog/wp-content/uploads/2020/11/Caramel-Macchiato-da-xay.jpg', 'https://bonjourcoffee.vn/blog/wp-content/uploads/2020/11/Caramel-Macchiato-da-xay.jpg'],
    price: 30.3,
    description: 'A cappuccino is an asd sa 150 ml (5 oz) beverage, with 25 ml of espresso coffee and 85ml of fresh milk the fo'
  },
  {
    id: 2,
    name: 'Cafe da xay2',
    image: ['https://bonjourcoffee.vn/blog/wp-content/uploads/2020/11/Caramel-Macchiato-da-xay.jpg', 'https://bonjourcoffee.vn/blog/wp-content/uploads/2020/11/Caramel-Macchiato-da-xay.jpg'],

    price: 30,
    description: 'A cappuccino is an asasd 150 ml (5 oz) beverage, with 25 ml of espresso coffee and 85ml of fresh milk the fo'
  },
  {
    id: 3,
    name: 'Cafe da xay3',
    image: ['https://bonjourcoffee.vn/blog/wp-content/uploads/2020/11/Caramel-Macchiato-da-xay.jpg', 'https://bonjourcoffee.vn/blog/wp-content/uploads/2020/11/Caramel-Macchiato-da-xay.jpg'],

    price: 60,
    description: 'A cappuccino is an daaaaa 150 ml (5 oz) beverage, with 25 ml of espresso coffee and 85ml of fresh milk the fo'
  },
  {
    id: 4,
    name: 'Cafe da xay4',
    image: ['https://bonjourcoffee.vn/blog/wp-content/uploads/2020/11/Caramel-Macchiato-da-xay.jpg', 'https://bonjourcoffee.vn/blog/wp-content/uploads/2020/11/Caramel-Macchiato-da-xay.jpg'],

    price: 60,
    description: 'A cappuccino is an asdasd 150 ml (5 oz) beverage, with 25 ml of espresso coffee and 85ml of fresh milk the fo'
  },
  {
    id: 5,
    name: 'Cafe da xay5',
    image: ['https://bonjourcoffee.vn/blog/wp-content/uploads/2020/11/Caramel-Macchiato-da-xay.jpg', 'https://bonjourcoffee.vn/blog/wp-content/uploads/2020/11/Caramel-Macchiato-da-xay.jpg'],

    price: 60,
    description: 'A cappuccino is an dsss 150 ml (5 oz) beverage, with 25 ml of espresso coffee and 85ml of fresh milk the fo'
  },
]