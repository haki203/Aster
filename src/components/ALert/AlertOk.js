import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const AlertOk = ({ message, onClose, height }) => {
    const [translateX] = useState(new Animated.Value(-300)); // Bắt đầu từ vị trí bên trái của màn 

    useEffect(() => {
        Animated.timing(translateX, {
            toValue: 0, // Khi kết thúc animation, chuyển vị trí về 0 (giữa màn hình)
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [translateX]);

    const handleClose = () => {
        Animated.timing(translateX, {
            toValue: 400, // Khi đóng, chuyển vị trí về bên phải (nằm ngoài màn hình)
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            onClose();
        });
    };

    return (
        <Animated.View style={{ ...styles.alertContainer, transform: [{ translateX }], marginTop: height / 2.7 }}>
            <View style={{alignItems:'center',justifyContent:'center',backgroundColor:'green',width:55,height:55,marginBottom:10,alignSelf:'center',borderRadius:100}}>
                <MaterialIcons color={'black'} size={22} name={'done'} />
            </View>
            <Text style={styles.alertText}>{message}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'flex-end' }}>

                <TouchableOpacity style={styles.btn} onPress={handleClose}>
                    <Text style={styles.closeButton}>Ok</Text>
                </TouchableOpacity>
            </View>
        </Animated.View>
    );
};

const styles = {
    alertContainer: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 15,
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
        zIndex: 1,
    },
    alertText: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18,
    },
    closeButton: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 16,
    },
    btn:{
        width:55,
        height:40,
        backgroundColor:'green',
        alignItems:'center',
        justifyContent:'center',
        marginTop:10,
        borderRadius:10,
        padding:10,
        marginLeft:10,
    }
};

export default AlertOk;
