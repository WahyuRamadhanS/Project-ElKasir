import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const VerificationScreen = ({ route, navigation }) => {
  const [code, setCode] = useState('');
  const { contact } = route.params;

  const handleVerify = () => {
    // Verification logic here
    navigation.navigate('Home');
  };

  const handleResend = () => {
    // Resend verification code logic here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verification</Text>
      <Text style={styles.subtitle}>
        A verification code will be sent to {contact}
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Verification Code"
        value={code}
        onChangeText={setCode}
      />
      <Button title="Next" onPress={handleVerify} />
      <Button title="Resend Code" onPress={handleResend} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default VerificationScreen;
