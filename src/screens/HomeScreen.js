import { Dimensions, FlatList, Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import ItemCoffeeHome from '../components/ItemList/ItemCoffeeHome';
const images = [
  'https://th.bing.com/th/id/OIP.SEb16b9s2aJkSStpWzwTbgHaHa?w=175&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
  'https://th.bing.com/th/id/OIP.SEb16b9s2aJkSStpWzwTbgHaHa?w=175&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
  'https://th.bing.com/th/id/OIP.SEb16b9s2aJkSStpWzwTbgHaHa?w=175&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7'
]
const { width, height } = Dimensions.get('window');
const HomeScreen = () => {
  const stBarHeight = useSelector((state) => state.theme.stBarHeight);
  const [listCart, setListCart] = useState([]);
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
        { id: item.id, name: item.name, quantity: 1,image: item.image},
      ]);
    }
    console.log('Item pressed:', item.name);
    console.log(listCart);
  };
  return (
    <View style={{ flex: 1, paddingTop: 24 }}>
      {/* header ne */}
      <LinearGradient
        colors={['#131313', '#262626']}
        style={{
          backgroundColor: '#131313', padding: 20, paddingBottom: 100
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
            <Text style={styles.txtHeader}>Vị trí</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={[styles.txtHeader, { fontWeight: '700', fontSize: 16, marginRight: 5 }]}>Hoc Mon, Ho chi minh</Text>
              <AntDesign size={14} color={'white'} name={'down'} />
            </View>
          </View>
          <Image style={{ width: 44, height: 44, borderRadius: 10 }} source={{ uri: 'https://th.bing.com/th/id/OIP.SEb16b9s2aJkSStpWzwTbgHaHa?w=175&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7' }} />
        </View>
        <View style={{
          backgroundColor: '#313131',
          marginTop: 30, height: 55, borderRadius: 15,
          flexDirection: 'row', alignItems: 'center',
          paddingHorizontal: 20, justifyContent: 'center',

        }}>
          <View style={{}}><Feather size={25} color={'white'} name={'search'} /></View>
          <TextInput style={{ height: '100%', width: '90%', color: 'white', paddingHorizontal: 10 }}></TextInput>
          <TouchableOpacity><Feather size={25} color={'white'} name={'menu'} /></TouchableOpacity>
        </View>
      </LinearGradient >
      {/* slide hinh ne */}
      <View style={{
        backgroundColor: '#c68c53', width: '90%',
        height: 140, alignSelf: 'center', marginTop: -70,
        borderRadius: 20, overflow: 'hidden'
      }}>
        <Image
          style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }}
          source={require('../assets/images/bgNe.png')} />
      </View>
      {/* content ne */}
      <View style={{ flex: 1, backgroundColor: '#F9F9F9' }}>
        <FlatList
          style={{ width: '100%', padding: 20, paddingTop: 10 }}
          data={listCoffee}
          contentContainerStyle={{
            justifyContent: 'center', // Hoặc có thể sử dụng 'space-around'
            alignItems: 'center',
          }}
          renderItem={({ item }) => <ItemCoffeeHome onPress={handleItemPress} item={item} width={width - 40 - 20} />}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
        />
      </View>
      <View style={{ position: 'absolute', bottom: 100, start: 20, width: 30, height: 30, backgroundColor: 'red' }}>
        <Text style={{color:'white'}}>{listCart.length}</Text>
      </View>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  txtHeader: {
    fontSize: 13,
    color: 'white',
    fontFamily: 'Sora',
  }
})
const listCoffee = [
  {
    id: 1,
    name: 'Cafe da xay1',
    image: 'https://bonjourcoffee.vn/blog/wp-content/uploads/2020/11/Caramel-Macchiato-da-xay.jpg',
    price: 30.3,
    description: 'A cappuccino is an asd sa 150 ml (5 oz) beverage, with 25 ml of espresso coffee and 85ml of fresh milk the fo'
  },
  {
    id: 2,
    name: 'Cafe da xay2',
    image: 'https://bonjourcoffee.vn/blog/wp-content/uploads/2020/11/Caramel-Macchiato-da-xay.jpg',
    price: 30,
    description: 'A cappuccino is an asasd 150 ml (5 oz) beverage, with 25 ml of espresso coffee and 85ml of fresh milk the fo'
  },
  {
    id: 3,
    name: 'Cafe da xay3',
    image: 'https://bonjourcoffee.vn/blog/wp-content/uploads/2020/11/Caramel-Macchiato-da-xay.jpg',
    price: 60,
    description: 'A cappuccino is an daaaaa 150 ml (5 oz) beverage, with 25 ml of espresso coffee and 85ml of fresh milk the fo'
  },
  {
    id: 3,
    name: 'Cafe da xay4',
    image: 'https://bonjourcoffee.vn/blog/wp-content/uploads/2020/11/Caramel-Macchiato-da-xay.jpg',
    price: 60,
    description: 'A cappuccino is an asdasd 150 ml (5 oz) beverage, with 25 ml of espresso coffee and 85ml of fresh milk the fo'
  },
  {
    id: 3,
    name: 'Cafe da xay5',
    image: 'https://bonjourcoffee.vn/blog/wp-content/uploads/2020/11/Caramel-Macchiato-da-xay.jpg',
    price: 60,
    description: 'A cappuccino is an dsss 150 ml (5 oz) beverage, with 25 ml of espresso coffee and 85ml of fresh milk the fo'
  },
]