import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, Alert, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location'; // Install expo-location for geolocation support

export default function MapScreen() {
  const [region, setRegion] = useState({
    latitude: 37.78825, // Default latitude
    longitude: -122.4324, // Default longitude
    latitudeDelta: 0.0922, // Zoom level
    longitudeDelta: 0.0421, // Zoom level
  });

  const [location, setLocation] = useState(null); // Store the user's location

  // Request location permissions and track user's location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Allow location access to use this feature.');
        return;
      }

      // Get the user's initial location
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
      setRegion((prevRegion) => ({
        ...prevRegion,
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      }));

      // Track the user's location updates
      const locationSubscription = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, distanceInterval: 10 }, // Update every 10 meters
        (locUpdate) => {
          setLocation(locUpdate.coords);
          setRegion((prevRegion) => ({
            ...prevRegion,
            latitude: locUpdate.coords.latitude,
            longitude: locUpdate.coords.longitude,
          }));
        }
      );

      return () => {
        locationSubscription.remove();
      };
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region} // Controlled region for centering
        onRegionChangeComplete={setRegion}
        showsUserLocation // Show user marker on map
        followsUserLocation // Automatically follow user
      >
        {/* Custom marker to represent user location */}
        {location && (
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="You"
            description="Your current location"
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