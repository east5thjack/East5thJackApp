import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Tabs: undefined;
  Authentication: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Authentication'>;

export default function AuthenticationScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome! Please Log In or Sign Up</Text>
      <Button title="Log In" onPress={() => navigation.replace('Tabs')} />
      <Button title="Sign Up" onPress={() => navigation.replace('Tabs')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  text: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 20,
  },
});
