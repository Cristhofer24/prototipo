import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import CartasScreen from '../screens/CartasScreen';
import { NavigationContainer } from '@react-navigation/native';

const stack = createStackNavigator();

function Mystack() {
    return (
        <stack.Navigator>
    
            <stack.Screen name='Cards Memory' component={CartasScreen} />
        </stack.Navigator>
    )

}


export default function Main() {
    return (
     <NavigationContainer>
           <Mystack/>
     </NavigationContainer>

            )
}

          