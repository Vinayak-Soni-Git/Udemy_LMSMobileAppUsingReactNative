import { useEffect, useState } from "react";
import { View, ScrollView, Image, Text, TextInput, Button, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import BottomScreenNavigation from "../components/BottomScreenNavigation";
import StudentScreenHeader from "../components/StudentScreenHeader";
import apiInstance from "../../src/utils/Axios";
import useUserData from "../../src/plugins/UseUserData";
import * as ImagePicker from "expo-image-picker";

const Settings = () => {
    const [profileData, setProfileData] = useState({ image: null, email: "", full_name: "", about: "", country: "" });
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const user_id = useUserData();

    const fetchProfile = async () => {
        setLoading(true);
        const response = await apiInstance.get(`user/profile/${user_id}`);
        setProfileData({
            image: response?.data?.image,
            email: response?.data?.user?.email,
            full_name: response?.data?.full_name,
            about: response?.data?.about,
            country: response?.data?.country,
        });
        setLoading(false);
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleProfileDataChange = (name, value) => {
        setProfileData({
            ...profileData,
            [name]: value,
        });
    };

    const handleFormSubmit = async () => {
        const formData = new FormData();
        formData.append("full_name", profileData?.full_name);
        formData.append("about", profileData?.about);
        formData.append("country", profileData?.country);

        if (image) {
            const uriParts = image.split(".");
            const fileType = uriParts[uriParts.length - 1];
            formData.append("image", {
                uri: image,
                name: `photo.${fileType}`,
                type: `image/${fileType}`,
            });
        }

        try {
            await apiInstance.patch(`user/profile/${user_id}/`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            alert("Profile Updated Successfully");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <ScrollView showsVerticalScrollIndicator={true} vertical className="px-2 bg-white mx-3 flex-1">
                <StudentScreenHeader title={"Settings"} returnScreen={"Home"} />
                <Text className="text-[25px] font-semibold">Settings</Text>
                <Text className="text-[15px] font-normal mb-5">Update Your Account From Here</Text>
                {loading === true ? (
                    <>
                        <ActivityIndicator size={"large"} color={"#280e49"} />
                    </>
                ) : (
                    <>
                        <View className="mt-3">
                            <View className="bg-[#e9e9e9a7] border-[1px] border-[#e8e8e8d2] rounded-[10px] mb-2 p-2">
                                <Button title="Avatar" onPress={pickImage} />
                                {image ? <Image source={{ uri: image }} style={styles.image} /> : <Image source={{ uri: profileData?.image }} style={styles.image} />}
                            </View>
                            <TextInput defaultValue={profileData?.full_name} onChangeText={(value) => handleProfileDataChange("full_name", value)} placeholder="Full Name" keyboardType="default" className="bg-[#e9e9e9a7] border-[1px] border-[#e8e8e8d2] rounded-[10px] mb-2 p-2" />
                            <TextInput defaultValue={profileData?.email} onChangeText={(value) => handleProfileDataChange("email", value)} readOnly placeholder="Email Address" keyboardType="default" className="bg-[#e9e9e9a7] border-[1px] border-[#e8e8e8d2] rounded-[10px] mb-2 p-2" />
                            <TextInput defaultValue={profileData?.about} onChangeText={(value) => handleProfileDataChange("about", value)} placeholder="About" keyboardType="default" className="bg-[#e9e9e9a7] border-[1px] border-[#e8e8e8d2] rounded-[10px] mb-2 p-2" />
                            <TextInput defaultValue={profileData?.country} onChangeText={(value) => handleProfileDataChange("country", value)} placeholder="Country" keyboardType="default" className="bg-[#e9e9e9a7] border-[1px] border-[#e8e8e8d2] rounded-[10px] mb-2 p-2" />

                            <TouchableOpacity onPress={handleFormSubmit} className="bg-[#280e49]  flex-row justify-center p-2 rounded-md mt-2">
                                <Text className="text-white">Save Changes</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </ScrollView>

            <BottomScreenNavigation />
        </>
    );
};

const styles = StyleSheet.create({
    image: {
        width: 300,
        height: 100,
    },
});

export default Settings;
