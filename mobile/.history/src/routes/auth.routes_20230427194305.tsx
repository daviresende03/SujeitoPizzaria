import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from '../pages/SignIn/Index';

const Stack = createNativeStackNavigator();

function AuthRoutes(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="signIn" component={SignIn}
        </Stack.Navigator>
    )
}