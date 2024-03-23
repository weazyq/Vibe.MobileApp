import { Rent } from "../../domain/rents/rent"
import { StyleSheet, View } from "react-native"
import Typography from "../typography/typography"
import Property from "../typography/property"
import Button from "../buttons/button"
import RentCounter from "./rentCounter"
import Divider from "../dividers/divider"

interface RentInfoProps{
    rent: Rent
    onEndRent: () => void
}

function RentInfo({rent, onEndRent}: RentInfoProps) {
    const styles = StyleSheet.create({
        container: {
            position: 'absolute',
            top: 0,
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            opacity: 1,
            paddingTop: 50,
            paddingBottom: 30,
            paddingHorizontal: 30,
            backgroundColor: '#fff',
            zIndex: 1001,
            borderRadius: 10
        }
    })

    return (
        <View style={styles.container}>
            <View>
                <Typography text="Активная аренда" variant="h3"/>
                <Divider sx={{marginBottom: 20}}/>

                <Property label="Начало:" value={new Date(rent.startedAt).toLocaleString()}/>
                <Property label="Тариф:" value={"5 р. / 1 мин."}/>
                <RentCounter startedAt={rent.startedAt} />
            </View>
            <Button 
                variant="contained" 
                label="Завершить аренду" 
                size="medium" 
                sx={{marginTop: 30}}
                onClick={onEndRent}
            />
        </View>
    )
}

export default RentInfo