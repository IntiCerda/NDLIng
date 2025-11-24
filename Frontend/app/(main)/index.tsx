import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the main app!</Text>

      <View style={styles.buttonGroup}>
        <Button
          title="Go to Profile"
          onPress={() => router.push("/(main)/profile")}
        />
      </View>

      <View style={styles.buttonGroup}>
        <Button
          title="Make report"
          onPress={() => router.push("/(main)/create-report")}
        />
      </View>

      <View style={styles.buttonGroup}>
        <Button
          title="Logout"
          color="red"
          onPress={() => router.replace("/(auth)/sign-in")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 20,
    paddingTop: 40,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 30,
    textAlign: "center",
  },

  buttonGroup: {
    marginVertical: 10,
  },
});
