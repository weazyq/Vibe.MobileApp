import { View } from "react-native"
import Divider from "../../../components/dividers/divider"
import Typography from "../../../components/typography/typography"
import { containerStyles } from "../../../styles/styles"
import { useRentalContext } from "../rentalContext"

function RentalProfile() {
    const { client } = useRentalContext()

    return (
        <View style={[containerStyles.fullHeight, containerStyles.fullWidth, { paddingHorizontal: 20, paddingTop: 50 }]}>
            <Typography
                variant="h2"
                text="Профиль"
                gutterBottom
            />
            <Divider />
            <Typography
                variant="paragraph"
                text={client.name}
            />
            <Typography
                variant="paragraph"
                text={client.phone}
            />
        </View>
    )
}

export default RentalProfile