import {Image, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import {Login3dImage} from "../components/Image";
import {useNavigation} from "@react-navigation/native";
import {useState} from "react";
import apiInstance from "../../src/utils/Axios";
import {login} from '../../src/utils/Auth';
import {useDispatch} from "react-redux";
import CardId from '../../src/plugins/CardId'
import cardId from "../../src/plugins/CardId";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Login = ()=>{
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [bioData, setBioData] = useState({email:'vinayakstudent@gmail.com', password:'student1234'});
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

    const handleLogin = async ()=>{
        setLoading(true)

        try{
            const {error} = await login(dispatch, bioData.email, bioData.password)
            if(error){
                alert(error)
                console.log(error)
                setLoading(false)
            }else{
                console.log('Login success')
                setLoading(false)
                await cardId()
                await generateCartId()
                navigation.navigate('Home')
            }
        } catch(error){
            console.log(error)
            setLoading(false)
        }
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} vertical className={'mx-3 flex-1'}>
            <Image source={Login3dImage} className={'h-[300px] w-full'} />
            <Text className={'text-[35px] font-extrabold mt-5'} >Login</Text>
            <Text className={'text-[15px] mb-5'} >Welcome back, login to continue</Text>

            <View className={'mt-3'} >
                <TextInput placeholder={'Email'}
                           keyboardType={'default'}
                           onChangeText={(text)=> handleBioData('email', text)}
                           value={bioData.email}
                           className={'bg-[#e9e9e9a7] border-[e8e8e8d2] rounded-md mb-2 p-2'}/>

                <TextInput placeholder={'Password'}
                           keyboardType={'default'}
                           secureTextEntry={true}
                           onChangeText={(text)=> handleBioData('password', text)}
                           value={bioData.password}
                           className={'bg-[#e9e9e9a7] border-[e8e8e8d2] rounded-md mb-2 p-2'}/>

                {loading === true ? (
                    <>
                        <TouchableOpacity disabled={true} className={'bg-[#280e4991] flex-row justify-center p-2 rounded-md mt-2'} >
                            <Text className={'text-white'} >Processing</Text>
                        </TouchableOpacity>
                    </>
                ):(
                    <>
                        <TouchableOpacity onPress={handleLogin} className={'bg-[#280e49] flex-row justify-center p-2 rounded-md mt-2'} >
                            <Text className={'text-white'} >Login</Text>
                        </TouchableOpacity>
                    </>)}

                <TouchableOpacity onPress={()=>navigation.navigate('Register')} className={'mt-2'} >
                    <Text className={'text-[#280e49] text-center mt-4'} >Don't have an account yet? Register</Text>
                </TouchableOpacity>

            </View>
        </ScrollView>
    )
}

export default Login;

