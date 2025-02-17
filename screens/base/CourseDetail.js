import {Image, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import {Avatar} from "../components/Image";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AntDesign from "react-native-vector-icons/AntDesign";
import React, {useState} from "react";
import { List } from 'react-native-paper';
import ScreenHeader from "../components/ScreenHeader";

const CourseDetail = ({route})=>{
    const [expanded, setExpanded] = useState(true);

    const handlePress = () => setExpanded(!expanded);
    const {course_slug} = route.params
    return (
        <View className={'bg-white flex-1 px-3'} >
            <ScrollView vertical showsVerticalScrollIndicator={false} className={'flex-1'} >
                <ScreenHeader title={'Course Details'} returnScreen={'Home'} />
                <View className={'pb-3 w-full p-2 rounded'} >
                    <Image source={Avatar} className={'h-[200px] w-full rounded object-cover'} />
                    <View>
                        <Text className={'text-[20px] text-[#280e49] font-semibold mt-2'}>Learn Android Development</Text>
                        <Text className={'text-[15px] text-[#280e49] mb-3'}>Lorem ipsum dolor sit amet. Eum laboriosam nisi qui consequatur sunt qui repellendus
                            reiciendis ut delectus cupiditate rem nostrum inventore. Et dolor consectetur qui galisum
                            voluptatem aut fugiat sequi? Quo rerum asperiores et consequatur eaque et dolore porro qui
                            adipisci nobis ut dolores nemo et blanditiis omnis aut debitis consectetur.
                        </Text>
                        <View className={'flex-row items-center gap-1 mt-1 mb-3'} >
                            <Text>3/5</Text>
                            <View className={'flex-row items-center gap-1 mt-1'} >
                                <AntDesign name={'star'} color={'#dba100'} size={15}/>
                                <AntDesign name={'star'} color={'#dba100'} size={15}/>
                                <AntDesign name={'star'} color={'#dba100'} size={15}/>
                                <AntDesign name={'star'} color={'#dba100'} size={15}/>
                            </View>
                            <Text>2 Reviews</Text>
                        </View>
                        <Text className={'text-[15px] mt-4'}>
                            Created By:
                            <Text className={'font-bold'} > Destiny Franks</Text>
                        </Text>
                        <Text className={'text-[15px] mt-1'}>
                            Last Updated:
                            <Text className={'font-bold'} >7 Feb, 2024.</Text>
                        </Text>
                        <Text className={'text-[15px] mt-1'}>
                            Language:
                            <Text className={'font-bold'} > English</Text>
                        </Text>
                        <TouchableOpacity className={'bg-[#280e49] rounded w-30 flex-row items-center justify-center p-2 gap-2 mt-5'} >
                            <Text className={'text-white text-[18px]'} >Add To Cart</Text>
                            <FontAwesome5 name={'shopping-cart'} color={'#fff'} size={20} />
                        </TouchableOpacity>

                        <Text className={'font-bold text-[20px] mt-10'} >Course Content</Text>
                        <List.Section title="Accordions">
                            <List.Accordion
                                title="Section 1"
                                className={'bg-gray-300 rounded-md mb-4'}>
                                <List.Item title="Introduction to Android" className={'ml-10'} left={(props)=><List.Icon {...props} icon={'play'} />} />
                                <List.Item title="Kotlin Vs Java" className={'ml-10'} left={(props)=><List.Icon {...props} icon={'lock'} />} />
                            </List.Accordion>

                            <List.Accordion
                                title="Section 2"
                                className={'bg-gray-300 rounded-md mb-4'}>
                                <List.Item title="Introduction to Android" className={'ml-10'} left={(props)=><List.Icon {...props} icon={'play'} />} />
                                <List.Item title="Kotlin Vs Java" className={'ml-10'} left={(props)=><List.Icon {...props} icon={'lock'} />} />
                            </List.Accordion>

                            <List.Accordion
                                title="Section 3"
                                className={'bg-gray-300 rounded-md mb-4'}>
                                <List.Item title="Introduction to Android" className={'ml-10'} left={(props)=><List.Icon {...props} icon={'play'} />} />
                                <List.Item title="Kotlin Vs Java" className={'ml-10'} left={(props)=><List.Icon {...props} icon={'lock'} />} />
                            </List.Accordion>
                        </List.Section>
                        <View>
                            <Text className={'font-bold text-[20px] mt-10'} >Course Description</Text>
                            <Text>Lorem ipsum dolor sit amet. Eum laboriosam nisi qui consequatur sunt qui repellendus
                                reiciendis ut delectus cupiditate rem nostrum inventore. Et dolor consectetur qui galisum
                                voluptatem aut fugiat sequi? Quo rerum asperiores et consequatur eaque et dolore porro qui
                                adipisci nobis ut dolores nemo et blanditiis omnis aut debitis consectetur.</Text>
                        </View>

                        <View>
                            <Text className={'font-bold text-[20px] mt-10'} >Course Reviews</Text>
                            <View className={'bg-gray-200 p-3 rounded-md mb-3'} >
                                <View>
                                    <Text className={'font-bold text-[17px]'} >Samuel Jay</Text>
                                    <Text className={'text-[14px]'} >2/12/2024</Text>
                                    <View className={'flex-row items-center gap-1 mt-1'} >
                                        <AntDesign name={'star'} color={'#dba100'} size={15}/>
                                        <AntDesign name={'star'} color={'#dba100'} size={15}/>
                                        <AntDesign name={'star'} color={'#dba100'} size={15}/>
                                        <AntDesign name={'star'} color={'#dba100'} size={15}/>
                                    </View>
                                    <Text className={'mt-3'} >
                                        Lorem ipsum dolor sit amet. Eum laboriosam nisi qui consequatur sunt qui repellendus
                                        reiciendis ut delectus cupiditate rem nostrum inventore.
                                    </Text>
                                </View>
                            </View>

                            <View className={'bg-gray-200 p-3 rounded-md mb-3'} >
                                <View>
                                    <Text className={'font-bold text-[17px]'} >Samuel Jay</Text>
                                    <Text className={'text-[14px]'} >2/12/2024</Text>
                                    <View className={'flex-row items-center gap-1 mt-1'} >
                                        <AntDesign name={'star'} color={'#dba100'} size={15}/>
                                        <AntDesign name={'star'} color={'#dba100'} size={15}/>
                                        <AntDesign name={'star'} color={'#dba100'} size={15}/>
                                        <AntDesign name={'star'} color={'#dba100'} size={15}/>
                                    </View>
                                    <Text className={'mt-3'} >
                                        Lorem ipsum dolor sit amet. Eum laboriosam nisi qui consequatur sunt qui repellendus
                                        reiciendis ut delectus cupiditate rem nostrum inventore.
                                    </Text>
                                </View>
                            </View>

                            <View className={'bg-gray-200 p-3 rounded-md mb-3'} >
                                <View>
                                    <Text className={'font-bold text-[17px]'} >Samuel Jay</Text>
                                    <Text className={'text-[14px]'} >2/12/2024</Text>
                                    <View className={'flex-row items-center gap-1 mt-1'} >
                                        <AntDesign name={'star'} color={'#dba100'} size={15}/>
                                        <AntDesign name={'star'} color={'#dba100'} size={15}/>
                                        <AntDesign name={'star'} color={'#dba100'} size={15}/>
                                        <AntDesign name={'star'} color={'#dba100'} size={15}/>
                                    </View>
                                    <Text className={'mt-3'} >
                                        Lorem ipsum dolor sit amet. Eum laboriosam nisi qui consequatur sunt qui repellendus
                                        reiciendis ut delectus cupiditate rem nostrum inventore.
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>


        </View>
    )
}

export default CourseDetail
