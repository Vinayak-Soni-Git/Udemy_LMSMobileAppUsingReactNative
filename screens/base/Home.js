import {Image, Text, TouchableOpacity, View, TextInput, ScrollView, Alert, ActivityIndicator} from 'react-native';
import React, {useState, useEffect} from 'react'
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AntDesign from "react-native-vector-icons/AntDesign";
import {Avatar} from '../components/Image'
import {useNavigation} from "@react-navigation/native";
import BottomScreenNavigation from "../components/BottomScreenNavigation";
import {logout} from "../../src/utils/Auth";
import {useDispatch} from "react-redux";
import apiInstance from "../../src/utils/Axios";
import useUserData from "../../src/plugins/UseUserData";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = ()=>{
    const [trendingCourses, setTrendingCourses] = useState([]);
    const [loading, setLoading] = useState(true)
    const [cartId, setCartId] = useState('')
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const user_id = useUserData()
    console.log(user_id)

    useEffect(()=>{
        fetchCourses()
    }, [])

    const logoutUser = async ()=>{
        logout(dispatch)
        navigation.navigate('Login')
    }

    const fetchCourses = async ()=>{
        const cart_id = await AsyncStorage.getItem('randomString')
        console.log(cart_id)
        setCartId(cart_id)

        setLoading(true)
        try{
            const response = apiInstance.get('course/course-list/')
            console.log(response)
            setTrendingCourses((await response).data)
            setLoading(false)
        }catch(error){
            console.log(error)
        }
    }

    const addToCart = async (courseId, userId, price, country, cartId)=>{
        alert('adding to cart')
        try{
            const json = {course_id:courseId, user_id:userId, price:price, country:country, cart_id:cartId}
            await apiInstance.post('cart/create/', json).then((res)=>{
                alert('added to cart')
                setTimeout(()=>{

                }, 3000)
            })
        } catch(error){
            console.log(error)
        }
    }

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
                            <TouchableOpacity onPress={()=>navigation.navigate('Cart')} className={'h-[40px] w-[40px] bg-white rounded-full flex items-center justify-center mx-auto'} >
                                <FontAwesome5 name={'shopping-cart'} color={'black'} size={25}/>
                            </TouchableOpacity>
                            <TouchableOpacity className={'h-[40px] w-[40px] bg-white rounded-full flex items-center justify-center mx-auto'} >
                                <FontAwesome5 name={'bell'} color={'black'} size={25}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={logoutUser} className={'h-[40px] w-[40px] bg-[#fe3535] rounded-full flex items-center justify-center mx-auto'} >
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
                        {loading === false ? (
                            <>
                                {trendingCourses?.map((item, index)=>(
                                    <View key={index} className={'bg-white w-[300px] p-3 mr-2 rounded'} >
                                        <Image source={{uri:item.image}} className={'h-[200px] w-full rounded object-cover'} />
                                        <View>
                                            <Text className={'text-[20px] font-semibold text-black mt-2'}>{item.title}</Text>
                                            <Text className={'text-[15px] text-black mt-1'}>{item.teacher?.full_name}</Text>
                                            <View className={'flex-row items-center gap-1 mt-1'} >
                                                <Text>{item?.average_rating || 0}/5</Text>
                                                <View className={'flex-row items-center gap-1 mt-1'} >
                                                    <Text>
                                                        {item?.average_rating === 1 ? (
                                                            <AntDesign name="star" color={"#dba100"} size={15} />
                                                        ) : item?.average_rating === 2 ? (
                                                            <>
                                                                <AntDesign name="star" color={"#dba100"} size={15} />
                                                                <AntDesign name="star" color={"#dba100"} size={15} />
                                                            </>
                                                        ) : item?.average_rating === 3 ? (
                                                            <>
                                                                <AntDesign name="star" color={"#dba100"} size={15} />
                                                                <AntDesign name="star" color={"#dba100"} size={15} />
                                                                <AntDesign name="star" color={"#dba100"} size={15} />
                                                            </>
                                                        ) : item?.average_rating === 4 ? (
                                                            <>
                                                                <AntDesign name="star" color={"#dba100"} size={15} />
                                                                <AntDesign name="star" color={"#dba100"} size={15} />
                                                                <AntDesign name="star" color={"#dba100"} size={15} />
                                                                <AntDesign name="star" color={"#dba100"} size={15} />
                                                            </>
                                                        ) : item?.average_rating === 5 ? (
                                                            <>
                                                                <AntDesign name="star" color={"#dba100"} size={15} />
                                                                <AntDesign name="star" color={"#dba100"} size={15} />
                                                                <AntDesign name="star" color={"#dba100"} size={15} />
                                                                <AntDesign name="star" color={"#dba100"} size={15} />
                                                                <AntDesign name="star" color={"#dba100"} size={15} />
                                                            </>
                                                        ) : (
                                                            <Text>Rating Not Added</Text>
                                                        )}
                                                    </Text>

                                                </View>
                                                <Text>2 Reviews</Text>
                                            </View>
                                            <View className={'flex-row items-center justify-between'} >
                                                <Text className={'text-[22px] font-bold mt-3'} >${item?.price}</Text>
                                                <View className={'flex-row items-center gap-2'} >
                                                    <TouchableOpacity onPress={()=>navigation.navigate('CourseDetail', {course_slug:item?.slug})} className={'bg-[#280e49] rounded w-30 flex items-center justify-center p-2'} >
                                                        <Text className={'text-white'} >View Course</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity onPress={()=>addToCart(item?.id, user_id, item?.price, 'India', cartId)} className={'bg-[#280e49] rounded w-30 flex items-center justify-center p-2'} >
                                                        <FontAwesome5 name={'shopping-cart'} color={'white'} size={18.5} />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                ))}
                            </>
                        ):(
                             <><ActivityIndicator size={'large'} color={'black'}/></>
                        )}

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
                        {trendingCourses?.map((t, index)=>(
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
