import { View, StyleSheet, Pressable } from "react-native"
import { Scooter } from "../../domain/scooters/scooter"
import Typography from "../typography/typography"
import Divider from "../dividers/divider"
import { containerStyles, textStyles } from "../../styles/styles"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import Button from "../buttons/button"
import { useRentalContext } from "../../contexts/rentalContext"
import Property from "../typography/property"

interface ScooterInfoModalProps {
    scooter: Scooter | null
    onClose: () => void
}

function ScooterInfoModal({scooter, onClose}: ScooterInfoModalProps) {
    const {client, tryInitializeRent} = useRentalContext()

    const styles = StyleSheet.create({
        container: {
            position: 'absolute',
            bottom: 0,
            minHeight: 200,
            display: 'flex',
            justifyContent: 'space-between',
            gap: 20,
            width: '100%',
            opacity: 1,
            padding: 10,
            backgroundColor: '#fff',
            borderRadius: 10,
            zIndex: 1001
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between'
        }
    })

    async function handleInitializeRent(scooterId: string, clientId: string, ){
        const result = await tryInitializeRent(scooterId, clientId)
        if(result.isSuccess) onClose()
    }

    return (
        <View style={styles.container}>
            <View>
                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Typography text="Начни путешествие прямо сейчас" variant="h4"/>
                    <Pressable onPress={onClose}>
                        <Icon name="close" size={25}/>
                    </Pressable>
                </View>
                <Divider/>
                <Typography text={`Segway-Ninebot MAX G2 (#${scooter.serialNumber})`} variant="h4"/>
                
                <View style={[containerStyles.flex, {marginTop: 10}]}>
                    <View style={containerStyles.flexCenter}>
                        <Icon name="battery-charging-70" color={textStyles.primaryText.color} size={26}/> 
                        <Property label="Заряд:" value={`${scooter.charge}%`}/>
                    </View>
                </View>
            </View>
            
            <View style={containerStyles.spaceBetween}>
                <Button 
                    disabled
                    label="Отмена"
                    size="medium"
                    onClick={onClose}
                    sx={{ width: '25%' }}
                />
                <Button 
                    size="medium"
                    label="Начать"
                    sx={{ width: '70%' }}
                    onClick={() => handleInitializeRent(scooter.id, client.id)}
                />
            </View>
        </View>
    )
}

export default ScooterInfoModal