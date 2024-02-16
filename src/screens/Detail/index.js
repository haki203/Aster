import { Dimensions, FlatList, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View, Animated, PanResponder, TextInput } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
const { width, height } = Dimensions.get('window');
import Ionicons from 'react-native-vector-icons/Ionicons';
import ViewImage from './ViewImage';
import { formatPrice } from '../Home/function';
import Alert from '../../components/ALert/Alert';
import AlertOk from '../../components/ALert/AlertOk';

const Detail = ({route,navigation}) => {

    const [image, setImage] = useState(listCoffee[0].image)
    const [num, setNum] = useState(0)
    const [select, setSelect] = useState(4)
    const [viewImage, setViewImage] = useState(false)
    const [actionNe, setActionNe] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [showAlert1, setShowAlert1] = useState(false);
    const [message, setMessage] = useState("");
    const onBackPress = () => {
        navigation.navigate(route.params.previousScreen, {
          val: 5,
          val2: 6,
        })
      };
      useEffect(() => {
        console.log(route.params.item);
      },[])
    const renderItem = ({ item }) => (
        <TouchableOpacity activeOpacity={1} onPress={onViewALl}>
            <ImageBackground
                style={{ width: width, height: width * 0.8 }}
                source={{ uri: item }}
            />
        </TouchableOpacity>
    );
    const flatListRef = useRef(null);
    const scrollToIndex = (index) => {
        if (flatListRef.current) {
            flatListRef.current.scrollToIndex({ index, animated: true });
        }
    };
    const onPressChange = (i) => {
        console.log(i);
        setNum(i);
        scrollToIndex(i);
    }
    const onClick = () => {
        setViewImage(false)
    }
    const onViewALl = () => {
        setViewImage(true)

    }
    const [numSeeAll, setNumSeeAll] = useState(true);
    const onSeeAll = () => {
        setNumSeeAll(!numSeeAll)
    }
    const limitText = (text, num) => {
        try {
            if (text.length > num) {
                return text.substring(0, num) + '...';
            } else {
                return text;
            }
        } catch (error) {
            console.log("limitText->", error);
        }
    };
    const onPay = () => {
        if (select == 4) {
            setMessage("Bạn chưa chọn size");
            setShowAlert(true);
            setActionNe(2)
        } else {
            // setMessage("Xác nhận thanh toán?");
            // setShowAlert(true);
            setShowAlert1(true);
            // setActionNe(2)
        }
    }
    const handleCloseAlert = () => {
        setShowAlert(false);
        setShowAlert1(false);
    };
    const handleOkAlert = () => {
        setShowAlert(false)

    };
    return (
        <View style={styles.container}>
            {showAlert && (
                <View style={{
                    backgroundColor: 'rgba(128, 128, 128, 0.8)',
                    position: 'absolute', flexDirection: 'row',
                    start: 0, width: '100%', zIndex: 1, height: '100%',
                }}>
                    <Alert
                        message={message}
                        onClose={handleCloseAlert}
                        onOk={handleOkAlert}
                        height={height}
                        actionDelete={1} />
                </View>
            )}
                        {showAlert1 && (
                <View style={{
                    backgroundColor: 'rgba(128, 128, 128, 0.8)',
                    position: 'absolute', flexDirection: 'row',
                    start: 0, width: '100%', zIndex: 1, height: '100%',
                }}>
                    <AlertOk
                        message="Thành công!"
                        onClose={handleCloseAlert}
                        height={height} />
                </View>
            )}
            <TouchableOpacity onPress={()=>onBackPress()} style={{ backgroundColor: 'white', position: 'absolute', top: 40, start: 20, padding: 5, borderRadius: 10, zIndex: 22 }}>
                <Ionicons name={"chevron-back"} color={'black'} size={22} />
            </TouchableOpacity>
            <View>
                <FlatList
                    ref={flatListRef}
                    data={image}
                    horizontal
                    pagingEnabled
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderItem}
                    onScroll={(event) => {
                        const offsetX = event.nativeEvent.contentOffset.x;
                        const newIndex = Math.round(offsetX / width);
                        setNum(newIndex);
                    }}
                />
                <View style={{ flexDirection: 'row', position: 'absolute', bottom: 40, width: 140, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', height: 20 }}>
                    {
                        listCoffee[0].image.map((image, i) => (
                            <TouchableOpacity
                                onPress={() => onPressChange(i)}
                                key={i}
                                style={{
                                    marginHorizontal: 5,
                                    width: 10, height: 10, borderRadius: 20, padding: 2,
                                    backgroundColor: i === num ? '#e6e6e6' : 'white',
                                }}></TouchableOpacity>
                        ))
                    }
                </View>
            </View>
            <View style={{ flex: 1, marginTop: -25, borderTopStartRadius: 35, borderTopEndRadius: 35, backgroundColor: 'white', padding: 20, paddingTop: 30 }}>
                <View style={{ width: '100%' }}>
                    <Text style={styles.txt}>{listCoffee[0].name}</Text>
                    <Text style={styles.txtDescription}>40 đánh giá</Text>
                </View>
                <View style={{ height: 1, backgroundColor: 'grey', marginVertical: 10 }}></View>
                <View>
                    <Text style={[styles.txt, { fontSize: 18 }]}>Mô tả</Text>
                    <Text onPress={() => setNumSeeAll(!numSeeAll)} style={styles.txtDescription}>{limitText(listCoffee[0].description, numSeeAll ? 120 : 1900)}</Text>
                </View>
                <View style={{ marginTop: 5 }}>
                    <Text style={[styles.txt, { fontSize: 18 }]}>Size</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => setSelect(1)}
                            style={[styles.btn, { borderColor: select == 1 ? '#C67C4E' : 'grey' }]}>
                            <Text style={[styles.txtSize, { color: select == 1 ? '#C67C4E' : 'black' }]}>S</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => setSelect(2)}
                            style={[styles.btn, { borderColor: select == 2 ? '#C67C4E' : 'grey' }]}>
                            <Text style={[styles.txtSize, { color: select == 2 ? '#C67C4E' : 'black' }]}>M</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => setSelect(3)}
                            style={[styles.btn, { borderColor: select == 3 ? '#C67C4E' : 'grey' }]}>
                            <Text style={[styles.txtSize, { color: select == 3 ? '#C67C4E' : 'black' }]}>L</Text></TouchableOpacity>
                    </View>
                </View>
                <TextInput style={{
                    width: '100%', borderRadius: 20, borderWidth: 1, borderColor: 'grey', paddingStart: 20, marginVertical: 10, fontSize: 16,
                }} placeholder='Để lại lời nhắn cho quán' placeholderTextColor={'#9B9B9B'}></TextInput>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', height: '14%', backgroundColor: 'white', position: 'absolute', bottom: 10, alignSelf: 'center' }}>
                    <View style={{ width: '35%', alignItems: 'center', justifyContent: 'center' }}>
                        <Text
                            style={{
                                width: '100%', color: 'black', fontSize: 16
                            }}>Tổng giá trị</Text>
                        <Text
                            style={{
                                width: '100%', color: 'black', fontSize: 16, color: 'orange', fontWeight: 'bold',
                            }}>{formatPrice(1.3)} đ</Text>
                    </View>
                    <TouchableOpacity onPress={onPay} style={{ backgroundColor: '#C67C4E', height: '100%', justifyContent: 'center', alignItems: 'center', width: '65%', borderRadius: 20 }}>
                        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Thêm vào giỏ</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {
                viewImage && (
                    <ViewImage image={image[num]} onClick={onClick} />
                )
            }
        </View>
    )
}

export default Detail


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    txt: {
        fontSize: 20,
        fontWeight: '500',
        color: 'black',
        fontFamily: 'Poppins'
    },
    txtDescription: {
        fontSize: 16,
        fontWeight: '500',
        color: '#9B9B9B',
        fontFamily: 'Poppins'
    },
    btn: {
        flex: 1, height: 50, borderWidth: 1, borderRadius: 10, borderColor: 'grey', justifyContent: 'center', alignItems: 'center', margin: 5
    },
    txtSize: {
        fontSize: 18,
        fontWeight: '500',
    }
})
const listCoffee = [
    {
        id: 1,
        name: 'Cafe da xay1',
        image: ['https://bonjourcoffee.vn/blog/wp-content/uploads/2020/11/Caramel-Macchiato-da-xay.jpg',
            'https://jarvis.vn/wp-content/uploads/2019/05/cafe-da-xay-thach-3.jpg',
            'https://images.4yuuu.com/files/article/213265/large_213265_3.jpg?09070600'],
        price: 30.3,
        description: 'A cappuccino is an asd âsáđá áđâsđá áđâsda sa âsáđá áđâsđá áđâsda sa  150 ml (5 oz) beverage, with 25 ml of espresso coffee and 85ml of fresh milk the fo'
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