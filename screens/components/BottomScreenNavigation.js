import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react'
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const BottomScreenNavigation = ()=>{
    return (
        <View className={'h-[60px] rounded fixed bottom-0 left-0 right-0 mt-2'} >
            <View className={'flex-row items-center justify-between gap-[6px]'} >
                <TouchableOpacity>
                    <View className={'flex-col items-center w-[60px] h-[50px] rounded mt-1'} >
                        <View className={'bg-[#020e400e] h-[35px] w-[35px] rounded flex items-center justify-center'} >
                            <FontAwesome5 name={'home'} color={'#280e49'} size={20}/>
                        </View>
                        <Text className={'text-[11px] font-semibold'}>Home</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View className={'flex-col items-center w-[60px] h-[50px] rounded mt-1'} >
                        <View className={'bg-[#020e400e] h-[35px] w-[35px] rounded flex items-center justify-center'} >
                            <FontAwesome5 name={'book'} color={'#280e49'} size={20}/>
                        </View>
                        <Text className={'text-[11px] font-semibold'}>My Courses</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View className={'flex-col items-center w-[60px] h-[50px] rounded mt-1'} >
                        <View className={'bg-[#020e400e] h-[35px] w-[35px] rounded flex items-center justify-center'} >
                            <FontAwesome5 name={'user-check'} color={'#280e49'} size={20}/>
                        </View>
                        <Text className={'text-[11px] font-semibold'}>Dashboard</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View className={'flex-col items-center w-[60px] h-[50px] rounded mt-1'} >
                        <View className={'bg-[#020e400e] h-[35px] w-[35px] rounded flex items-center justify-center'} >
                            <FontAwesome5 name={'cog'} color={'#280e49'} size={20}/>
                        </View>
                        <Text className={'text-[11px] font-semibold'}>Settings</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default BottomScreenNavigation;
