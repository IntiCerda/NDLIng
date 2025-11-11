import { View, Text, Button } from "react-native";
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
        title="Logout"
        onPress={() => router.replace("/(auth)/sign-in")}
      />
    </View>
  );
}
