import React, {useRef, useState} from "react";
import {Image, ScrollView, Text, TouchableOpacity, View, StyleSheet} from "react-native";
import BottomScreenNavigation from "../components/BottomScreenNavigation";
import StudentScreenHeader from "../components/StudentScreenHeader";
import {ProgressBar, List} from "react-native-paper";
import RBSheet from "react-native-raw-bottom-sheet";
import {ResizeMode} from 'expo-av';
import {useVideoPlayer, VideoView} from 'expo-video';

const StudentCourseDetail = ({route}) => {
    const {user_id, enrollment_id} = route.params;
    const refRBSheet = useRef()
    const [status, setStatus] = useState({});
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

    return (
        <View className={'bg-white flex-1 px-3'} >
            <ScrollView vertical showsVerticalScrollIndicator={false} className={'flex-1'} >
                <StudentScreenHeader title={'Dashboard'} returnScreen={'Home'}/>

                <ScrollView showsVerticalScrollIndicator={false} >
                    <Text className={'text-[20px] font-semibold text-center'} >Learn Android Development</Text>
                    <View className={'flex-row justify-center items-center gap-3 w-full  p-2 rounded-md mb-3 mt-1'} >
                        <TouchableOpacity className={'bg-[#280e49] w-100 h-10 flex-row justify-center items-center rounded-md gap-2'} >
                            <Text className={'text-white'} >Messages</Text>
                        </TouchableOpacity>

                        <TouchableOpacity className={'bg-[#280e49] w-100 h-10 flex-row justify-center items-center rounded-md gap-2'} >
                            <Text className={'text-white'} >Notes</Text>
                        </TouchableOpacity>

                        <TouchableOpacity className={'bg-[#280e49] w-100 h-10 flex-row justify-center items-center rounded-md gap-2'} >
                            <Text className={'text-white'} >Reviews</Text>
                        </TouchableOpacity>
                    </View>

                    <Text className={'fond-bold text-[20px] mt-10 text-center'} >Course Content</Text>
                    <View className={'mt-3 mb-3'} >
                        <ProgressBar progress={0.8} color={'blue'}/>
                    </View>

                    <List.Section title={''}>
                        <List.Accordion className={'pt-[-10px] bg-gray-100 mb-2'} title={'Section 1'} >
                            <List.Item onPress={openRBSheet} className={'ml-10'} title={'Introduction to Java'} left={()=><List.Icon icon={'play'} />} ></List.Item>
                            <List.Item className={'ml-10'} title={'Introduction to Java'} left={()=><List.Icon icon={'lock'} />} ></List.Item>
                            <List.Item className={'ml-10'} title={'Introduction to Java'} left={()=><List.Icon icon={'lock'} />} ></List.Item>
                        </List.Accordion>

                        <List.Accordion className={'pt-[-10px] bg-gray-100 mb-2'} title={'Section 1'} >
                            <List.Item className={'ml-10'} title={'Introduction to Java'} left={()=><List.Icon icon={'play'} />} ></List.Item>
                            <List.Item className={'ml-10'} title={'Introduction to Java'} left={()=><List.Icon icon={'lock'} />} ></List.Item>
                            <List.Item className={'ml-10'} title={'Introduction to Java'} left={()=><List.Icon icon={'lock'} />} ></List.Item>
                        </List.Accordion>

                        <List.Accordion className={'pt-[-10px] bg-gray-100 mb-2'} title={'Section 1'} >
                            <List.Item className={'ml-10'} title={'Introduction to Java'} left={()=><List.Icon icon={'play'} />} ></List.Item>
                            <List.Item className={'ml-10'} title={'Introduction to Java'} left={()=><List.Icon icon={'lock'} />} ></List.Item>
                            <List.Item className={'ml-10'} title={'Introduction to Java'} left={()=><List.Icon icon={'lock'} />} ></List.Item>
                        </List.Accordion>
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
                    <Text className={'text-center font-semibold text-[17px]'} >Programming Courses - 3h 2m</Text>
                    <VideoView
                        player={player}
                        ref={video}
                        style={styles.video}
                        useNativeControls
                        resizeMode={ResizeMode.CONTAIN}
                        isLooping={true}
                        onPlaybackStatusUpdate={(status)=>setStatus(status)}/>
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
    }
})
