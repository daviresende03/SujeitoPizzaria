import React from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';

export default function SignIn(){
    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../../assets/logo.png')}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder='Infome seu email'
                    style={styles.input}
                    placeholderTextColor='#F0F0F0'
                />
                <TextInput
                    placeholder='Informe sua senha'
                    style={styles.input}
                    placeholderTextColor='#F0F0F0'
                />
                <TouchableOpacity
                    <Text>Acessar</Text>
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1D1D2E'
    },
    logo: {
        marginBottom: 18
    },
    inputContainer: {
        width: '95%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 32,
        paddingHorizontal: 14
    },
    input: {
        width: '95%',
        height:40,
        backgroundColor: '#101026',
        marginBottom: 12,
        borderRadius: 4,
        paddingHorizontal: 8, //Padding na esquerda e direita
        color: '#FFF'
    }
})