import { Scooter } from "../../../domain/scooters/scooter"
import { MapMarker, MarkerPressEvent } from "react-native-maps"

interface ScooterMarkerProps {
    scooter: Scooter
    onPress: (event: MarkerPressEvent) => void
}

function ScooterMarker({scooter, onPress}: ScooterMarkerProps) {

    const scooterMark = require('../../../assets/scooter/ScooterMark.png')
    const scooterMarkMedium = require('../../../assets/scooter/ScooterMarkMedium.png')
    const scooterMarkLow = require('../../../assets/scooter/ScooterMarkLow.png')

    let markerImageByCharge = scooterMark

    if(scooter.charge >= 50) {
        markerImageByCharge = scooterMark
    } else if (scooter.charge >= 20) {
        markerImageByCharge = scooterMarkMedium
    } else {
        markerImageByCharge = scooterMarkLow
    }
 
    return (
        <MapMarker 
            tappable
            coordinate={{
                latitude: scooter.latitude, 
                longitude: scooter.longitude,
            }}
            image={markerImageByCharge}
            onPress={onPress}
        >
        </MapMarker>
    )
}

export default ScooterMarker