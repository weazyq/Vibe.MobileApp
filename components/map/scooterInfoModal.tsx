import { View, Text, StyleSheet, Pressable } from "react-native"
import { Scooter } from "../../domain/scooters/scooter"
import Typography from "../typography/typography"
import Divider from "../dividers/divider"
import { containerStyles, textStyles } from "../../styles/styles"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import Button from "../buttons/button"

interface ScooterInfoModalProps {
    scooter: Scooter | null
    onClose: () => void
}

function ScooterInfoModal({scooter, onClose}: ScooterInfoModalProps) {
    
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
            zIndex: 1001
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between'
        }
    })

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
                <Typography text={"Segway-Ninebot MAX G2"} variant="h4"/>
                <Typography text={scooter.serialNumber} variant="paragraph"/>
                <Text>Заряд: <Text style={textStyles.primaryText}>{scooter.charge}%</Text></Text>
            </View>
            
            <View style={[containerStyles.flex, containerStyles.spaceBetween]}>
                <Button 
                    disabled
                    label="Отмена"
                    size="medium"
                    onClick={onClose}
                    sx={{ width: '25%' }}
                />
                <Button 
                    label="Начать" 
                    size="medium"
                    sx={{ width: '70%' }}
                />
            </View>
        </View>
    )
}

export default ScooterInfoModal