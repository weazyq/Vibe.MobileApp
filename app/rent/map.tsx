import { LegacyRef, useEffect, useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import { ScooterProvider } from "../../domain/scooters/scooterProvider";
import { Scooter } from "../../domain/scooters/scooter";
import ScooterMarker from "../../components/map/scooterMarker";
import ScooterInfoModal from "../../components/map/scooterInfoModal";
import MapView, { Region } from "react-native-maps";

function RentalScreen() {
  const [scooters, setScooters] = useState<Scooter[]>([]);
  const [selectedScooter, setSelectedScooter] = useState<Scooter | null>(null);
  const map: LegacyRef<MapView> = useRef(null);

  useEffect(() => {
    loadScooters();
  }, []);

  async function loadScooters() {
    const scooters = await ScooterProvider.getScooters();
    setScooters(scooters);
  }

  const handleSelectScooter = (scooter: Scooter) => {
    const delay: number = 500;
    const newRegion: Region = {
      latitude: scooter.latitude,
      longitude: scooter.longitude,
      latitudeDelta: 0.05,
      longitudeDelta: 0,
    };

    map.current.animateToRegion(newRegion, delay);

    setSelectedScooter(scooter);
  };

  const styles = StyleSheet.create({
    container: {
      display: "flex",
      height: "100%",
      width: "100%",
    },
  });

  return (
    <View style={styles.container}>
      {selectedScooter != null && <ScooterInfoModal
            scooter={selectedScooter}
            onClose={() => setSelectedScooter(null)}
          />
      }
      <MapView
        ref={map}
        style={{
          flex: 1,
        }}
        initialRegion={{
          latitude: 55.1,
          longitude: 38.8,
          latitudeDelta: 0.1,
          longitudeDelta: 0,
        }}
      >
        {scooters.map((scooter) => (
          <ScooterMarker
            key={scooter.id}
            scooter={scooter}
            onPress={() => handleSelectScooter(scooter)}
          />
        ))}
      </MapView>
    </View>
  );
}

export default RentalScreen;
