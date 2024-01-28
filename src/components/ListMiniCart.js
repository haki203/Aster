import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View, Animated } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import ItemCoffeeHome from './ItemList/ItemCoffeeHome';
import ItemCartMini from './ItemList/ItemCartMini';
import { formatPrice } from '../screens/Home/function';
import Alert from './ALert/Alert';
import AlertOk from './ALert/AlertOk';
const { width, height } = Dimensions.get('window');
// Hàm tính tổng

const ListMiniCart = ({ styles, onPress, navigation, listCart, setListCart }) => {
    const [showAlert, setShowAlert] = useState(false);
    const [showAlert1, setShowAlert1] = useState(false);
    const [actionNe, setActionNe] = useState(null);
    const [message, setMessage] = useState("");
    const [itemDelete, setItemDelete] = useState(null);

    const handleShowAlert = () => {
        setShowAlert(true);
    };
    const handleShowAlert1 = () => {
        setShowAlert1(true);
    };
    const handleCloseAlert = () => {
        setShowAlert(false);
        setShowAlert1(false);
    };

    const onDelete = (item, actionDelete) => {
        setMessage("Xác nhận xóa " + item.name + " ?");
        setShowAlert(true);
        setItemDelete(item);
        setActionNe(1)
    };
    const onPay = () => {
        setMessage("Xác nhận thanh toán " + formatPrice(calculateTotal()) + "đ ?");
        setShowAlert(true);
        setActionNe(2)
    };
    const handleOkAlert = (actionDelete) => {
        // console.log('ok nha '+actionNe);
        setShowAlert(false);
        if (actionNe === 0) {
            console.log('xoa all');
            setListCart([]);
            setShowAlert1(true);
        }
        else if (actionNe === 1) {
            console.log('xoa item');
            console.log(itemDelete);
            // Lọc các phần tử khác với phần tử có ID bằng selectedItemId
            const updatedListCart = listCart.filter(item => item.id !== itemDelete.id);
            // Cập nhật state với mảng đã lọc
            setListCart(updatedListCart);
            setShowAlert1(true);
        }
        else if (actionNe === 2) {
            console.log('thanh toan');
        }

    };
    const calculateTotal = () => {
        const total = listCart.reduce((accumulator, currentItem) => {
            return accumulator + (currentItem.price * currentItem.quantity);
        }, 0);

        return total;
    };
    const onChangeQuantity = (props) => {
        console.log(props);
        setListCart((prevListCart) => {
            return prevListCart.map((item) => {
                if (item.id === props.id) {
                    // Nếu id trùng khớp, cập nhật quantity
                    return { ...item, quantity: item.quantity + props.action };
                }
                return item;
            });
        });
    }
    // animation ne ---------------------------------------
    const slideUpValue = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        Animated.timing(slideUpValue, {
            toValue: 1,
            duration: 250, // Adjust the duration as needed
            useNativeDriver: true,
        }).start();
    }, []);

    const handlePress = () => {
        
        Animated.timing(slideUpValue, {
            toValue: 0,
            duration: 550,
            useNativeDriver: true,
        }).start(() => {
            // Thực hiện các hành động khác sau khi hiệu ứng kết thúc (nếu cần)
            onPress()
        });
    };
    return (
        <View style={[styles, { position: 'absolute', bottom: 0, backgroundColor: 'rgba(255, 255, 255, 0.4)', height: '100%' }]}>
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
                        message="Xóa thành công!"
                        onClose={handleCloseAlert}
                        height={height} />
                </View>
            )}
            <TouchableOpacity onPress={()=>handlePress()} style={{ height: '25%', backgroundColor: 'rgba(255, 255, 255, 0)' }}>

            </TouchableOpacity>
            <Animated.View
                style={[
                    {
                        transform: [
                            {
                                translateY: slideUpValue.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [800, 0], // Adjust the start and end values as needed
                                }),
                            },
                        ],
                    },
                    {
                        backgroundColor: 'white',
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                    },
                ]}
            >

                <View style={{ height: 55, alignItems: 'center' }}>
                    <TouchableOpacity
                        disabled={listCart.length < 1}
                        onPress={() => {
                            setMessage("Xác nhận xóa?");
                            handleShowAlert();
                            setActionNe(0);
                        }}
                        style={{ position: 'absolute', top: 10, start: 10, paddingHorizontal: 15, zIndex: 1 }}>
                        <Text style={{
                            color: 'orange',
                            fontSize: 16, fontWeight: 'bold', marginTop: 2
                        }}>Xóa tất cả</Text>
                    </TouchableOpacity >
                    <Text style={{
                        width: '100%', position: 'absolute',
                        top: 10, textAlign: 'center',
                        fontSize: 18, fontWeight: 'bold', color: 'black',
                    }}>Giỏ hàng</Text>
                    <TouchableOpacity style={{ position: 'absolute', top: 10, end: 20 }} onPress={()=>handlePress()}>
                        <AntDesign size={20} color={'black'} name={'down'} />
                    </TouchableOpacity>
                </View>
                <View style={{ width: '100%', height: '80%' }}>
                    <FlatList
                        style={{ width: '100%', paddingTop: 10, marginBottom: '16%' }}
                        data={listCart}

                        renderItem={({ item }) =>
                            <ItemCartMini item={item} onChangeQuantity={onChangeQuantity} onDelete={onDelete} actionDelete={actionNe} />
                        }
                        keyExtractor={(item) => item.id.toString()}
                        numColumns={1}
                    />
                    <View style={{ position: 'absolute', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', bottom: 10, backgroundColor: 'white', start: 0, width: '100%', height: '12%', paddingHorizontal: 20 }}>
                        <View>
                            <Text
                                style={{
                                    width: '100%', color: 'black', fontSize: 16
                                }}>Tổng giá trị</Text>
                            <Text
                                style={{
                                    width: '100%', color: 'black', fontSize: 16, textAlign: 'center', color: 'orange', fontWeight: 'bold'
                                }}>{formatPrice(calculateTotal())} đ</Text>
                        </View>
                        <TouchableOpacity onPress={() => onPay()} style={{ backgroundColor: 'orange', height: '100%', justifyContent: 'center', width: width - 170, alignItems: 'center' }}>
                            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Thanh toán</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </Animated.View>

        </View>
    )
}

export default ListMiniCart

const styles = StyleSheet.create({})
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
        id: 4,
        name: 'Cafe da xay4',
        image: 'https://bonjourcoffee.vn/blog/wp-content/uploads/2020/11/Caramel-Macchiato-da-xay.jpg',
        price: 60,
        description: 'A cappuccino is an asdasd 150 ml (5 oz) beverage, with 25 ml of espresso coffee and 85ml of fresh milk the fo'
    },
    {
        id: 5,
        name: 'Cafe da xay5',
        image: 'https://bonjourcoffee.vn/blog/wp-content/uploads/2020/11/Caramel-Macchiato-da-xay.jpg',
        price: 60,
        description: 'A cappuccino is an dsss 150 ml (5 oz) beverage, with 25 ml of espresso coffee and 85ml of fresh milk the fo'
    },
]