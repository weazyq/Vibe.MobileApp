import { View, Text } from "react-native"
import Typography from "../../components/typography/typography"
import { containerStyles, textStyles } from "../../styles/styles"
import Divider from "../../components/dividers/divider"
import { useRentalContext } from "../../contexts/rentalContext"
import { RentProvider } from "../../domain/rents/rentProvider"
import { useEffect, useState } from "react"
import { Rent } from "../../domain/rents/rent"
import Property from "../../components/typography/property"
import { intervalToDuration } from "date-fns"

function Profile() {

    const {client} = useRentalContext()
    const [rents, setRents] = useState<Rent[]>([])
    
    async function getRentHistory() {
        const rents = await RentProvider.getRentHistory()
        setRents(rents)
    }
    
    useEffect(() => {
        getRentHistory()
    }, [])

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
                <Typography variant="paragraph" text={`#${index}`} style={{fontWeight: "bold"}}/>
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
                <Typography
                    variant="h3"
                    text="Профиль"
                    gutterBottom
                    style={{fontWeight: 'bold'}}
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

            <View style={{marginTop: 50}}>
                <Typography
                    variant="h3"
                    text="История поездок"
                    style={{fontWeight: 'bold'}}
                    gutterBottom                    
                    />
                <Divider sx={{marginBottom: 10}}/>
                {rents.map((r, index) => renderRent(r, index))}
            </View>
        </View>
    )
}

export default Profile