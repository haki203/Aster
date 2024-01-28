import { Dimensions, FlatList, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View, Animated, PanResponder } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
const { width, height } = Dimensions.get('window');
import Ionicons from 'react-native-vector-icons/Ionicons';

const Detail = () => {
    const [image, setImage] = useState(listCoffee[0].image)
    const [num, setNum] = useState(0)
    const renderItem = ({ item }) => (
        <ImageBackground
            style={{ width: width, height: width * 0.9 }}
            source={{ uri: item }}
        />
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
    return (
        <View style={styles.container}>
            <TouchableOpacity style={{ backgroundColor: 'white', position: 'absolute', top: 40, start: 20, padding: 5, borderRadius: 10, zIndex: 22 }}>
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
                                    width: 16, height: 16, borderRadius: 20, padding: 2,
                                    backgroundColor: i === num ? '#b3b3b3' : 'white',
                                }}></TouchableOpacity>
                        ))
                    }
                </View>
            </View>
            <View style={{ flex: 1, marginTop: -25, borderTopStartRadius: 35, borderTopEndRadius: 35, backgroundColor: 'white' }}>

            </View>
        </View>
    )
}

export default Detail


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
})
const listCoffee = [
    {
        id: 1,
        name: 'Cafe da xay1',
        image: ['https://bonjourcoffee.vn/blog/wp-content/uploads/2020/11/Caramel-Macchiato-da-xay.jpg',
            'https://jarvis.vn/wp-content/uploads/2019/05/cafe-da-xay-thach-3.jpg',
            'https://images.4yuuu.com/files/article/213265/large_213265_3.jpg?09070600'],
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