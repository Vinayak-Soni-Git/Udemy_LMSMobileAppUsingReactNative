import { useEffect, useRef, useState } from "react";
import { View, Text, Image, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Platform, RefreshControl, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import RBSheet from "react-native-raw-bottom-sheet";
import BottomScreenNavigation from "../components/BottomScreenNavigation";
import StudentScreenHeader from "../components/StudentScreenHeader";
import apiInstance from "../../src/utils/Axios";
import moment from "moment";

const Message = ({ route }) => {
    const { user_id, enrollment_id } = route.params;
    const refRBSheet = useRef();
    const navigation = useNavigation();

    const [course, setCourse] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [createMessage, setCreateMessage] = useState({ title: "", message: "" });
    const [loading, setLoading] = useState(true);
    const [rbSheetType, setRBSheetType] = useState("");
    const [refreshing, setRefreshing] = useState(false);

    const fetchMessage = async () => {
        setLoading(true);
        try {
            const res = await apiInstance.get(`student/course-detail/${user_id}/${enrollment_id}/`);
            setCourse(res?.data);
            setQuestions(res?.data?.question_answer);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchMessage();
    }, []);

    const openRBSheet = (messages) => {
        setRBSheetType("messages");
        refRBSheet.current.open();
        setSelectedConversation(messages);
        console.log(selectedConversation);
    };

    const openRBSheetCreateMessage = () => {
        setRBSheetType("create_message");
        refRBSheet.current.open();
    };

    const handleCreateMessage = (name, value) => {
        setCreateMessage({
            ...createMessage,
            [name]: value,
        });
    };

    const resetMessageFields = () => {
        setCreateMessage({
            title: "",
            message: "",
        });
    };

    const sendNewMessage = async () => {
        const json = {
            course_id: course?.course?.id,
            user_id: user_id,
            qa_id: selectedConversation?.qa_id,
            message: createMessage?.message,
        };

        try {
            const response = await apiInstance.post(`student/question-answer-message-create/`, json);
            console.log(response.data);
            setSelectedConversation(response.data.question);
            resetMessageFields();
            fetchMessage();
        } catch (error) {
            console.log();
        }
    };

    const createNewMessage = async () => {
        const json = {
            course_id: course?.course?.id,
            user_id: user_id,
            title: createMessage?.title,
            message: createMessage?.message,
        };

        try {
            const response = await apiInstance.post(`student/question-answer-create/`, json);
            console.log(response.data);
            setSelectedConversation(response.data.question);
            resetMessageFields();
            fetchMessage();
            refRBSheet.current.close();
        } catch (error) {
            console.log();
        }
    };

    const onReFresh = () => {
        fetchMessage();
    };

    return (
        <View className="bg-white flex-1 px-3">
            <ScrollView refreshControl={<RefreshControl onRefresh={onReFresh} refreshing={refreshing} />} vertical showsVerticalScrollIndicator={false} className="flex-1">
                <StudentScreenHeader title={"Course Messages"} returnScreen={" "} />
                {loading ? (
                    <>
                        <ActivityIndicator size={"large"} color={"#280e49"} />
                    </>
                ) : (
                    <>
                        <ScrollView showsVerticalScrollIndicator={false} className="mt-5">
                            <Text className="text-[20px] font-semibold text-center">{course?.course?.title}</Text>

                            <View className="flex-row justify-center items-center gap-3 mt-4">
                                <TouchableOpacity onPress={() => navigation.navigate("StudentCourseDetail", { user_id: user_id, enrollment_id: enrollment_id })} className="bg-[#280e49] w-100 p-2 rounded-md">
                                    <Text className="text-white">
                                        {" "}
                                        <FontAwesome5 name="arrow-left" size={15} /> Course
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate("Note", { user_id: user_id, enrollment_id: enrollment_id })} className="bg-[#280e49] w-100 p-2 rounded-md">
                                    <Text className="text-white">Notes</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate("Reviews", { user_id: user_id, enrollment_id: enrollment_id })} className="bg-[#280e49] w-100 p-2 rounded-md">
                                    <Text className="text-white">Reviews</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={openRBSheetCreateMessage} className="bg-[#280e49] w-100 p-2 rounded-md">
                                    <Text className="text-white">+ New Message</Text>
                                </TouchableOpacity>
                            </View>

                            <Text className="font-bold text-[20px] mt-10 text-center mb-5">All Messages</Text>

                            {questions?.map((q, index) => (
                                <TouchableOpacity key={index} onPress={() => openRBSheet(q)} className="bg-gray-200 p-3 rounded-md mb-4">
                                    <Text className="text-lg font-semibold">{q?.title}</Text>
                                    <Text>By: {q?.user?.username}</Text>
                                    <Text>Date: {moment(q?.date).format("DD MMM, YYYY")}</Text>
                                    <Text>Answers: {q?.messages?.length}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </>
                )}
            </ScrollView>

            {/* Bottom Nav */}
            <BottomScreenNavigation />

            <View>
                <RBSheet
                    ref={refRBSheet}
                    closeOnDragDown={true}
                    closeOnPressMask={true}
                    dragFromTopOnly={true}
                    height={600}
                    customStyles={{
                        wrapper: {
                            backgroundColor: "#00000077",
                        },
                        draggableIcon: {
                            backgroundColor: "#020e40",
                        },
                    }}
                >
                    {rbSheetType === "messages" ? (
                        <>
                            <KeyboardAvoidingView
                                behavior={Platform.OS === "ios" ? "padding" : "height"}
                                style={{ flex: 1 }}
                                keyboardVerticalOffset={25} // Adjust based on header height if any
                            >
                                <View style={{ flex: 1 }}>
                                    <ScrollView vertical showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1 }}>
                                        <View className="chat-messages p-4">
                                            {selectedConversation?.messages?.map((s, index) => (
                                                <View key={index} className="bg-gray-200 p-3 rounded-md mb-4">
                                                    <Text className="text-lg font-normal mb-4">{s?.message}</Text>
                                                    <Text className="text-gray-400">By: {s?.user?.username}</Text>
                                                    <Text className="text-gray-400">Date: {moment(s?.date).format("DD MMM, YYYY")}</Text>
                                                </View>
                                            ))}
                                        </View>
                                    </ScrollView>
                                    <View className="chat-input flex-row items-center justify-between p-4 border-t">
                                        <TextInput value={createMessage?.message} onChangeText={(value) => handleCreateMessage("message", value)} type="text" className="chat-input-field flex-1 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="Type your message..." />
                                        <TouchableOpacity onPress={sendNewMessage} className="chat-send-button bg-blue-500 text-white px-4 py-2 ml-2 rounded-md hover:bg-blue-700">
                                            <Text>Send</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </KeyboardAvoidingView>
                        </>
                    ) : (
                        <>
                            <Text className="text-center font-semibold text-[17px]">Create New Message</Text>

                            <View className="chat-input p-4 mt-3">
                                <TextInput onChangeText={(value) => handleCreateMessage("title", value)} value={createMessage.title} multiline type="text" className="font-semibold chat-input-field flex-1 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="Question Title" />
                                <TextInput onChangeText={(value) => handleCreateMessage("message", value)} value={createMessage.message} multiline type="text" className="font-normal mb-3 chat-input-field flex-1 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="Question Content" />
                                <TouchableOpacity onPress={createNewMessage} className="w-32 bg-blue-500 px-4 py-2 ml-2 rounded-md hover:bg-blue-700">
                                    <Text className="text-white font-semibold">Create Message</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    )}
                </RBSheet>
            </View>
        </View>
    );
};

export default Message;
