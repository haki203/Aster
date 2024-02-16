import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native'
import React from 'react'
const { width, height } = Dimensions.get('window');

const ViewImage = ({ image,onClick }) => {
    return (
        <TouchableOpacity activeOpacity={1} onPress={onClick} style={{
            width: width, flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            height: height, backgroundColor: 'rgba(255, 255, 255,0.5)',
            zIndex: 25,position:'absolute'
        }}>
            <Image style={{ width: width, height: height * 0.8 }} source={{ uri: image }} />
        </TouchableOpacity>
    )
}

export default ViewImage

const styles = StyleSheet.create({})