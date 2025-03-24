import {Image, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import {Login3dImage} from "../components/Image";
import {useNavigation} from "@react-navigation/native";
import {useState} from "react";
import apiInstance from "../../src/utils/Axios";
import {login} from '../../src/utils/Auth';
import {useDispatch} from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Register = ()=>{
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [bioData, setBioData] = useState({full_name:'', email:'', password:'', password2:''});
    const [loading, setLoading] = useState(false);

    const handleBioData = (name, value)=>{
        setBioData({
            ...bioData,
            [name]:value,
        })
    }

    const generateCartId = async ()=>{
        const generateRandomString = async ()=>{
            const length = 30
            const characters = 'abcdefghijklmnopqrstuvwxyz1234567890'
            let randomString = ''
            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length)
                randomString += characters.charAt(randomIndex)
            }
            await AsyncStorage.setItem('randomString', randomString)
        }
        const existingRandomString = await AsyncStorage.getItem('randomString')
        console.log('existingRandomString=====', existingRandomString)
        if(!existingRandomString){
            await generateRandomString()
        }
    }

    const handleRegister = async ()=>{
        setLoading(true)
        try{
            const userData = {full_name:bioData.full_name, email:bioData.email, password:bioData.password, password2:bioData.password2}
            const response = await apiInstance.post('user/register/', userData)
            console.log(response)
            // navigation.navigate('Login')

            if(response.status === 201){
                const {error} = await login(dispatch, bioData.email, bioData.password)
                if(error){
                    console.log('login error', error)
                }else{
                    console.log('Login success')
                    navigation.navigate('Home')
                    await generateCartId()
                }
            }
        }catch(error){
            console.log(error)

            if(error.response.data.email){
                alert(error.response.data.email)
            }
            if(error.response.data.password){
                alert(error.response.data.password)
            }
        }
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} vertical className={'mx-3 flex-1'}>
            <Image source={Login3dImage} className={'h-[300px] w-full'} />
            <Text className={'text-[35px] font-extrabold mt-5'} >Register</Text>
            <Text className={'text-[15px] mb-5'} >Create an account and start learning</Text>

            <View className={'mt-3'} >
                <TextInput placeholder={'Full Name'}
                           keyboardType={'default'}
                           onChangeText={(text)=>handleBioData('full_name', text)}
                           className={'bg-[#e9e9e9a7] border-[e8e8e8d2] rounded-md mb-2 p-2'}/>

                <TextInput placeholder={'Email'}
                           keyboardType={'default'}
                           onChangeText={(text)=>handleBioData('email', text)}
                           className={'bg-[#e9e9e9a7] border-[e8e8e8d2] rounded-md mb-2 p-2'}/>

                <TextInput placeholder={'Password'}
                           keyboardType={'default'}
                           secureTextEntry={true}
                           onChangeText={(text)=>handleBioData('password', text)}
                           className={'bg-[#e9e9e9a7] border-[e8e8e8d2] rounded-md mb-2 p-2'}/>

                <TextInput placeholder={'Confirm Password'}
                           keyboardType={'default'}
                           secureTextEntry={true}
                           onChangeText={(text)=>handleBioData('password2', text)}
                           className={'bg-[#e9e9e9a7] border-[e8e8e8d2] rounded-md mb-2 p-2'}/>
                {loading === true ? (
                    <>
                        <TouchableOpacity disabled={true} onPress={handleRegister} className={'bg-[#280e4991] flex-row justify-center p-2 rounded-md mt-2'} >
                            <Text className={'text-white'} >Processing</Text>
                        </TouchableOpacity>
                    </>
                ):(
                <>
                    <TouchableOpacity onPress={handleRegister} className={'bg-[#280e49] flex-row justify-center p-2 rounded-md mt-2'} >
                        <Text className={'text-white'} >Register</Text>
                    </TouchableOpacity>
                </>)}

                <TouchableOpacity onPress={()=>navigation.navigate('Login')} className={'mt-2'} >
                    <Text className={'text-[#280e49] text-center mt-4'} >Already have an account? Login</Text>
                </TouchableOpacity>

            </View>
        </ScrollView>
    )
}

export default Register;
