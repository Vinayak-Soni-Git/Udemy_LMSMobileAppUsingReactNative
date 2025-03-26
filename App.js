import {SafeAreaView} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {TailwindProvider} from "tailwindcss-react-native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import GlobalStyle from "./src/style/GlobalStyle";
import {store} from './src/store/Store'
import Home from "./screens/base/Home";
import CourseDetail from "./screens/base/CourseDetail";
import Cart from "./screens/base/Cart";
import Checkout from "./screens/base/Checkout";
import Success from "./screens/base/Success";
import Login from "./screens/auth/Login";
import Register from "./screens/auth/Register";
import Dashboard from './screens/student/Dashboard';
import Message from './screens/student/Message';
import MyCourses from './screens/student/MyCourses';
import Note from './screens/student/Note';
import Settings from './screens/student/Settings';
import StudentCourseDetail from './screens/student/StudentCourseDetail';
import {Provider} from "react-redux";
import Reviews from "./screens/student/Reviews";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <SafeAreaView style={GlobalStyle.safeArea}>
            <TailwindProvider>
                <Provider store={store}>
                    <NavigationContainer>
                        <Stack.Navigator initialRouteName={'Login'} >
                            <Stack.Screen name='Login' component={Login} options={{headerShown: false}}/>
                            <Stack.Screen name='Register' component={Register} options={{headerShown: false}}/>
                            <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
                            <Stack.Screen name="CourseDetail" component={CourseDetail} options={{headerShown: false}}/>
                            <Stack.Screen name="Cart" component={Cart} options={{headerShown: false}}/>
                            <Stack.Screen name="Checkout" component={Checkout} options={{headerShown: false}}/>
                            <Stack.Screen name="Success" component={Success} options={{headerShown: false}}/>
                            <Stack.Screen name={'Dashboard'} component={Dashboard} options={{headerShown: false}}/>
                            <Stack.Screen name={'Message'} component={Message} options={{headerShown: false}}/>
                            <Stack.Screen name={'MyCourses'} component={MyCourses} options={{headerShown: false}}/>
                            <Stack.Screen name={'Note'} component={Note} options={{headerShown: false}}/>
                            <Stack.Screen name={'Reviews'} component={Reviews} options={{headerShown:false}} />
                            <Stack.Screen name={'Settings'} component={Settings} options={{headerShown: false}}/>
                            <Stack.Screen name={'StudentCourseDetail'} component={StudentCourseDetail} options={{headerShown: false}}/>
                        </Stack.Navigator>
                    </NavigationContainer>
                </Provider>
            </TailwindProvider>
        </SafeAreaView>
    );
}
