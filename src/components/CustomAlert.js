import { StyleSheet, Text, View, Alert, Modal, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { hideModal } from '../redux/actions/modalActions';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring, withTiming
} from 'react-native-reanimated';
const height = Dimensions.get('window').height;
const CustomAlert = ({ onOk, onCancel, handleClickAlert, message, isModalVisible }) => {
    const dispatch = useDispatch();
    const translateY = useSharedValue(-200);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY.value }],
        };
    });
    const handleOKPress = () => {
        translateY.value = withSpring(0);
        onOk && onOk()
    };
    const handleCancelPress = () => {
        translateY.value = withSpring(height / 3, { damping: 111, stiffness: 100 });
        onOk && onOk()
    };
    const onClose = () => {
        dispatch(hideModal());
    };
    useEffect(() => {
        translateY.value = withSpring(height / 3, { damping: 50, stiffness: 300 });
    }, [message, isModalVisible]);
    // useEffect(() => {
    //     translateY.value = withSpring(height/3, { damping: 5, stiffness: 100 });
    // }, [isModalVisible]);
    try {
        return (
            <Animated.View style={[styles.notificationContainer, animatedStyle]}>
                <Text style={styles.notificationText}>{message}</Text>
                <View style={{ flexDirection: 'row',width:'100%',justifyContent:'flex-end',paddingHorizontal:10}}>
                    <TouchableOpacity style={{marginRight:10}} onPress={handleCancelPress}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleOKPress}>
                        <Text style={styles.buttonText}>OK</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        );
    } catch (error) {
        console.log(error);
    }
}

export default CustomAlert

const styles = StyleSheet.create({
    notificationContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20, marginHorizontal: 10,
        paddingVertical: 10,
    },
    notificationText: {
        color: 'black',
        fontSize: 16,
        marginBottom: 8,
    },
    buttonText: {
        color: 'black',
        fontSize: 16,
    },
});
