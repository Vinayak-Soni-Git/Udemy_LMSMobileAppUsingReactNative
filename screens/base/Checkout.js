import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {Avatar} from "../components/Image";
import React, {useState} from "react";
import ScreenHeader from "../components/ScreenHeader";
import BottomScreenNavigation from "../components/BottomScreenNavigation";
import {useNavigation} from "@react-navigation/native";

const Checkout = ({route})=>{
    const [courses, setCourses] = useState([1, 2, 3, 4, 5])
    const navigation = useNavigation()
    return (
        <View className={'bg-white flex-1 px-3'} >
            <ScrollView vertical showsVerticalScrollIndicator={false} className={'flex-1'} >
                <ScreenHeader title={'Checkout'} returnScreen={'Cart'}/>

                <ScrollView horizontal={true}>
                    {courses.map((c, index) =>(
                        <View className={'flex-row gap-2 pb-3 mr-3 bg-gray-200 p-2 rounded-md mb-3'} key={index} >
                            <Image source={Avatar} className={'h-[100px] w-[100px] rounded-md object-cover'} />
                            <View>
                                <Text className={'text-[18px] font-bold'} >Learn Android Development</Text>
                                <Text className={'text-[16px] font-bold mt-1'} >$1.99</Text>
                            </View>
                        </View>
                    ))}
                </ScrollView>
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
                <TouchableOpacity onPress={()=>navigation.navigate('Success')} className={'bg-[#280e49] w-[100%] flex-row justify-center p-2 rounded-md'} >
                    <Text className={'text-white'} >Pay With Stripe</Text>
                </TouchableOpacity>
            </View>
            <BottomScreenNavigation />
        </View>
    )
}

export default Checkout;
