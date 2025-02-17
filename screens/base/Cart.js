import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {Avatar} from "../components/Image";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import React, {useState} from "react";
import ScreenHeader from "../components/ScreenHeader";
import BottomScreenNavigation from "../components/BottomScreenNavigation";
import {useNavigation} from "@react-navigation/native";

const Cart = ({route})=>{

    const navigation = useNavigation()
    const [courses, setCourses] = useState([1, 2, 3, 4, 5])

    return (
        <View className={'bg-white flex-1 px-3'} >
            <ScrollView vertical showsVerticalScrollIndicator={false} className={'flex-1'} >
                <ScreenHeader title={'Cart'} returnScreen={'Home'}/>

                {courses.map((c, index) =>(
                    <View className={'flex-row gap-2 pb-3 w-full bg-gray-200 p-2 rounded-md mb-3'} key={index} >
                        <Image source={Avatar} className={'h-[100px] w-[100px] rounded-md object-cover'} />
                        <View>
                            <Text className={'text-[18px] font-bold'} >Learn Android Development</Text>
                            <Text className={'text-[16px] font-bold mt-1'} >$1.99</Text>
                            <TouchableOpacity className={'bg-[#280e49] w-7 h-7 flex justify-center items-center rounded-md mt-2'} >
                                <FontAwesome5 name={'trash'} color={'white'} size={15}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>
            <View>
                <View className={'bg-gray-200 p-2 rounded-md mt-2'} >
                    <Text className={'text-[18px] font-semibold'} >Summary</Text>
                    <View className={'flex-row items-center justify-between mb-1'} >
                        <Text className={'text-[18px]'} >Sub Total</Text>
                        <Text className={'text-[18px]'} >$20.99</Text>
                    </View>
                    <View className={'flex-row items-center justify-between mb-1'} >
                        <Text className={'text-[18px]'} >Tax</Text>
                        <Text className={'text-[18px]'} >$2.95</Text>
                    </View>
                    <View className={'flex-row items-center justify-between mb-1'} >
                        <Text className={'text-[18px]'} >Total</Text>
                        <Text className={'text-[18px]'} >$122.99</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={()=>navigation.navigate('Checkout')} className={'bg-[#280e49] w-[100%] flex-row justify-center p-2 rounded-md'} >
                    <Text className={'text-white'} >Proceed To Checkout</Text>
                </TouchableOpacity>
            </View>
            <BottomScreenNavigation />
        </View>
    )
}

export default Cart
