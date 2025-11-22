import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24 }}>Welcome to the main app!</Text>
      <Button
        title="Go to Profile"
        onPress={() => router.push("/(main)/profile")}
      />
      <Button
        title="Make report"
        onPress={() => router.push("/(main)/create-report")}
      />
      <Button
        title="Logout"
        color="red"
        onPress={() => router.replace("/(auth)/sign-in")}
      />
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
