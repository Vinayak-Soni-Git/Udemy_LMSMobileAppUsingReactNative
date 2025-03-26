import { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView, ActivityIndicator, KeyboardAvoidingView, Platform, RefreshControl } from "react-native";
import { useNavigation } from "@react-navigation/native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import RBSheet from "react-native-raw-bottom-sheet";
import BottomScreenNavigation from "../components/BottomScreenNavigation";
import StudentScreenHeader from "../components/StudentScreenHeader";
import apiInstance from "../../src/utils/Axios";
import AntDesign from "react-native-vector-icons/AntDesign";
import { SelectList } from "react-native-dropdown-select-list";
import moment from "moment";

const Reviews = ({ route }) => {
    const { user_id, enrollment_id } = route.params;
    const refRBSheet = useRef();
    const navigation = useNavigation();

    const [course, setCourse] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [selectedRating, setSelectedRating] = useState("");
    const [reviewValue, setReviewValue] = useState("");
    const [studentReview, setStudentReview] = useState([]);
    const [reviews, setReviews] = useState([]);

    const fetchReview = async () => {
        setLoading(true);

        try {
            const response = await apiInstance.get(`student/course-detail/${user_id}/${enrollment_id}/`);
            setStudentReview(response?.data?.review);
            setCourse(response.data);
            console.log(response.data)
            setLoading(false);

            if (course) {
                const review_response = await apiInstance.get(`student/review/list/${course?.course?.id}/`);
                setReviews(review_response?.data);
                console.log(review_response?.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchReview();
    }, []);

    const openRBSheet = () => {
        refRBSheet.current.open();
    };

    const closeRBSheet = () => {
        refRBSheet.current.close();
    };

    const onReFresh = () => {
        fetchReview();
    };

    const data = [
        { key: "1", value: "★" },
        { key: "2", value: "★★" },
        { key: "3", value: "★★★" },
        { key: "4", value: "★★★★" },
        { key: "5", value: "★★★★★" },
    ];

    let default_data = {key: 0, value: "★"};
    if (studentReview?.rating === 1) {
        default_data = { key: 1, value: "★★" };
    } else if (studentReview?.rating === 2) {
        default_data = { key: 2, value: "★★" };
    } else if (studentReview?.rating === 3) {
        default_data = { key: 3, value: "★★★" };
    } else if (studentReview?.rating === 4) {
        default_data = { key: 4, value: "★★★★" };
    } else if (studentReview?.rating === 5) {
        default_data = { key: 5, value: "★★★★★" };
    }

    const handleUpdateReviewSubmit = async () => {
        try {
            if (studentReview?.rating) {
                const json = {
                    user: user_id,
                    course: course?.course?.id,
                    rating: selectedRating || studentReview?.rating,
                    review: reviewValue || studentReview?.review,
                };

                await apiInstance.patch(`student/review-detail/${user_id}/${studentReview?.id}/`, json);
                alert("Review Updated");
                fetchReview();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View className="bg-white flex-1 px-3">
            <ScrollView refreshControl={<RefreshControl onRefresh={onReFresh} refreshing={refreshing} />} vertical showsVerticalScrollIndicator={false} className="flex-1">
                <StudentScreenHeader title={"Course Reviews"} returnScreen={" "} />
                {loading ? (
                    <>
                        <ActivityIndicator size={"large"} color={"#280e49"} />
                    </>
                ) : (
                    <>
                        <ScrollView showsVerticalScrollIndicator={false} className="mt-5">
                            <Text className="text-[20px] font-semibold text-center">Python Programming</Text>

                            <View className="flex-row justify-center items-center gap-3 mt-4">
                                <TouchableOpacity onPress={() => navigation.navigate("Course", { user_id: null, enrollment_id: null })} className="bg-[#280e49] w-100 p-2 rounded-md">
                                    <Text className="text-white">
                                        <FontAwesome5 name="arrow-left" size={15} /> Course
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate("Message", { user_id: null, enrollment_id: null })} className="bg-[#280e49] w-100 p-2 rounded-md">
                                    <Text className="text-white">Message</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate("Note", { user_id: null, enrollment_id: null })} className="bg-[#280e49] w-100 p-2 rounded-md">
                                    <Text className="text-white">Note</Text>
                                </TouchableOpacity>
                            </View>

                            <Text className="font-bold text-[20px] mt-10 text-center mb-5">My Review</Text>

                            <View className="bg-gray-200 p-3 rounded-md mb-4">
                                <Text className="text-lg font-semibold">{studentReview?.review}</Text>
                                <View>
                                    <Text>
                                        {studentReview?.rating === 1 ? (
                                            <>
                                                <AntDesign color={"#e1bc04"} name="star" />
                                            </>
                                        ) : studentReview?.rating === 2 ? (
                                            <>
                                                <AntDesign color={"#e1bc04"} name="star" />
                                                <AntDesign color={"#e1bc04"} name="star" />
                                            </>
                                        ) : studentReview?.rating === 3 ? (
                                            <>
                                                <AntDesign color={"#e1bc04"} name="star" />
                                                <AntDesign color={"#e1bc04"} name="star" />
                                                <AntDesign color={"#e1bc04"} name="star" />
                                            </>
                                        ) : studentReview?.rating === 4 ? (
                                            <>
                                                <AntDesign color={"#e1bc04"} name="star" />
                                                <AntDesign color={"#e1bc04"} name="star" />
                                                <AntDesign color={"#e1bc04"} name="star" />
                                                <AntDesign color={"#e1bc04"} name="star" />
                                            </>
                                        ) : studentReview?.rating === 5 ? (
                                            <>
                                                <AntDesign color={"#e1bc04"} name="star" />
                                                <AntDesign color={"#e1bc04"} name="star" />
                                                <AntDesign color={"#e1bc04"} name="star" />
                                                <AntDesign color={"#e1bc04"} name="star" />
                                                <AntDesign color={"#e1bc04"} name="star" />
                                            </>
                                        ) : (
                                            <Text>Rating Not Added</Text>
                                        )}
                                    </Text>
                                </View>
                                <Text className="mt-7 mb-1">By: {studentReview?.user?.username}</Text>
                                <Text className="">Date: {moment(studentReview?.date).format("DD MMM, YYYY")}</Text>
                                <View className="flex flex-row gap-2 mt-3">
                                    <TouchableOpacity onPress={openRBSheet} className="bg-[#280e49] w-7 h-7 rounded-md flex justify-center items-center">
                                        <FontAwesome5 color={"#fff"} size={10} name="edit" />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <Text className="font-bold text-[20px] mt-7 text-center mb-5">All Course Review</Text>

                            {reviews?.map((r, index) => (
                                <View className="bg-gray-200 p-3 rounded-md mb-4" key={index}>
                                    <Text className="text-lg font-semibold">{r?.review}</Text>
                                    <View>
                                        <Text>
                                            {r?.rating === 1 ? (
                                                <>
                                                    <AntDesign color={"#e1bc04"} name="star" />
                                                </>
                                            ) : r?.rating === 2 ? (
                                                <>
                                                    <AntDesign color={"#e1bc04"} name="star" />
                                                    <AntDesign color={"#e1bc04"} name="star" />
                                                </>
                                            ) : r?.rating === 3 ? (
                                                <>
                                                    <AntDesign color={"#e1bc04"} name="star" />
                                                    <AntDesign color={"#e1bc04"} name="star" />
                                                    <AntDesign color={"#e1bc04"} name="star" />
                                                </>
                                            ) : r?.rating === 4 ? (
                                                <>
                                                    <AntDesign color={"#e1bc04"} name="star" />
                                                    <AntDesign color={"#e1bc04"} name="star" />
                                                    <AntDesign color={"#e1bc04"} name="star" />
                                                    <AntDesign color={"#e1bc04"} name="star" />
                                                </>
                                            ) : r?.rating === 5 ? (
                                                <>
                                                    <AntDesign color={"#e1bc04"} name="star" />
                                                    <AntDesign color={"#e1bc04"} name="star" />
                                                    <AntDesign color={"#e1bc04"} name="star" />
                                                    <AntDesign color={"#e1bc04"} name="star" />
                                                    <AntDesign color={"#e1bc04"} name="star" />
                                                </>
                                            ) : (
                                                <Text>Rating Not Added</Text>
                                            )}
                                        </Text>
                                    </View>
                                    <Text className="mt-7 mb-1">By: {r?.user?.username}</Text>
                                    <Text className="">Date: {moment(r?.date).format("DD MMM, YYYY")}</Text>
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
                    closeOnDragDown={true}
                    closeOnPressMask={true}
                    dragFromTopOnly={true}
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
                            <View className="chat-input p-4 mt-3">
                                <SelectList defaultOption={default_data} setSelected={(val) => setSelectedRating(val)} data={data} save="key" placeholder="Select Rating" search={false} boxStyles={{ backgroundColor: "white" }} />

                                <TextInput onChangeText={(value) => setReviewValue(value)} defaultValue={studentReview?.review || "No Review"} multiline type="text" className="font-normal mb-3 chat-input-field flex-1 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="Note Content" />
                                <TouchableOpacity onPress={handleUpdateReviewSubmit} className="w-16 bg-blue-500 px-4 py-2 ml-2 rounded-md hover:bg-blue-700">
                                    <Text className="text-white font-semibold">Save</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </RBSheet>
            </View>
        </View>
    );
};

export default Reviews;
