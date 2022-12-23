import * as Font from "expo-font";

export default useFonts = async () => {
    await Font.loadAsync({
        "Atma-Regular": require('../assets/fonts/Atma-Regular.ttfr')
    })
}