import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useContext, useEffect, useState, useCallback } from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Login from '../screens/Login/Login';
import HomeScreen from '../screens/HomeScreen';
import { useSelector } from 'react-redux';
import NotificationScreen from '../screens/Notification';
import FavouriteScreen from '../screens/Favourite';
import CartScreen from '../screens/Cart';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon3 from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Detail from '../screens/Detail';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Home = () => {
    return (
        <Stack.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
    )
}

const HomeTab = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                color: '#FF6347',
                tabBarActiveTintColor: '#FF6347',
                tabBarLabel: () => null, // Ẩn tên của tab
                tabBarStyle: { height: 50, borderTopLeftRadius: 22, borderTopRightRadius: 22, backgroundColor: 'white' },
            })}
        >
            <Tab.Screen
                name="Trang chủ"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Icon3 name="home" color={color} size={26} />
                    ),
//loi o day, khong thay dc chieu cao o man home
                }}
            >
                {() => (
                    <Home />
                )}
            </Tab.Screen>
            <Tab.Screen
                name="Yêu thích"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="heart-o" color={color} size={26} />
                    ),
                }}
            >
                {() => (
                    <FavouriteScreen />
                )}
            </Tab.Screen>
            <Tab.Screen
                name="Giỏ hàng"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Icon2 name="whatshot" color={color} size={26} />
                    ),
                }}
            >
                {() => (
                    <CartScreen />
                )}
            </Tab.Screen>

            <Tab.Screen
                name="Thông báo"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Icon2 name="book" color={color} size={26} />
                    ),
                    tabBarStyle: { display: 'none' },
                }}
            >
                {() => (
                    <NotificationScreen />
                )}
            </Tab.Screen>
        </Tab.Navigator>
    )
}

const AppNavigator = () => {
    return (
        <View style={{ flex: 1,backgroundColor:'#F9F9F9' }}>
            {/* <HomeTab /> */}
            <Detail/>
        </View>
    )
}

export default AppNavigator;

const styles = StyleSheet.create({
    iconTab: { width: 30, height: 29 }
})