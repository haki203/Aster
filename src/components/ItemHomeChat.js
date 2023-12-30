import { StyleSheet, Text, View, TouchableOpacity, Image,ToastAndroid, ScrollView, FlatList,Dimensions, Button, Modal, Animated } from 'react-native'
import React, { useState, useContext, useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon_3 from 'react-native-vector-icons/AntDesign';
const { width, height } = Dimensions.get('window');
import Clipboard from '@react-native-clipboard/clipboard';
const ItemHomeChat = (props) => {
    const { dulieu, navigation, isDarkMode } = props;
    const [like, setLike] = useState(false);
    const [dislike, setDislike] = useState(false);
    const pressLike = () => {
        if(!like){
            setLike(true)
        }else{
            setLike(false)
        }
        setDislike(false)
    }
    const pressLike1 = () => {
        setLike(false)
        if(!dislike){
            setDislike(true)
        }else{
            setDislike(false)
        }
    }
    const pressCopy = (text) => {
        Clipboard.setString(text);
        ToastAndroid.show("Sao chép thành công", ToastAndroid.SHORT);
    }


    try {
        return (
            
            <View style={{ flex: 1 }}>

                <View style={{ flexDirection: 'column', justifyContent: dulieu.role ? 'flex-end' : 'flex-start', paddingVertical: 10 }}>
                    {
                        dulieu.role ? (
                            <View style={[styles.itemContainer, { alignSelf: 'flex-end' }]}><Text selectable={true} style={{ color: 'grey' }}>{dulieu.message}</Text></View>
                        ) : (
                            <View style={[styles.itemContainer, { backgroundColor: '#FFFBF2' }]}>
                                <Text selectable={true} style={styles.textHello}>{dulieu.message}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 10 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                        <TouchableOpacity onPress={pressLike} style={styles.btnCopy}>
                                            <AntDesign style={{ marginRight: 5 }} name={like?'like1':'like2'} size={18} color={isDarkMode ? 'white' : 'black'} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={pressLike1} style={styles.btnCopy}>
                                            <AntDesign style={{ marginRight: 5 }} name={dislike?'dislike1':'dislike2'} size={18} color={isDarkMode ? 'white' : 'black'} />
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity onPress={()=>pressCopy(dulieu.message)} style={styles.btnCopy}>
                                        <Ionicons style={{ marginRight: 5 }} name="copy-outline" size={18} color={isDarkMode ? 'white' : 'black'} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    }
                </View>
            </View>
        )
    } catch (error) {
        console.log("item error:", error);
    }
}

export default ItemHomeChat

const styles = StyleSheet.create({
    itemContainer: {
        width: '80%',
        backgroundColor: 'white',
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
        paddingBottom: 5
    },
    textHello: {
        fontSize: 14,
        color: '#403E39'

    },
    btnCopy: { flexDirection: 'row', alignSelf: 'flex-end', alignItems: 'center' },
})