import React from "react";
import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import BottomScreenNavigation from "../components/BottomScreenNavigation";
import StudentScreenHeader from "../components/StudentScreenHeader";
import {Avatar} from "../components/Image";
import {useNavigation} from "@react-navigation/native";

const MyCourses = () => {
    const navigation = useNavigation();
    return (
        <View className={'bg-white flex-1 px-3'} >
            <ScrollView vertical showsVerticalScrollIndicator={false} className={'flex-1'} >
                <StudentScreenHeader title={'Dashboard'} returnScreen={'Home'}/>
                <Text className={'text-[25px] font-bold'} >My Courses</Text>
                <Text className={'text-[15px] font-bold mb-5'} >View and manage all your courses</Text>

                <ScrollView showsVerticalScrollIndicator={false} >
                    <Text className={'text-[25px] font-bold'} >My Courses</Text>
                    <Text className={'text-[15px] font-bold mb-5'} ></Text>

                    <View className={'flex-row gap-2 w-full bg-gray-200 p-2 rounded-md mb-3'} >
                        <Image source={Avatar} className={'h-[100px] w-[100px] rounded-md object-cover'} />
                        <View>
                            <Text className={'text-[18px] font-bold'} >Learn Android Development</Text>
                            <Text className={'text-[16px] font-bold mt-1'} >3 Sections</Text>
                            <TouchableOpacity className={'bg-[#280e49] w-100 h-10 flex-row justify-center items-center rounded-md gap-2'} >
                                <Text className={'text-white'} >Start Now</Text>
                                <FontAwesome5 name={'play'} color={'white'} size={11}/>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View className={'flex-row gap-2 w-full bg-gray-200 p-2 rounded-md mb-3'} >
                        <Image source={Avatar} className={'h-[100px] w-[100px] rounded-md object-cover'} />
                        <View>
                            <Text className={'text-[18px] font-bold'} >Learn Android Development</Text>
                            <Text className={'text-[16px] font-bold mt-1'} >3 Sections</Text>
                            <TouchableOpacity onPress={()=>navigation.navigate('StudentCourseDetail', {user_id:'1', enrollment_id:'007'})} className={'bg-[#280e49] w-100 h-10 flex-row justify-center items-center rounded-md gap-2'} >
                                <Text className={'text-white'} >Start Now</Text>
                                <FontAwesome5 name={'play'} color={'white'} size={11}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </ScrollView>
            <BottomScreenNavigation />
        </View>
    )
}

export default MyCourses;
