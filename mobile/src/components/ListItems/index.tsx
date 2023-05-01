import React from "react";
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { ItemProps } from "../../pages/order";
import { Feather } from '@expo/vector-icons';

interface ListItemProps{
    data: ItemProps;
    deleteItem: (item_id: string) => void;
}

export function ListItem({data, deleteItem}: ListItemProps){

    function handleDeleteItem(){
        deleteItem(data.id);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.item}>{data.amount} x {data.name}</Text>
            <TouchableOpacity onPress={handleDeleteItem}>
                <Feather name='trash-2' color='#FF3F4B' size={25}/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#101026',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: 12,
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 4,
        borderWidth: 0.3,
        borderColor: '#8A8A8A'
    },
    item: {
        color: '#FFF'
    }
})
