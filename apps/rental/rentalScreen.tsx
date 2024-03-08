import { Platform, StyleSheet, View } from "react-native";
import MapView, { Camera, MapMarker, MarkerPressEvent, Region } from "react-native-maps";
import AppBar from "./components/appBar/appBar";
import RentalHelp from "./pages/rentalHelp";
import RentalProfile from "./pages/rentalProfile";
import { useRentalContext } from "./rentalContext";
import { RentalTabType } from "./types/RentalTab";
import { useAuthContext } from "../../AuthProvider";
import { ClientProvider } from "../../domain/clients/clientProvider";
import { LegacyRef, useEffect, useRef } from "react";
import { ScooterProvider } from "../../domain/scooters/scooterProvider";
import ScooterMarker from "./components/scooterMarker";

function RentalScreen() {
    const { activeTab, scooters, changeActiveTab, onClientLoaded, onScootersLoaded } = useRentalContext()

    const { userId } = useAuthContext()
    const map: LegacyRef<MapView> = useRef(null)

    useEffect(() => {
        loadClient()
        loadScooters()
    }, [])

    async function loadClient(){
        const client = await ClientProvider.getClient(userId)
        onClientLoaded(client)
    }

    async function loadScooters() {
        const scooters = await ScooterProvider.getScooters()
        onScootersLoaded(scooters)
    }

    const handleZoomIn = (latitude: number, longitude: number) => {
        const delay: number = 500
        const newRegion: Region = {
            latitude,
            longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0
        }

        map.current.animateToRegion(newRegion, delay)
    };
    
    const styles = StyleSheet.create({
        container: {
            display: 'flex',
            height: '100%',
            width: '100%'
        }
    })

    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }}>
                {renderRentalContent(activeTab)}
                <MapView
                    ref={map}
                    style={{
                        flex: 1
                    }}
                    initialRegion={{
                        latitude: 55.1,
                        longitude: 38.8,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0
                    }}
                    >
                    {scooters.map(scooter => 
                        <ScooterMarker key={scooter.id} scooter={scooter} onPress={() => handleZoomIn(scooter.latitude, scooter.longitude)}/>
                    )}
                </MapView>
                <AppBar
                    activeTab={activeTab}
                    onActiveTabChanged={changeActiveTab} />
            </View>
        </View>
    )
}

function renderRentalContent(activeTab: RentalTabType) {
    switch (activeTab) {
        case RentalTabType.Help:
            return <RentalHelp />
        case RentalTabType.Profile:
            return <RentalProfile />
        case RentalTabType.Ride:
            return <></>
        default:
            break;
    }
}

export default RentalScreen