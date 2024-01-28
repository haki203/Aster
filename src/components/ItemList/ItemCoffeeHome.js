import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
const limitText = (text, limit = 150) => {
    if (text.length <= limit) {
        return text;
    } else {
        return text.substring(0, limit) + '...';
    }
};
function formatPrice(so) {
    // Chuyển số thành chuỗi để dễ xử lý
    var chuoiSo = so.toString();

    // Tìm vị trí của dấu chấm thập phân
    var viTriChamThapPhan = chuoiSo.indexOf('.');

    // Nếu không có dấu chấm thập phân, thêm '.000'
    if (viTriChamThapPhan === -1) {
        chuoiSo += '.000';
    } else {
        // Nếu có dấu chấm thập phân, thêm đủ số lượng số 0 để có 3 chữ số thập phân
        while (chuoiSo.length - viTriChamThapPhan < 4) {
            chuoiSo += '0';
        }
    }

    return chuoiSo;
}
const ItemCoffeeHome = ({ item, onPress,width }) => {

    return (
        <TouchableOpacity style={{
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20,
            alignItems: 'center',
            width: width / 2,
            margin: 10,
            paddingVertical: 5
        }}>
            <Text style={{ fontFamily: 'Poppins', fontWeight: '500', color: 'black', fontSize: 16 }}>{item.name}</Text>
            <Image
                style={{ width: '100%', height: 150, borderRadius: 10, marginTop: 5, marginBottom: 5 }}
                source={{ uri: item.image[0] }}
            />
            <Text style={{marginBottom: 10,textAlign:'justify' }} numberOfLines={3} ellipsizeMode="tail" >{limitText(item.description)}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' ,justifyContent:'space-between',width:'100%'}}>
                <Text style={{
                    fontSize: 18, fontWeight: 'bold',
                    fontFamily: 'Poppins', color: 'orange', alignSelf: 'flex-start',
                }}>{formatPrice(item.price)} đ</Text>
                <TouchableOpacity onPress={() => onPress(item)}
                    style={{ backgroundColor: '#C67C4E', justifyContent: 'center', alignItems: 'center', width: 25, height: 25, borderRadius: 5 }}>
                    <Text style={{ color: 'white', fontSize: 18 }}>+</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}

export default ItemCoffeeHome

const styles = StyleSheet.create({})