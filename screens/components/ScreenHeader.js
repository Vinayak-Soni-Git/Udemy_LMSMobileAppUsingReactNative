import {Text, TouchableOpacity, View} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import React from "react";
import {useNavigation} from "@react-navigation/native";


function ScreenHeader({title, returnScreen}){
    const navigation = useNavigation()
    return(
        <View className={'bg-[#280e49] p-2 rounded-[8px] mb-3'} >
            <View className={'flex-row items-center justify-between gap-5'} >
                <TouchableOpacity onPress={()=>navigation.navigate(returnScreen)} className={'h-[40px] w-[40px] bg-white rounded-full flex items-center justify-center mx-auto'} >
                    <FontAwesome5 name={'arrow-left'} color={'black'} size={25}/>
                </TouchableOpacity>

                <View>
                    <Text className={'text-white text-[17px] font-semibold text-center'} >{title}</Text>
                </View>

                <TouchableOpacity className={'h-[40px] w-[40px] bg-white rounded-full flex items-center justify-center mx-auto'} >
                    <FontAwesome5 name={'shopping-cart'} color={'black'} size={25}/>
                </TouchableOpacity>
            </View>

        </View>

    )
}

export default ScreenHeader
