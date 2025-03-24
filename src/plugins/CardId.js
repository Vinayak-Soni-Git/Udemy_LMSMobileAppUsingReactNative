import AsyncStorage from "@react-native-async-storage/async-storage";

function CardId(){
    const generateRandomString = async ()=>{
        const length = 30
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
        let randomString = ''

        for(let i = 0;i<length;i++){
            const randomIndex = Math.floor(Math.random() * characters.length)
            randomString += characters.charAt(randomIndex)
        }
        AsyncStorage.setItem('randomString', randomString)
    }

    const existingRandomString = AsyncStorage.getItem('randomString')
    if(!existingRandomString){
        generateRandomString()
    }else{

    }
    return existingRandomString
}

export default CardId
