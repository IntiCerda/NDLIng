import { Link, useRouter } from "expo-router";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useState } from "react";
import { useAuthStore } from "@/store/authStore";

export default function SignIn() {
  const router = useRouter();
  const { setEmailStore } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    // TODO: authenticate user

    setEmailStore(email)
    router.replace("/");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ingresar</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <View style={styles.button}>
        <Button title="Ingresar" onPress={handleSignIn} />
      </View>

      <Link href="/(auth)/sign-up" style={styles.link}>
        Crea una cuenta
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
