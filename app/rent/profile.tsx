import { View, Text } from "react-native"
import Typography from "../../components/typography/typography"
import { Colors, containerStyles, textStyles } from "../../styles/styles"
import Divider from "../../components/dividers/divider"
import { useRentalContext } from "../../contexts/rentalContext"
import { RentProvider } from "../../domain/rents/rentProvider"
import { useEffect, useState } from "react"
import { Rent } from "../../domain/rents/rent"
import Property from "../../components/typography/property"
import { intervalToDuration } from "date-fns"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { useAuthContext } from "../../contexts/authContext"

function Profile() {

    const {client, activeRent} = useRentalContext()
    const {logout} = useAuthContext()
    const [rents, setRents] = useState<Rent[]>([])
    
    async function getRentHistory() {
        const rents = await RentProvider.getRentHistory()
        setRents(rents)
    }
    
    useEffect(() => {
        getRentHistory()
    }, [activeRent])

    function handleLogOut(){
        logout()
    }

    function renderRent(rent: Rent, index: number){
        const rentDuration = intervalToDuration({
            start: new Date(rent.startedAt),
            end: new Date(rent.endedAt)
        })

        return <View
            key={index} 
            style={[containerStyles.fullWidth, containerStyles.flexColumn, {
                backgroundColor: "#fff",
                borderRadius: 10,
                padding: 10,
                marginTop: 10
        }]}>
            <View style={[containerStyles.spaceBetween]}>
                <Typography variant="paragraph" text={`#${index}`} sx={{fontWeight: "bold"}}/>
                <Text style={textStyles.secondaryText}>{new Date(rent.startedAt).toLocaleString()}</Text>
            </View>
            <Property label="Самокат:" value={rent.scooterId}/>
            <Property label="Длительность:" value={`${rentDuration.minutes} м. ${rentDuration.seconds} сек.`}/>
            <Property label="Цена:" value={`${rent.price} р.`}/>
        </View>
    }

    return (
        <View style={[containerStyles.fullHeight, containerStyles.fullWidth, { paddingHorizontal: 20, paddingTop: 50 }]}>
            <View>
                <View style={[containerStyles.spaceBetween]}>
                    <Typography
                        variant="h3"
                        text="Профиль"
                        gutterBottom
                        sx={{fontWeight: 'bold'}}
                    />
                    <View style={[containerStyles.flex, containerStyles.alignItemsCenter, {gap: 5}]}>
                        <Typography variant="paragraph" text="Выход" sx={{fontWeight: 'bold'}}/>
                        <Icon name="exit-to-app" color={'black'} size={32} onPress={handleLogOut}/>
                    </View>
                </View>
                <Divider />

                <Typography
                    variant="paragraph"
                    text={`Имя: ${client.name}`}
                />
                <Typography
                    variant="paragraph"
                    text={`Номер телефона: ${client.phone}`}
                />
            </View>

            <View style={{marginTop: 50}}>
                <Typography
                    variant="h3"
                    text="История поездок"
                    sx={{fontWeight: 'bold'}}
                    gutterBottom                    
                    />
                <Divider sx={{marginBottom: 10}}/>
                {rents.map((r, index) => renderRent(r, index))}
            </View>
        </View>
    )
}

export default Profile