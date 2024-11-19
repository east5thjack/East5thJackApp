import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, Alert } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import * as Location from 'expo-location';

export default function MapScreen() {
  // Separate states for the map's region and the user's location
  const [region, setRegion] = useState<Region | null>(null);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [locationGranted, setLocationGranted] = useState(false);

  useEffect(() => {
    (async () => {
      // Request location permissions
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Denied',
          'Location permission is required to use this feature.'
        );
        return;
      }

      setLocationGranted(true);

      // Fetch the user's current location
      let loc = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = loc.coords;

      // Set the user's location (marker) and initialize the map region
      setUserLocation({ latitude, longitude });
      setRegion({
        latitude,
        longitude,
        latitudeDelta: 0.0922, // Default zoom level
        longitudeDelta: 0.0421, // Default zoom level
      });

      // Watch for location updates and update the marker position
      const locationSubscription = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, distanceInterval: 10 }, // Update every 10 meters
        (locUpdate) => {
          setUserLocation({
            latitude: locUpdate.coords.latitude,
            longitude: locUpdate.coords.longitude,
          });
        }
      );

      return () => {
        locationSubscription.remove();
      };
    })();
  }, []);

  if (!region) {
    // Show a placeholder view while waiting for the location
    return (
      <View style={styles.container}>
        <MapView style={styles.map} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region} // Controlled region for centering
        onRegionChangeComplete={setRegion} // Allow user to pan or zoom the map
        showsUserLocation // Show a blue dot for user's location
        followsUserLocation={false} // Do not automatically follow user location
      >
        {/* Marker for the user's geolocation */}
        {userLocation && (
          <Marker
            coordinate={userLocation}
            title="Your Location"
          />
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});