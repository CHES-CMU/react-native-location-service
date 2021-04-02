import React, { useState } from "react";
import MapView, { PROVIDER_GOOGLE, Marker, Circle } from "react-native-maps";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
} from "react-native";
import GetLocation from "react-native-get-location";

function App() {
  const [geoLocation, setGeoLocation] = useState({
    accuracy: 13.317999839782715,
    altitude: 465.03484570522534,
    bearing: 320.23260498046875,
    latitude: 37.78825,
    longitude: -122.4324,
    provider: "",
    speed: 0,
  });

  const getGeoLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then((location) => {
        setGeoLocation(location);
        console.log(location);
      })
      .catch((error) => {
        const { code, message } = error;
        console.warn(code, message);
      });
  };

  const getLatLong = () => ({
    latitude: geoLocation.latitude,
    longitude: geoLocation.longitude,
  });

  const getLatLongDelta = () => {
    let acc = geoLocation.accuracy;
    let meter2CoodDelta = 0.00000904371732957115;
    let maxMeter = 20;
    if (acc > maxMeter) {
      return acc * meter2CoodDelta * 20;
    } else {
      return meter2CoodDelta * 200;
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={{
          latitude: geoLocation.latitude,
          longitude: geoLocation.longitude,
          latitudeDelta: getLatLongDelta(),
          longitudeDelta: getLatLongDelta(),
        }}
      >
        <Circle
          center={getLatLong()}
          radius={geoLocation.accuracy}
          zIndex={1}
          fillColor="rgba(255,102,71,0.5)"
          strokeColor="rgba(255,102,71,0.8)"
        />

        <Marker
          coordinate={getLatLong()}
          title="Here"
          description="My current location"
        />
      </MapView>

      <Button title="GET LOCATION" onPress={getGeoLocation} />
      <Text>
        Lat: {geoLocation.latitude} {"\n"}
        Long: {geoLocation.longitude} {"\n"}
        Speed: {geoLocation.speed} {"\n"}
        Acc: {geoLocation.accuracy} {"\n"}
        Alt: {geoLocation.altitude} {"\n"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  map: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default App;
