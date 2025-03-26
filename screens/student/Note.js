import { useEffect, useRef, useState } from "react";
import { View, Text, Image, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Platform, RefreshControl, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import RBSheet from "react-native-raw-bottom-sheet";
import BottomScreenNavigation from "../components/BottomScreenNavigation";
import StudentScreenHeader from "../components/StudentScreenHeader";
import apiInstance from "../../src/utils/Axios";
import moment from "moment";

const Note = ({ route }) => {
    const { user_id, enrollment_id } = route.params;
    const refRBSheet = useRef();
    const navigation = useNavigation();

    const [course, setCourse] = useState([]);
    const [notes, setNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState(null);
    const [createNote, setCreateNote] = useState({ title: "", note: "" });
    const [rbSheetType, setRBSheetType] = useState("");
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchNote = async () => {
        setLoading(true);
        try {
            const res = await apiInstance.get(`student/course-detail/${user_id}/${enrollment_id}/`);
            setCourse(res?.data);
            setNotes(res?.data?.note);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchNote();
    }, []);

    const handleCreateNote = (name, value) => {
        setCreateNote({
            ...createNote,
            [name]: value,
        });
    };

    const openRBSheet = (type, note) => {
        setRBSheetType(type);
        setSelectedNote(note);
        refRBSheet.current.open();
        console.log(selectedNote);

        setCreateNote({
            title: selectedNote?.title,
            note: selectedNote?.note,
        });
    };

    const handleEditNote = async (noteId) => {
        console.log(createNote?.title);
        console.log(createNote?.note);
        try {
            const json = {
                title: createNote?.title,
                note: createNote?.note,
                user_id: parseInt(user_id),
                enrollment_id: enrollment_id,
            };

            const response = await apiInstance.patch(`student/course-note-detail/${user_id}/${enrollment_id}/${parseInt(noteId)}/`, json);
            fetchNote();
        } catch (error) {
            console.log(error);
        }
    };

    const handleCreateNewNote = async (noteId) => {
        console.log(createNote?.title);
        console.log(createNote?.note);
        try {
            const json = {
                title: createNote?.title,
                note: createNote?.note,
                user_id: parseInt(user_id),
                enrollment_id: enrollment_id,
            };

            const response = await apiInstance.post(`student/course-note/${user_id}/${enrollment_id}/`, json);
            fetchNote();
            closeRBSheet();
        } catch (error) {
            console.log(error);
        }
    };

    const closeRBSheet = () => {
        refRBSheet.current.close();
        setCreateNote({
            title: "",
            note: "",
        });
        return true;
    };

    const onReFresh = () => {
        fetchNote();
    };

    return (
        <View className="bg-white flex-1 px-3">
            <ScrollView refreshControl={<RefreshControl onRefresh={onReFresh} refreshing={refreshing} />} vertical showsVerticalScrollIndicator={false} className="flex-1">
                <StudentScreenHeader title={"Course Notes"} returnScreen={" "} />
                {loading ? (
                    <>
                        <ActivityIndicator size={"large"} color={"#280e49"} />
                    </>
                ) : (
                    <>
                        <ScrollView showsVerticalScrollIndicator={false} className="mt-5">
                            <Text className="text-[20px] font-semibold text-center">Python Programming</Text>

                            <View className="flex-row justify-center items-center gap-3 mt-4">
                                <TouchableOpacity onPress={() => navigation.navigate("CourseDetail", { user_id: user_id, enrollment_id: enrollment_id })} className="bg-[#280e49] w-100 p-2 rounded-md">
                                    <Text className="text-white">
                                        {" "}
                                        <FontAwesome5 name="arrow-left" size={15} /> Course
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate("Message", { user_id: user_id, enrollment_id: enrollment_id })} className="bg-[#280e49] w-100 p-2 rounded-md">
                                    <Text className="text-white">Message</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate("Reviews", { user_id: user_id, enrollment_id: enrollment_id })} className="bg-[#280e49] w-100 p-2 rounded-md">
                                    <Text className="text-white">Reviews</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => openRBSheet("note-create", "")} className="bg-[#280e49] w-100 p-2 rounded-md">
                                    <Text className="text-white">+ New Note</Text>
                                </TouchableOpacity>
                            </View>

                            <Text className="font-bold text-[20px] mt-10 text-center mb-5">My Notes</Text>
                            {notes?.map((n, index) => (
                                <View key={index} className="bg-gray-200 p-3 rounded-md mb-4">
                                    <Text className="text-lg font-semibold">{n?.title}</Text>
                                    <Text className="mt-3 mb-3">Date: {moment(n?.date).format("DD MMM, YYYY")}</Text>
                                    <View className="flex flex-row gap-2">
                                        <TouchableOpacity onPress={() => openRBSheet("note-detail", n)} className="bg-[#280e49] w-7 h-7 rounded-md flex justify-center items-center">
                                            <FontAwesome5 color={"#fff"} size={10} name="edit" />
                                        </TouchableOpacity>

                                        <TouchableOpacity className="bg-[#280e49] w-7 h-7 rounded-md flex justify-center items-center">
                                            <FontAwesome5 color={"#fff"} size={10} name="trash" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
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
                    closeOnDragDown={closeRBSheet}
                    closeOnPressMask={closeRBSheet}
                    height={400}
                    customStyles={{
                        wrapper: {
                            backgroundColor: "#00000077",
                        },
                        draggableIcon: {
                            backgroundColor: "#020e40",
                        },
                    }}
                >
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        style={{ flex: 1 }}
                        keyboardVerticalOffset={25} // Adjust based on header height if any
                    >
                        <View style={{ flex: 1 }}>
                            {rbSheetType === "note-detail" ? (
                                <>
                                    <Text className="text-center font-semibold text-[17px]">Update Note</Text>

                                    <View className="chat-input p-4 mt-3">
                                        <TextInput onChangeText={(value) => handleCreateNote("title", value)} defaultValue={selectedNote?.title} multiline type="text" className="font-semibold chat-input-field flex-1 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="Subject" />
                                        <TextInput onChangeText={(value) => handleCreateNote("note", value)} defaultValue={selectedNote?.note} multiline type="text" className="font-normal mb-3 chat-input-field flex-1 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="Note Content" />
                                        <TouchableOpacity onPress={() => handleEditNote(selectedNote?.id)} className="w-16 bg-blue-500 px-4 py-2 ml-2 rounded-md hover:bg-blue-700">
                                            <Text className="text-white font-semibold">Save</Text>
                                        </TouchableOpacity>
                                    </View>
                                </>
                            ) : (
                                <>
                                    <Text className="text-center font-semibold text-[17px]">Create Note</Text>

                                    <View className="chat-input p-4 mt-3">
                                        <TextInput onChangeText={(value) => handleCreateNote("title", value)} value={createNote?.title} multiline type="text" className="font-semibold chat-input-field flex-1 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="Subject" />
                                        <TextInput onChangeText={(value) => handleCreateNote("note", value)} value={createNote?.note} multiline type="text" className="font-normal mb-3 chat-input-field flex-1 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="Note Content" />
                                        <TouchableOpacity onPress={() => handleCreateNewNote()} className="w-16 bg-blue-500 px-4 py-2 ml-2 rounded-md hover:bg-blue-700">
                                            <Text className="text-white font-semibold">Save</Text>
                                        </TouchableOpacity>
                                    </View>
                                </>
                            )}
                        </View>
                    </KeyboardAvoidingView>
                </RBSheet>
            </View>
        </View>
    );
};

export default Note;
