import { StyleSheet, Text, View, Alert, Modal, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { hideModal } from '../redux/actions/modalActions';
const CustomAlert = ({ onOk, onCancel ,isModalVisible}) => {
    const dispatch = useDispatch();

    const onClose = () => {
        dispatch(hideModal());
    };

    try {
        return (
            <View style={{backgroundColor:'yellow',width:'100%',height:'100%'}}>
                {isModalVisible ?
                    (
                        <Modal
                        style={{justifyContent:'center',alignItems:'center',backgroundColor:'yellow',width:'100%',height:'100%',}}
                            isVisible={true}

                        >
                            <View style={{backgroundColor:'black',width:222,height:222,}}>
                                <Text>Thông báo chi tiết ở đây...</Text>
                                <TouchableOpacity onPress={onOk}>
                                    <Text>OK</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={onCancel}>
                                    <Text>Hủy</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={onClose}>
                                    <Text>Đóng</Text>
                                </TouchableOpacity>
                            </View>
                        </Modal>
                    ) :
                    <View style={{display:'none'}}></View>
                }
            </View>
        )
    } catch (error) {
        console.log(error);
    }
}

export default CustomAlert

const styles = StyleSheet.create({})