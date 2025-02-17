import {StyleSheet, Platform} from 'react-native';


export default StyleSheet.create({
    safeArea:{
        flex:1,
        marginTop:Platform.OS === 'android'?60:0,
    }
})
