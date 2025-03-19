import {Image, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import {Login3dImage} from "../components/Image";
import {useNavigation} from "@react-navigation/native";

const Login = ()=>{
    const navigation = useNavigation();
    return (
        <ScrollView showsVerticalScrollIndicator={false} vertical className={'mx-3 flex-1'}>
            <Image source={Login3dImage} className={'h-[300px] w-full'} />
            <Text className={'text-[35px] font-extrabold mt-5'} >Login</Text>
            <Text className={'text-[15px] mb-5'} >Welcome back, login to continue</Text>

            <View className={'mt-3'} >
                <TextInput placeholder={'Email'} keyboardType={'default'}
                           className={'bg-[#e9e9e9a7] border-[e8e8e8d2] rounded-md mb-2 p-2'}/>
                <TextInput placeholder={'Password'} keyboardType={'default'}
                           secureTextEntry={true}
                           className={'bg-[#e9e9e9a7] border-[e8e8e8d2] rounded-md mb-2 p-2'}/>
                <TouchableOpacity className={'bg-[#280e49] flex-row justify-center p-2 rounded-md mt-2'} >
                    <Text className={'text-white'} >Login</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>navigation.navigate('Register')} className={'mt-2'} >
                    <Text className={'text-[#280e49] text-center mt-4'} >Don't have an account yet? Register</Text>
                </TouchableOpacity>

            </View>
        </ScrollView>
    )
}

export default Login;

