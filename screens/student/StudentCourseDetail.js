import React, {useEffect, useRef, useState} from "react";
import {ScrollView, Text, TouchableOpacity, View, StyleSheet, RefreshControl} from "react-native";
import BottomScreenNavigation from "../components/BottomScreenNavigation";
import StudentScreenHeader from "../components/StudentScreenHeader";
import {ProgressBar, List} from "react-native-paper";
import RBSheet from "react-native-raw-bottom-sheet";
import {ResizeMode} from 'expo-av';
import {useVideoPlayer, VideoView} from 'expo-video';
import apiInstance from "../../src/utils/Axios";
import {setLoading} from "../../src/store/Actions";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const StudentCourseDetail = ({route, navigation}) => {
    const {user_id, enrollment_id} = route.params;
    const refRBSheet = useRef()
    const [status, setStatus] = useState({});
    const [course, setCourse] = useState([])
    const [refreshing, setRefreshing] = useState(false)
    const [completionPercentage, setCompletionPercentage] = useState(0)
    const [completedLessons, setCompletedLessons] = useState([])

    const [selectedVariantItem, setSelectedVariantItem] = useState({title:'', video:'', content_duration:''})
    const video = useRef(null)
    const videoSource = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

    const player = useVideoPlayer(videoSource, player => {
        player.loop = true;
        player.play();
    });

    const openRBSheet = ()=>{
        refRBSheet.current.open();
    }
    const closeRBSheet = ()=>{
        refRBSheet.current.close();
    }

    const fetchCourseDetail = async ()=>{
        try{
            const response = await apiInstance.get(`student/course-detail/${user_id}/${enrollment_id}/`)
            setCourse(response.data)

            const percentageCompleted = (response?.data?.completed_lesson?.length / response?.data?.lectures?.length) * 100
            setCompletedLessons(response?.data?.completed_lesson)
            setCompletionPercentage(percentageCompleted?.toFixed(0))
            setLoading(false)
        }catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchCourseDetail()
    }, [])

    const onRefresh = ()=>{
        fetchCourseDetail()
    }

    const handleSelectedVariantItem = (title, video, content_duration, variant_item_id)=>{
        setSelectedVariantItem({
            title:title,
            video:video,
            content_duration:content_duration,
            variant_item_id:variant_item_id,
        })
        refRBSheet.current.open();
    }

    const handleMarkCourseAsCompleted = async (VariantItemId)=>{
        const json = {user_id:user_id, course_id:course?.course?.id, variant_item_id:VariantItemId}
        const response = await apiInstance.post('student/course-completed/', json)
        fetchCourseDetail()
    }

    const isCourseCompleted = completedLessons.some((course)=>{
        if(course.variant_item.title === selectedVariantItem?.title){
            return true
        }else{
            return false
        }
    })

    return (
        <View className={'bg-white flex-1 px-3'} >
            <ScrollView vertical
                        showsVerticalScrollIndicator={false}
                        className={'flex-1'}
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                <StudentScreenHeader title={'Dashboard'} returnScreen={'Home'}/>

                <ScrollView showsVerticalScrollIndicator={false} >
                    <Text className={'text-[20px] font-semibold text-center'} >{course?.course?.title}</Text>
                    <View className={'flex-row justify-center items-center gap-3 w-full  p-2 rounded-md mb-3 mt-1'} >
                        <TouchableOpacity onPress={()=>navigation.navigate('Message', {user_id:user_id, enrollment_id:enrollment_id})} className={'bg-[#280e49] w-100 h-10 flex-row justify-center items-center rounded-md gap-2'} >
                            <Text className={'text-white'} >Messages</Text>
                        </TouchableOpacity>

                        <TouchableOpacity className={'bg-[#280e49] w-100 h-10 flex-row justify-center items-center rounded-md gap-2'} >
                            <Text className={'text-white'} >Notes</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>navigation.navigate('Reviews', {user_id:user_id, enrollment_id:enrollment_id})} className={'bg-[#280e49] w-100 h-10 flex-row justify-center items-center rounded-md gap-2'} >
                            <Text className={'text-white'} >Reviews</Text>
                        </TouchableOpacity>
                    </View>

                    <Text className={'fond-bold text-[20px] mt-10 text-center'} >Course Content</Text>
                    <View className={'mt-3 mb-3'} >
                        <ProgressBar progress={completionPercentage/100} color={'blue'}/>
                    </View>

                    <List.Section title=''>
                        {course?.curriculum?.map((v, index)=>(
                            <List.Accordion title={v?.title} key={index} className={'bg-gray-300 rounded-md mb-4'}>
                                {v?.variant_items?.map((i, v_index)=>(
                                    <List.Item
                                        title={i?.title}
                                        className={'ml-10'}
                                        key={v_index}
                                        onPress={()=>handleSelectedVariantItem(i?.title, i?.file, i?.content_duration, i?.variant_item_id)}
                                        left={(props)=>
                                            <List.Icon
                                                {...props}
                                                icon={'play'} />} />
                                ))}
                            </List.Accordion>
                        ))}
                    </List.Section>

                </ScrollView>
            </ScrollView>
            <BottomScreenNavigation />
            <View style={styles.container} >
                <RBSheet
                ref={refRBSheet}
                closeOnDragDown={closeRBSheet}
                closeOnPressMask={closeRBSheet}
                dragFromTopOnly={true}
                height={400}
                customStyles={{wrapper:{backgroundColor:'#00000077'}, draggableIcon:{backgroundColor:'#020e40'}}} >
                    <Text className={'text-center font-semibold text-[17px]'} >{selectedVariantItem?.title} - {selectedVariantItem?.content_duration}</Text>
                    <VideoView
                        player={player}
                        ref={video}
                        style={styles.video}
                        useNativeControls
                        resizeMode={ResizeMode.CONTAIN}
                        isLooping={true}
                        onPlaybackStatusUpdate={(status)=>setStatus(()=>status)}/>
                    <View>
                        {isCourseCompleted === true?(
                            <View className={'flex flex-row gap-2 justify-center items-center mt-6'} >
                                <Text className={'text-center font-semibold text-[17px] text-[#020e40] mb-6'} >Mark as In-Complete</Text>
                                <TouchableOpacity className={'bg-[#280e49] p-1 flex-row justify-center'} >
                                    <FontAwesome5 name={'sign-out-alt'} color={'white'} size={15}/>
                                </TouchableOpacity>
                            </View>
                        ):(
                            <View className={'flex flex-row gap-2 justify-center items-center'} >
                                <Text className={'text-center font-semibold text-[17px] text-[#020e40] mb-6'} >Mark as Completed mt-6</Text>
                                <TouchableOpacity onPress={()=>handleMarkCourseAsCompleted(selectedVariantItem?.variant_item_id)} className={'bg-[#280e49] p-1 flex-row justify-center'} >
                                    <FontAwesome5 name={'check'} color={'white'} size={15}/>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </RBSheet>
            </View>


        </View>
    )
}

export default StudentCourseDetail;

const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
    },
    video:{
        alignSelf:'center',
        width:320,
        height:200,
    },
    button:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    }
})
