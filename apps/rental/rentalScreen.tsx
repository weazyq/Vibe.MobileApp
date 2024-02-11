import { StyleSheet, Text, View } from "react-native";
import MapView, { MapMarker } from "react-native-maps";
import AppBar from "../../components/appBar/appBar";
import RentalHelp from "./pages/rentalHelp";
import RentalProfile from "./pages/rentalProfile";
import { useRentalContext } from "./rentalContext";
import { RentalTabType } from "./types/RentalTab";

function RentalScreen() {
    const { activeTab, changeActiveTab } = useRentalContext()

    const styles = StyleSheet.create({
        container: {
            display: 'flex',
            height: '100%',
            width: '100%'
        }
    })

    const scooters = [
        { longitude: 55.1, latitude: 38.8 },
        { longitude: 53.1, latitude: 37.8 },
        { longitude: 54.1, latitude: 38.8 },
        { longitude: 52.1, latitude: 37.8 },
    ]

    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }}>
                {renderRentalContent(activeTab)}
                <MapView
                    style={{
                        flex: 1
                    }}
                    initialRegion={{
                        latitude: 55.1,
                        longitude: 38.8,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0
                    }}>
                    <MapMarker coordinate={{
                        latitude: 55.1, longitude: 38.8
                    }}>
                        <View>
                            <Text>Кастом мэточка</Text>
                        </View>
                    </MapMarker>
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