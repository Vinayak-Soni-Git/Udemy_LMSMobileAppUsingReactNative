import {ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {Avatar} from "../components/Image";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import React, {useEffect, useState} from "react";
import ScreenHeader from "../components/ScreenHeader";
import BottomScreenNavigation from "../components/BottomScreenNavigation";
import {useNavigation} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import apiInstance from "../../src/utils/Axios";
import useUserData from "../../src/plugins/UseUserData";

const Cart = ({route})=>{

    const navigation = useNavigation()
    const [cart, setCart] = useState([])
    const [cartStats, setCartStats] = useState([])
    const [loading, setLoading] = useState(true)
    const [cartId, setCartId] = useState('')
    const userId = useUserData()

    const fetchCartItems = async () => {
        const cart_id = await AsyncStorage.getItem('randomString')
        setCartId(cart_id)
        setLoading(true)
        try{
            const cart_response = await apiInstance.get(`cart/list/${cart_id}`)
            const cart_stats_response = await apiInstance.get(`cart/stats/${cart_id}`)

            setCart(cart_response.data)
            setCartStats(cart_stats_response.data)
            setLoading(false)
        }catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        fetchCartItems()
    }, []);

    const deleteCartItem = async (cartId, itemId, ) => {
        const url = await `cart/item-delete/${cartId}/${itemId}/`
        await apiInstance.delete(url)
        fetchCartItems()
    }

    const createCartOrder = async () =>{
        try{
            const json = {
                cart_id:cartId,
                user_id:userId,
            }
            const response = await apiInstance.post('order/create-order/', json)
            navigation.navigate('Checkout', {checkout_id:response.data.order_oid})
        }catch(error){
            console.log(error)
        }
    }

    return (
        <View className={'bg-white flex-1 px-3'} >
            <ScrollView vertical showsVerticalScrollIndicator={false} className={'flex-1'} >
                <ScreenHeader title={'Cart'} returnScreen={'Home'}/>
                {loading ?(
                    <ActivityIndicator size={'large'} color={'black'}/>
                ):(
                    <View>
                    {cart.map((c, index) =>(
                            <View className={'flex-row gap-2 pb-3 w-full bg-gray-200 p-2 rounded-md mb-3'} key={index} >
                                <Image source={{uri:c?.course?.image}} className={'h-[100px] w-[100px] rounded-md object-cover'} />
                                <View>
                                    <Text className={'text-[18px] font-bold'} >{c?.course?.title?.slice(0, 25)}...</Text>
                                    <Text className={'text-[16px] font-bold mt-1'} >${c?.course?.price}</Text>
                                    <TouchableOpacity onPress={()=>deleteCartItem(c?.cart_id, c?.id)} className={'bg-[#280e49] w-7 h-7 flex justify-center items-center rounded-md mt-2'} >
                                        <FontAwesome5 name={'trash'} color={'white'} size={15}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                        {cart?.length < 1 && <Text className={'text-center text-2xl'} >Your Cart is empty</Text>}
                    </View>

                    )
                }


            </ScrollView>
            <View>
                <View className={'bg-gray-200 p-2 rounded-md mt-2'} >
                    <Text className={'text-[18px] font-semibold'} >Summary</Text>
                    <View className={'flex-row items-center justify-between mb-1'} >
                        <Text className={'text-[18px]'} >Sub Total</Text>
                        <Text className={'text-[18px]'} >${cartStats?.price}</Text>
                    </View>
                    <View className={'flex-row items-center justify-between mb-1'} >
                        <Text className={'text-[18px]'} >Tax</Text>
                        <Text className={'text-[18px]'} >${cartStats?.tax}</Text>
                    </View>
                    <View className={'flex-row items-center justify-between mb-1'} >
                        <Text className={'text-[18px]'} >Total</Text>
                        <Text className={'text-[18px]'} >${cartStats?.total}</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={createCartOrder} className={'bg-[#280e49] w-[100%] flex-row justify-center p-2 rounded-md'} >
                    <Text className={'text-white'} >Proceed To Checkout</Text>
                </TouchableOpacity>
            </View>
            <BottomScreenNavigation />
        </View>
    )
}

export default Cart
