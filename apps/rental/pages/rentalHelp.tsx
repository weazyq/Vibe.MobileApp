import { Text, View } from "react-native"
import { containerStyles } from "../../../styles/styles"

function RentalHelp() {
    return (
        <View style={[containerStyles.fullHeight, containerStyles.fullWidth, { paddingHorizontal: 20, paddingTop: 50 }]}>
            <Text>Некоторая помощь</Text>
        </View>
    )
}

export default RentalHelp