import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useContext, useEffect, useState, useCallback } from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Login from '../components/page/Login/Login';
import HomeScreen from '../screens/Home';
const Stack = createStackNavigator();
const Home = () => {
    return (
        <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
    )
}

// const Mains = () => {
//     return (
//         <Stack.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }}>
//             <Stack.Screen name="Home" component={HomeScreen} />
//             <Stack.Screen name="Viewauthor" component={Viewauthor} />
//             <Stack.Screen name="Viewdetail" component={Viewdetail} />
//             <Stack.Screen name='Detail' component={BookDetail} />
//             <Stack.Screen name='Navigate' component={Navigate} />
//             <Stack.Screen name='Play' component={PlayScreen} />
//             <Stack.Screen name='Read' component={Read} />
//             <Stack.Screen name='SearchScreen' component={SearchScreen} />
//             <Stack.Screen name='Profile' component={ProfileScreen} />
//             <Stack.Screen name='Welcome' component={ManChao} />
//             <Stack.Screen name='LoginUser' component={LoginUser} />
//             <Stack.Screen name='WaitScreen' component={WaitScreen} />
//         </Stack.Navigator>

//     )
// }
// const Favourite = () => {
//     return (
//         <Stack.Navigator initialRouteName='Favourite' screenOptions={{ headerShown: false }}>
//             <Stack.Screen name='Favourite' component={FavouriteScreen} />
//             <Stack.Screen name="SearchScreen" component={SearchScreen} />
//             <Stack.Screen name="DetailScreen" component={BookDetail} />
//         </Stack.Navigator>
//     )
// }
// const Hot = () => {
//     return (
//         <Stack.Navigator initialRouteName='HotScreen' screenOptions={{ headerShown: false }}>
//             <Stack.Screen name='HotScreen' component={HotScreen} />
//             <Stack.Screen name="SearchHot" component={SearchScreen} />
//             <Stack.Screen name="PlayHot" component={PlayScreen} />
//             <Stack.Screen name="DetailHot" component={BookDetail} />
//         </Stack.Navigator>
//     )
// }
// const Library = () => {
//     return (
//         <Stack.Navigator initialRouteName='LibraryScreen' screenOptions={{ headerShown: false }}>
//             <Stack.Screen name='LibraryScreen' component={LibraryScreen} />
//             <Stack.Screen name="SearchScreen" component={SearchScreen} />
//         </Stack.Navigator>
//     )
// }
// const ManChao = () => {
//     return (
//         <Stack.Navigator initialRouteName='Guess' screenOptions={{ headerShown: false }}>
//             <Stack.Screen name="Guess" component={WelcomeGuess} />
//             <Stack.Screen name='HomeDemo' component={ChuaLogin} />
//             <Stack.Screen name='Home' component={Home} />
//             <Stack.Screen name='Chao' component={ChaoBan} />
//         </Stack.Navigator>

//     )
// }
// const Librarycc = () => {
//     return (
//         <Stack.Navigator initialRouteName='Library' screenOptions={{ headerShown: false }}>
//             <Stack.Screen name="Library" component={LibraryScreen} />
//             <Stack.Screen name='Detail' component={BookDetail} />
//             <Stack.Screen name='Read' component={Read} />
//             <Stack.Screen name='Setting' component={ProfileScreen} />
//         </Stack.Navigator>

//     )
// }

// const Home = ({ scrollY }) => {
//     // const isTabVisibleRedux = useSelector(state => state.scroll.isTabVisible);
//     const { isTabVisible, setIsTabVisible } = useContext(AppContext);
//     const [display, setDisplay] = useState("");

//     // Sử dụng useEffect để theo dõi thay đổi của isTabVisible trong Redux
//     useEffect(() => {
//         if (isTabVisible) {
//             setDisplay('flex');
//         }
//         else {
//             setDisplay('none');
//         }
//     }, [isTabVisible]);
//     return (
//         <Tab.Navigator
//             screenOptions={({ route }) => ({
//                 headerShown: false,
//                 color: '#FF6347',
//                 tabBarLabelStyle: { display: 'none' },
//                 tabBarActiveTintColor: '#FF6347',
//                 tabBarStyle: { height: 75, borderTopLeftRadius: 40, borderTopRightRadius: 40, display: display, backgroundColor: 'white' },
//             })}
//         >
//             <Tab.Screen
//                 name="Trang chủ"
//                 options={{
//                     headerShown: false,
//                     tabBarIcon: ({ color, size }) => (
//                         <Icon3 name="home" color={color} size={30} />
//                     ),
//                 }}
//             >
//                 {() => (
//                     <Mains />
//                 )}
//             </Tab.Screen>
//             <Tab.Screen
//                 name="Yêu thích"
//                 options={{
//                     headerShown: false,
//                     tabBarIcon: ({ color, size }) => (
//                         <Icon name="heart-o" color={color} size={30} />
//                     ),
//                 }}
//             >
//                 {() => (
//                     <Favourite />
//                 )}
//             </Tab.Screen>
//             <Tab.Screen
//                 name="Sách hot"
//                 options={{
//                     headerShown: false,
//                     tabBarIcon: ({ color, size }) => (
//                         <Icon2 name="whatshot" color={color} size={30} />
//                     ),
//                 }}
//             >
//                 {() => (
//                     <Hot />
//                 )}
//             </Tab.Screen>

//             <Tab.Screen
//                 name="Thư viện"
//                 options={{
//                     headerShown: false,
//                     tabBarIcon: ({ color, size }) => (
//                         <Icon2 name="book" color={color} size={30} />
//                     ),
//                 }}
//             >
//                 {() => (
//                     <Librarycc />
//                 )}
//             </Tab.Screen>

//         </Tab.Navigator>

//     )

// }
// const Play = () => {
//     return (
//         <Stack.Navigator
//             screenOptions={{
//                 headerShown: false,
//                 ...TransitionPresets.ModalSlideFromBottomIOS, // Sử dụng animation slide-up
//             }}
//         >
//             <Stack.Screen name="Home">
//                 {(props) => (
//                     <Mains />
//                 )}
//             </Stack.Screen>
//             <Stack.Screen name="Detail">
//                 {(props) => (
//                     <DetailScreen navigation={props.navigation} />
//                 )}
//             </Stack.Screen>
//             <Stack.Screen name="Search">
//                 {(props) => (
//                     <SearchScreen navigation={props.navigation} />
//                 )}
//             </Stack.Screen>
//             <Stack.Screen name="Hot">
//                 {(props) => (
//                     <ScreenWrapper>
//                         <HotScreen navigation={props.navigation} />
//                     </ScreenWrapper>
//                 )}
//             </Stack.Screen>
//             <Stack.Screen name="SignUp">
//                 {(props) => (
//                     <ScreenWrapper>
//                         <SignUpScreen navigation={props.navigation} />
//                     </ScreenWrapper>
//                 )}
//             </Stack.Screen>
//         </Stack.Navigator>
//     );
// };
// const ChuaLogin = () => {
//     return (
//         <Stack.Navigator initialRouteName='HomeDemo' screenOptions={{ headerShown: false }}>
//             <Stack.Screen name='HomeDemo' component={HomeDemo} />
//             <Stack.Screen name="DetailDemo" component={BookDetailDemo} />
//             <Stack.Screen name="PlayDemo" component={PlayDemo} />
//             <Stack.Screen name="ReadDemo" component={ReadDemo} />
//             <Stack.Screen name="Home" component={ChaoBan} />
//             <Stack.Screen name="SearchDemo" component={SearchDemo} />
//             <Stack.Screen name="GoLogin" component={LoginUser} />
//         </Stack.Navigator>
//     )
// }

// const ChaoBan = () => {
//     const { isLogin, setIsLogin } = useContext(AppContext);
//     const { test } = useContext(AppContext);
//     return (
//         <>
//             {
//                 <>{!isLogin ? <Users /> : <View style={{ flex: 1, backgroundColor: 'white' }}><Home /></View>}</>
//             }
//         </>
//     )
// }
const AppNavigator = () => {
    return (
        <Home />

    )

}

export default AppNavigator;

const styles = StyleSheet.create({
    iconTab: { width: 30, height: 29 }
})