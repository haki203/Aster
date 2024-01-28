import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { formatPrice } from '../../screens/Home/function'
import AntDesign from 'react-native-vector-icons/AntDesign';
const { width, height } = Dimensions.get('window');
const ItemCartMini = ({ item, onChangeQuantity,onDelete,actionDelete }) => {
    const [quantity, setQuantity] = React.useState(item.quantity)
    const onChangeQuantityNe = (action) => {
        onChangeQuantity({ quantity: quantity, id: item.id, action: action });
        setQuantity(quantity + action)
    }
    return (
        <View style={{ width: '100%', flexDirection: 'row', borderRadius: 10, padding: 20,borderBottomWidth: 0.6, borderTopWidth: 0.6, borderColor: '#d6d6d6' }}>
            <Image style={{ width: 130, height: 150, borderRadius: 20, marginRight: 10 }} source={{ uri: item.image }} />
            <View>
                <Text>{item.name}</Text>
                <Text>Ly nho</Text>
                <Text>Them ghi chu...</Text>
                <View
                    style={
                        {
                            flexDirection: 'row', alignItems: 'center',
                            justifyContent: 'space-between', width: width - 175,
                        }}>
                    <Text>{formatPrice((item.price) * quantity)} đ</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity disabled={quantity < 2} onPress={() => onChangeQuantityNe(-1)}
                            style={[styles.btn, { backgroundColor: 'white', borderWidth: 1, borderColor: 'grey' }]}>
                            <Text style={[styles.txt, { color: 'orange' }]}>—</Text>
                        </TouchableOpacity>
                        <Text>{quantity}</Text>
                        <TouchableOpacity onPress={() => onChangeQuantityNe(1)}
                            style={styles.btn}>
                            <Text style={styles.txt}>+</Text>
                        </TouchableOpacity>
                    </View>

                </View>
                <TouchableOpacity onPress={()=>onDelete(item,actionDelete)} style={{position:'absolute',end:5,bottom:0,backgroundColor:'orange',padding:5,borderRadius:5}}>
                    <AntDesign size={20} color={'black'} name={'delete'} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ItemCartMini

const styles = StyleSheet.create({
    btn: {
        width: 30,
        height: 30,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'orange',
        marginHorizontal: 5
    },
    txt: {
        color: 'white',
        fontSize: 18, fontWeight: 'bold'
    }
})