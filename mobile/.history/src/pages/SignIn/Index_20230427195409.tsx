import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SignIn(){
    return (
        <View style={styles.container}>
            <Text>TELA DE LOGIN</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1D1D2E'
    }
})