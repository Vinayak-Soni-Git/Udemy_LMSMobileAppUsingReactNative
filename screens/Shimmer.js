import React, { useState, useEffect } from "react";
import {Text} from "react-native";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";
import {LinearGradient} from "expo-linear-gradient";

const App = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setTimeout(() => setIsLoaded(true), 5000); // Simulating data fetch
    }, []);

    return (
        <ShimmerPlaceholder
            visible={isLoaded}
            shimmerColors={["#ebebeb", "#c5c5c5", "#ebebeb"]}
            LinearGradient={LinearGradient}>
            <Text>Loaded Content</Text>
        </ShimmerPlaceholder>
    )
};

export default App;
