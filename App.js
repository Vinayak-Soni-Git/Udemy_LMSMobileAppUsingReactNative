import { SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { TailwindProvider } from "tailwindcss-react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GlobalStyle from "./src/style/GlobalStyle";

// Screens
import Home from "./screens/base/Home";
import CourseDetail from "./screens/base/CourseDetail";
import Cart from "./screens/base/Cart";
import Checkout from "./screens/base/Checkout";
import Success from "./screens/base/Success";
import Shimmer from "./screens/Shimmer";
import Login from "./screens/auth/Login";
import Register from "./screens/auth/Register";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <SafeAreaView style={GlobalStyle.safeArea}>
        <TailwindProvider>
            <NavigationContainer>
              <Stack.Navigator>
                  <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                  <Stack.Screen name="CourseDetail" component={CourseDetail} options={{ headerShown: false }} />
                  <Stack.Screen name="Cart" component={Cart} options={{ headerShown: false }} />
                  <Stack.Screen name="Checkout" component={Checkout} options={{ headerShown: false }} />
                  <Stack.Screen name="Success" component={Success} options={{ headerShown: false }} />
                  <Stack.Screen name="Shimmer" component={Shimmer} options={{ headerShown: false }} />

                  {/*Auth Screens*/}
                  <Stack.Screen name='Login' component={Login} options={{headerShown:false}}/>
                  <Stack.Screen name='Register' component={Register} options={{headerShown:false}}/>
              </Stack.Navigator>
            </NavigationContainer>
        </TailwindProvider>
      </SafeAreaView>
  );
}
