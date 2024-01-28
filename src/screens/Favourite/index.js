import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';

const FavouriteScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={{paddingTop: 24}}>
      <Text>FavouriteScreen</Text>
    </View>
  )
}

export default FavouriteScreen

const styles = StyleSheet.create({})