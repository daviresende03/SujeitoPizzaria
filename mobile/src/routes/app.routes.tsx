import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from '../pages/dashboard';
import Order from '../pages/order';
import FinishOrder from '../pages/FinishOrder';

export type StackParamsList = {
    Dashborad: undefined;
    Order: {
        number: string | number;
        order_id: string;
    };
    FinishOrder: {
        number: number | string;
        order_id: string;
    };
};

const Stack = createNativeStackNavigator<StackParamsList>();

function AppRoutes(){
    return(
        <Stack.Navigator>
            <Stack.Screen 
                name="Dashborad" 
                component={Dashboard} 
                options={{headerShown: false}}
            />
            <Stack.Screen 
                name="Order" 
                component={Order} 
                options={{headerShown: false}}
            />
            <Stack.Screen 
                name="FinishOrder" 
                component={FinishOrder} 
                options={{
                    title: 'Finalizando Pedido',
                    headerStyle: {
                        backgroundColor: '#1D1D2E'
                    },
                    headerTintColor: '#FFF'
                }}
            />
        </Stack.Navigator>
    )
}
export default AppRoutes;
