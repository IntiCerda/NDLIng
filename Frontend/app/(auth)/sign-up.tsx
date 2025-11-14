import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { Link, useRouter } from "expo-router";
import { useState } from "react";

export default function SignUp() {
  const router = useRouter();
  const [rut, setRut] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const formatRut = (value: string): string => {

    const cleanValue = value.replaceAll(/[^0-9kK]/g, '')

    const limitedValue = cleanValue.slice(0, 9);
    
    if (limitedValue.length === 0) return '';
    
    const verifier = limitedValue.slice(-1).toUpperCase();
    const numbers = limitedValue.slice(0, -1);

    if (numbers.length === 0) return verifier;

    let formatted = '';
    let count = 0;

    for (let i = numbers.length - 1; i >= 0; i--) {
      formatted = numbers[i] + formatted;
      count++;
      if ((count === 3 && i > 0) || (count === 6 && i > 0)) {
        formatted = '.' + formatted;
        count = 0;
      }
    }

    return formatted + '-' + verifier;
  }

  const handleRutChange = (text: string) => {
    const cleanRut = text.replaceAll(/[^0-9kK]/g, '').slice(0, 9);
    setRut(cleanRut);
  };

  const handleSignUp = (): boolean => {
    if (!rut || !email || !password || !confirmPassword) {
      Alert.alert("Missing fields", "Please fill out all fields.");
      return false;
    }

    if (password !== confirmPassword) {
      Alert.alert("Password mismatch", "Passwords do not match.");
      return false;
    }

    console.log("User registered:", email);

    router.replace("/");
    return true
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crea una cuenta</Text>

      <TextInput
        style={styles.input}
        placeholder="Rut"
        value={formatRut(rut)}
        onChangeText={handleRutChange}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Confirmar Contraseña"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <View style={styles.button}>
        <Button title="Sign Up" onPress={handleSignUp} />
      </View>

      <Link href="/(auth)/sign-in" style={styles.link}>
        ¿Ya tienes una cuenta? Ingresa aquí
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    marginTop: 8,
    marginBottom: 16,
  },
  link: {
    textAlign: "center",
    color: "#007bff",
  },
});
