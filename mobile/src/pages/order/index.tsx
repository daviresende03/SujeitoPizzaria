import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import React, { useState, useEffect } from 'react'
import {View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, FlatList} from 'react-native'
import {Feather} from '@expo/vector-icons'
import { api } from '../../services/api'
import { ModalPicker } from '../../components/ModalPicker'
import { ListItem } from '../../components/ListItems'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StackParamsList } from '../../routes/app.routes'

type RouteDetailParams = {
    Order: {
        number: string | number;
        order_id: string;
    }
}

type OrderRouteProps = RouteProp<RouteDetailParams, 'Order'>;

export type CategoryProps = {
    id: string;
    name: string;
}

type ProductProps = {
    id: string;
    name: string;
}

export type ItemProps = {
    id: string;
    product_id: string;
    name: string;
    amount: string | number;
}

export default function Order(){
    const route = useRoute<OrderRouteProps>();
    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();

    const [categories, setCategories] = useState<CategoryProps[] | []>([]);
    const [categorySelected, setCategorySelected] = useState<CategoryProps | undefined>();
    const [amount, setAmount] = useState('1');
    const [modalCategoryVisible, setModalCategoryVisible] = useState(false);
    const [products, setProducts] = useState<ProductProps[] | []>([]);
    const [productSelected, setProductSelected] = useState<ProductProps | undefined>();
    const [modalProductVisible, setModalProductVisible] = useState(false);
    const [items, setItems] = useState<ItemProps[] | []>([]);

    async function handleCloseOrder(){
        try {
            await api.delete('/orders',{
                params:{
                    order_id: route.params?.order_id
                }
            })
            navigation.goBack();
        } catch (err) {
            alert(err);
        }
    }

    function handleChangeCategory(item: CategoryProps){
        setCategorySelected(item);
    }

    function handleProductChange(item: ProductProps){
        setProductSelected(item);
    }

    async function handleAdd(item: ProductProps) {
        const response = await api.post('/orders/items',{
            order_id: route.params?.order_id,
            product_id: productSelected?.id,
            amount: Number(amount)
        })

        let data = {
            id: response.data.id,
            product_id: productSelected?.id as string,
            name: productSelected?.name as string,
            amount: amount
        }

        setItems(oldArray => [...oldArray,data]);
    }

    async function handleDeleteItem(item_id: string){
        await api.delete('/orders/items',{
            params: {
                item_id
            }
        })

        let removeItem = items.filter(item => {
            return (item.id !== item_id)
        })
        setItems(removeItem);
    }

    function handleFinishOrder(){
        navigation.navigate('FinishOrder',{
            number: route.params?.number,
            order_id: route.params?.order_id
        });
    }

    useEffect(() => {
        async function loadInfo(){
            const response = await api.get('/categories');
            setCategories(response.data);
            setCategorySelected(response.data[0]);
        }
        loadInfo();
    },[])

    useEffect(() => {
        async function loadProducts(){
            const response = await api.get('/products',{
                params:{
                    category_id: categorySelected?.id
                }
            })
            setProducts(response.data);
            setProductSelected(response.data[0]);
        }
        loadProducts();
    },[categorySelected])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Mesa {route.params.number}</Text>
                {items.length === 0 && (
                    <TouchableOpacity onPress={handleCloseOrder}>
                        <Feather name='trash-2' size={28} color='#FF3F4B'/>
                    </TouchableOpacity>
                )}
            </View>

            {categories.length !== 0 && (
                <TouchableOpacity style={styles.input} onPress={() => setModalCategoryVisible(true)}>
                    <Text style={{color: '#FFF'}}>
                        {categorySelected?.name}
                    </Text>
                </TouchableOpacity>
            )}

            {products.length !== 0 && (
                <TouchableOpacity style={styles.input} onPress={() => setModalProductVisible(true)}>
                    <Text style={{color: '#FFF'}}>{productSelected?.name}</Text>
                </TouchableOpacity>
            )}
            
            <View style={styles.qtContainer}>
                <Text style={styles.qtText}>Quantidade</Text>
                <TextInput
                    placeholderTextColor='#F0F0F0'
                    keyboardType='numeric'
                    value={amount}
                    onChangeText={(text) => setAmount(text)}
                    style={[styles.input,{width: '60%',textAlign: 'center'}]}
                />
            </View>

            <View style={styles.action}>
                <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style= {[styles.button, {opacity: items.length === 0 ? 0.3 : 1}]}
                    disabled= {items.length === 0}
                    onPress={handleFinishOrder}
                >
                    <Text style={styles.buttonText}>Avançar</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                showsVerticalScrollIndicator={false}
                style={{flex: 1, marginTop: 24}}
                data={items}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => <ListItem data={item} deleteItem={handleDeleteItem}/>}
            />

            <Modal
                transparent={true}
                visible={modalCategoryVisible}
                animationType='fade'
            >
                <ModalPicker
                    handleCloseModal={() => setModalCategoryVisible(false)}
                    options={categories}
                    selectedItem={handleChangeCategory}
                />
            </Modal>

            <Modal
                transparent={true}
                visible={modalProductVisible}
                animationType='fade'
            >
                <ModalPicker
                    handleCloseModal={() => setModalProductVisible(false)}
                    options={products}
                    selectedItem={handleProductChange}
                />
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#1D1D2E',
        paddingVertical: '5%',
        paddingEnd: '4%',
        paddingStart: '4%'
    },
    header:{
        flexDirection: 'row',
        marginBottom: 12,
        alignItems: 'center',
        marginTop: 24
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FFF',
        marginRight: 14
    },
    input: {
        backgroundColor: '#101026',
        borderRadius: 4,
        width: '100%',
        height: 40,
        marginBottom: 12,
        justifyContent: 'center',
        paddingHorizontal: 8,
        color: '#FFF',
        fontSize: 20
    },
    qtContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    qtText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFF'
    },
    action: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
    },
    buttonAdd:{
        width: '20%',
        backgroundColor: '#3FD1FF',
        borderRadius: 4,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: '#101026',
        fontSize: 18,
        fontWeight: 'bold'
    },
    button: {
        backgroundColor: '#3FFFA3',
        borderRadius: 4,
        height: 40,
        width: '75%',
        alignItems: 'center',
        justifyContent: 'center'
    }
})
