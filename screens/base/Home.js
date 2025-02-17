import {Image, Text, TouchableOpacity, View, TextInput, ScrollView, Alert} from 'react-native';
import React, {Component, useEffect, useState} from 'react'
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AntDesign from "react-native-vector-icons/AntDesign";
import {Avatar} from '../components/Image'
import {useNavigation} from "@react-navigation/native";
import BottomScreenNavigation from "../components/BottomScreenNavigation";

const Home = ()=>{
    const [trendingCourses, setTrendingCourses] = useState([1, 2, 3, 4, 5]);
    const navigation = useNavigation()

    return (
        <View className={'bg-white flex-1 px-3'} >
            <ScrollView vertical showsVerticalScrollIndicator={false} className={'flex-1'} >
                <View className={'bg-[#280e49] p-2 rounded-[8px] mb-3'} >
                    <View className={'flex-row items-center justify-between'} >
                        <View className={'flex-row items-center gap-2'} >
                            <Image source={Avatar} className={'h-[40px] w-[40px] rounded-full'} />
                            <View>
                                <Text className={'text-[15px] text-white'} >Hello</Text>
                                <Text className={'text-[17px] text-white font-bold'} >Vinayak Soni</Text>
                            </View>
                        </View>
                        <View className={'flex-row items-center gap-2'} >
                            <TouchableOpacity className={'h-[40px] w-[40px] bg-white rounded-full flex items-center justify-center mx-auto'} >
                                <FontAwesome5 name={'shopping-cart'} color={'black'} size={25}/>
                            </TouchableOpacity>
                            <TouchableOpacity className={'h-[40px] w-[40px] bg-white rounded-full flex items-center justify-center mx-auto'} >
                                <FontAwesome5 name={'bell'} color={'black'} size={25}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>navigation.navigate('Login')} className={'h-[40px] w-[40px] bg-[#fe3535] rounded-full flex items-center justify-center mx-auto'} >
                                <FontAwesome5 name={'power-off'} color={'white'} size={25}/>
                            </TouchableOpacity>
                        </View>

                    </View>

                </View>

                <View className={'flex-row items-center justify-between bg-[#E0FFFF] rounded p-2'}>
                    <TextInput placeholder={'Search Course...'}/>
                    <TouchableOpacity>
                        <FontAwesome5 name={'search'} color={'black'} size={18}  />
                    </TouchableOpacity>
                </View>

                <View className={'bg-[#E0FFFF] p-2 mt-3 rounded mb-3]'} >
                    <View className={'flex-row gap-2 items-center justify-between mb-3'} >
                        <Text className={'text-[17px] font-semibold mb-5'} >Trending Courses</Text>
                        <View className={'flex-row gap-2 items-center'} >
                            <Text className={'text-[15px]'} >See All</Text>
                            <FontAwesome5 name={'arrow-right'} color={'black'} size={18}  />

                        </View>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                        {trendingCourses.map((t, index)=>(
                            <View key={index} className={'bg-white w-[300px] p-3 mr-2 rounded'} >
                                <Image source={Avatar} className={'h-[200px] w-full rounded object-cover'} />
                                <View>
                                    <Text className={'text-[20px] font-semibold text-black mt-2'}>Learn Android Development</Text>
                                    <Text className={'text-[15px] text-black mt-1'}>Vinayak Soni</Text>
                                    <View className={'flex-row items-center gap-1 mt-1'} >
                                        <Text>3/5</Text>
                                        <View className={'flex-row items-center gap-1 mt-1'} >
                                            <AntDesign name={'star'} color={'#dba100'} size={15} />
                                        </View>
                                        <Text>2 Reviews</Text>
                                    </View>
                                    <View className={'flex-row items-center justify-between'} >
                                        <Text className={'text-[22px] font-bold mt-3'} >29.99</Text>
                                        <View className={'flex-row items-center gap-2'} >
                                            <TouchableOpacity onPress={()=>navigation.navigate('CourseDetail', {courseId:index})} className={'bg-[#280e49] rounded w-30 flex items-center justify-center p-2'} >
                                                <Text className={'text-white'} >View Course</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={()=>navigation.navigate('Cart')} className={'bg-[#280e49] rounded w-30 flex items-center justify-center p-2'} >
                                                <FontAwesome5 name={'shopping-cart'} color={'white'} size={18.5} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        ))}

                    </ScrollView>
                </View>
                <View className={'bg-[#E0FFFF] p-2 mt-3 rounded mb-3]'} >
                    <View className={'flex-row gap-2 items-center justify-between mb-3'} >
                        <Text className={'text-[17px] font-semibold mb-5'} >Popular Courses</Text>
                        <View className={'flex-row gap-2 items-center'} >
                            <Text className={'text-[15px]'} >See All</Text>
                            <FontAwesome5 name={'arrow-right'} color={'black'} size={18}  />

                        </View>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                        {trendingCourses.map((t, index)=>(
                            <View key={index} className={'bg-white w-[300px] p-3 mr-2 rounded'} >
                                <Image source={Avatar} className={'h-[200px] w-full rounded object-cover'} />
                                <View>
                                    <Text className={'text-[20px] font-semibold text-black mt-2'}>Learn Android Development</Text>
                                    <Text className={'text-[15px] text-black mt-1'}>Vinayak Soni</Text>
                                    <View className={'flex-row items-center gap-1 mt-1'} >
                                        <Text>3/5</Text>
                                        <View className={'flex-row items-center gap-1 mt-1'} >
                                            <AntDesign name={'star'} color={'#dba100'} size={15} />
                                        </View>
                                        <Text>2 Reviews</Text>
                                    </View>
                                    <View className={'flex-row items-center justify-between'} >
                                        <Text className={'text-[22px] font-bold mt-3'} >29.99</Text>
                                        <View className={'flex-row items-center gap-2'} >
                                            <TouchableOpacity onPress={()=>navigation.navigate('CourseDetail')} className={'bg-[#280e49] rounded w-30 flex items-center justify-center p-2'} >
                                                <Text className={'text-white'} >View Course</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity className={'bg-[#280e49] rounded w-30 flex items-center justify-center p-2'} >
                                                <FontAwesome5 name={'shopping-cart'} color={'white'} size={18.5} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                </View>
            </ScrollView>

            <BottomScreenNavigation/>
        </View>
    )
}

export default Home
