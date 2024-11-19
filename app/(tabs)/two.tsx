import { StyleSheet, Image, Button } from 'react-native';
import { Text, View } from '@/components/Themed';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      {/* Profile Picture */}
      <Image
        source={{ uri: 'https://via.placeholder.com/150' }} // Replace with dynamic user image
        style={styles.profileImage}
      />

      {/* User Information */}
      <Text style={styles.name}>John Doe</Text>
      <Text style={styles.email}>johndoe@example.com</Text>

      {/* Action Buttons */}
      <View style={styles.actions}>
        <Button title="Edit Profile" onPress={() => alert('Edit Profile')} />
        <Button title="Log Out" onPress={() => alert('Log Out')} color="#FF4500" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212', // Dark background
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff', // White text for dark background
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 20,
  },
  actions: {
    width: '80%',
    marginTop: 20,
  },
});