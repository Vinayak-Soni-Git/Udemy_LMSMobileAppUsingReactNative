import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AntDesign from "react-native-vector-icons/AntDesign";
import React, {useEffect, useRef, useState} from "react";
import { List } from 'react-native-paper';
import ScreenHeader from "../components/ScreenHeader";
import apiInstance from "../../src/utils/Axios";
import moment from 'moment'
import RBSheet from "react-native-raw-bottom-sheet";
import BottomScreenNavigation from "../components/BottomScreenNavigation";
import cardId from "../../src/plugins/CardId";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useUserData from "../../src/plugins/UseUserData";

const CourseDetail = ({route})=>{
    const [expanded, setExpanded] = useState(true);
    const [cartStatus, setCartStatus] = useState(false);
    const [course, setCourse] = useState([])
    const [cartId, setCartId] = useState('')
    const [selectedVariantItem, setSelectedVariantItem] = useState({title:'', video:'', content_duration:''})
    const user_id = useUserData()
    console.log(user_id)

    const refRBSheet = useRef()
    const {course_slug} = route.params

    useEffect(() => {
        fetchCourse()
    }, []);

    const handlePress = () => setExpanded(!expanded);
    const fetchCourse = async()=>{
        const cart_id = await AsyncStorage.getItem('randomString')
        console.log(cart_id)
        setCartId(cart_id)
        try{
            const response = await apiInstance.get(`course/course-detail/${course_slug}`)
            setCourse(response.data)
        }catch(error){
            console.log(error)
        }
    }

    const handleSelectedVariantItem = (title, video, content_duration)=>{
        setSelectedVariantItem({
            title:title,
            video:video,
            content_duration:content_duration,
        })
        refRBSheet.current.open();
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
                <ScreenHeader title={'Course Details'} returnScreen={'Home'} />
                <View className={'pb-3 w-full p-2 rounded'} >
                    <Image source={{uri:course.image}} className={'h-[200px] w-full rounded object-cover'} />
                    <View>
                        <Text className={'text-[20px] text-[#280e49] font-semibold mt-2'}>{course.title}</Text>
                        <Text className={'text-[15px] text-[#280e49] mb-3'}>{course.description}</Text>
                        <View className={'flex-row items-center gap-1 mt-1 mb-3'} >
                            <Text>{course.average_rating || 0}/5</Text>
                            <View className={'flex-row items-center gap-1 mt-1'} >
                                <Text>
                                    {course?.average_rating === 1 ? (
                                        <AntDesign name="star" color={"#dba100"} size={15} />
                                    ) : course?.average_rating === 2 ? (
                                        <>
                                            <AntDesign name="star" color={"#dba100"} size={15} />
                                            <AntDesign name="star" color={"#dba100"} size={15} />
                                        </>
                                    ) : course?.average_rating === 3 ? (
                                        <>
                                            <AntDesign name="star" color={"#dba100"} size={15} />
                                            <AntDesign name="star" color={"#dba100"} size={15} />
                                            <AntDesign name="star" color={"#dba100"} size={15} />
                                        </>
                                    ) : course?.average_rating === 4 ? (
                                        <>
                                            <AntDesign name="star" color={"#dba100"} size={15} />
                                            <AntDesign name="star" color={"#dba100"} size={15} />
                                            <AntDesign name="star" color={"#dba100"} size={15} />
                                            <AntDesign name="star" color={"#dba100"} size={15} />
                                        </>
                                    ) : course?.average_rating === 5 ? (
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
                            <Text>{course.rating_count} Review{course.rating_count > 1 ? 's':''}</Text>
                        </View>
                        <Text className={'text-[15px] mt-4'}>
                            Created By:
                            <Text className={'font-bold'} > { course?.teacher?.full_name}</Text>
                        </Text>
                        <Text className={'text-[15px] mt-1'}>
                            Date Published:
                            <Text className={'font-bold'} >{moment(course?.date).format('DD MMM, YYYY')}</Text>
                        </Text>
                        <Text className={'text-[15px] mt-1'}>
                            Language:
                            <Text className={'font-bold'} > {course?.language}</Text>
                        </Text>
                        <TouchableOpacity onPress={()=>addToCart(course?.id, user_id, course?.price, 'India', cartId)} className={'bg-[#280e49] rounded w-30 flex-row items-center justify-center p-2 gap-2 mt-5'} >
                            <Text className={'text-white text-[18px]'} >Add To Cart</Text>
                            <FontAwesome5 name={'shopping-cart'} color={'#fff'} size={20} />
                        </TouchableOpacity>

                        <Text className={'font-bold text-[20px] mt-10'} >Course Content</Text>
                        <List.Section title=''>
                            {course?.variant?.map((v, index)=>(
                            <List.Accordion title={v?.title} key={index} className={'bg-gray-300 rounded-md mb-4'}>
                                {v?.variant_items?.map((i, v_index)=>(
                                    <List.Item
                                        title={i?.title}
                                        className={'ml-10'}
                                        key={v_index}
                                        onPress={i?.preview?()=>handleSelectedVariantItem(i?.title, i?.file, i?.content_duration):null}
                                        left={(props)=>
                                            <List.Icon
                                                {...props}
                                                icon={i.preview?'play':'lock'} />} />
                                ))}
                            </List.Accordion>
                            ))}
                        </List.Section>
                        <View>
                            <Text className={'font-bold text-[20px] mt-10'} >Course Description</Text>
                            <Text>{course?.description}</Text>
                        </View>

                        <View>
                            <Text className={'font-bold text-[20px] mt-10'} >Course Reviews</Text>
                            {course?.reviews?.map((r, index)=>(
                                <View key={index} className={'bg-gray-200 p-3 rounded-md mb-3'} >
                                    <View>
                                        <Text className={'font-bold text-[17px]'} >{r?.user?.full_name}</Text>
                                        <Text className={'text-[14px]'} >{moment(r?.date).format('DD MMM, YYYY')}</Text>
                                        <View className={'flex-row items-center gap-1 mt-1'} >
                                            <Text>
                                                {r?.rating === 1 ? (
                                                    <AntDesign name="star" color={"#dba100"} size={15} />
                                                ) : r?.rating === 2 ? (
                                                    <>
                                                        <AntDesign name="star" color={"#dba100"} size={15} />
                                                        <AntDesign name="star" color={"#dba100"} size={15} />
                                                    </>
                                                ) : r?.rating === 3 ? (
                                                    <>
                                                        <AntDesign name="star" color={"#dba100"} size={15} />
                                                        <AntDesign name="star" color={"#dba100"} size={15} />
                                                        <AntDesign name="star" color={"#dba100"} size={15} />
                                                    </>
                                                ) : r?.rating === 4 ? (
                                                    <>
                                                        <AntDesign name="star" color={"#dba100"} size={15} />
                                                        <AntDesign name="star" color={"#dba100"} size={15} />
                                                        <AntDesign name="star" color={"#dba100"} size={15} />
                                                        <AntDesign name="star" color={"#dba100"} size={15} />
                                                    </>
                                                ) : r?.rating === 5 ? (
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
                                        <Text className={'mt-3'} >{r?.review}</Text>
                                    </View>
                                </View>
                            ))}

                        </View>
                    </View>
                </View>
            </ScrollView>
            <BottomScreenNavigation />

            <View>
                <RBSheet
                    ref={refRBSheet}
                    closeOnDragDown={true}
                    closeOnPressBack={true}
                    closeOnPressMask={true}
                    height={300}
                    customStyles={{wrapper:{backgroundColor:'#00000077'}, draggableIcon:{backgroundColor:'#020e40'}}}>
                    <Text className={'text-center'} >{selectedVariantItem?.title} - {selectedVariantItem?.content_duration}</Text>
                </RBSheet>
            </View>

        </View>
    )
}

export default CourseDetail
