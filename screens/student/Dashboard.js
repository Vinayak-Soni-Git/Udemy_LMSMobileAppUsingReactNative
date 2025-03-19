import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import BottomScreenNavigation from "../components/BottomScreenNavigation";
import React from "react";
import StudentScreenHeader from "../components/StudentScreenHeader";
import {Avatar} from "../components/Image";

const Dashboard = () => {
    return (
        <View className={'bg-white flex-1 px-3'} >
            <ScrollView vertical showsVerticalScrollIndicator={false} className={'flex-1'} >
                <StudentScreenHeader title={'Dashboard'} returnScreen={'Home'}/>
                <Text className={'text-[25px] font-bold'} >Dashboard</Text>
                <Text className={'text-[15px] font-bold mb-5'} >Welcome to your dashboard</Text>

                <View className={'bg-gray-200 rounded-md p-2 flex-row flex-wrap'} >
                    <View className={'w-full'} >
                        <View className={'bg-blue-200 h-[70px] rounded-md m-1 flex-col justify-center items-center pt-2'} >
                            <FontAwesome5 name={'book'} color={'#280e49'} size={22} />
                            <Text className={'text-[18px] font-semibold mb-3'} >3 Courses</Text>
                        </View>
                    </View>
                    <View className={'w-1/2'} >
                        <View className={'bg-red-200 h-[70px] rounded-md m-1 flex-col justify-center items-center pt-2'} >
                            <FontAwesome5 name={'graduation-cap'} color={'#280e49'} size={22} />
                            <Text className={'text-[18px] font-semibold mb-3'} >0 Certificates</Text>
                        </View>
                    </View>
                    <View className={'w-1/2'} >
                        <View className={'bg-green-200 h-[70px] rounded-md m-1 flex-col justify-center items-center pt-2'} >
                            <FontAwesome5 name={'play'} color={'#280e49'} size={22} />
                            <Text className={'text-[18px] font-semibold mb-3'} >2 Completed</Text>
                        </View>
                    </View>
                </View>
                <ScrollView showsVerticalScrollIndicator={false} className={'mt-5'} >
                    <Text className={'text-[25px] font-bold'} >My Courses</Text>
                    <Text className={'text-[15px] font-bold mb-5'} ></Text>

                    <View className={'flex-row gap-2 w-full bg-gray-200 p-2 rounded-md mb-3'} key={1} >
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

                    <View className={'flex-row gap-2 w-full bg-gray-200 p-2 rounded-md mb-3'} key={1} >
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
                </ScrollView>
            </ScrollView>
            <BottomScreenNavigation />
        </View>
    )
}

export default Dashboard;
