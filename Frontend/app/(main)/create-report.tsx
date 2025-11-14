import React, { useState } from "react";
import { View, Text, TextInput, Button, Image, Alert, StyleSheet } from "react-native";
import * as Location from "expo-location";
import { useRouter } from "expo-router";

interface Report {
  title: string;
  description: string;
  severity: "Low" | "Medium" | "High";
  photo: string;
  location: {
    latitude: number;
    longitude: number;
  };
  datetime: string;
}


export default function CreateReport() {
  const router = useRouter();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [severity, setSeverity] = useState<"Low" | "Medium" | "High">("Medium");
  const [photo, setPhoto] = useState<string | null>(null);
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [showCamera, setShowCamera] = useState<boolean>(false);

  const handleSubmit = () => {
    if (!title || !description || !photo || !location) {
      Alert.alert("Missing fields", "Please complete all fields and take a photo.");
      return;
    }

    const report: Report = {
      title,
      description,
      severity,
      photo,
      location: {
        latitude: location.latitude,
        longitude: location.longitude,
      },
      datetime: new Date().toISOString(),
    };

    console.log("Report created:", report);
    Alert.alert("Success", "Report created successfully!");
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a Report</Text>

      <Text style={styles.label}>Title</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        style={styles.input}
        placeholder="Enter title"
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        multiline
        style={[styles.input, styles.textArea]}
        placeholder="Describe the issue"
      />

      <Text style={styles.label}>Severity</Text>
      <View style={styles.severityContainer}>
        {(["Low", "Medium", "High"] as const).map((level) => (
          <Button
            key={level}
            title={level}
            color={severity === level ? "tomato" : "gray"}
            onPress={() => setSeverity(level)}
          />
        ))}
      </View>

      {photo && <Image source={{ uri: photo }} style={styles.image} />}

      <View style={styles.buttonGroup}>
        <Button title="Take Photo" onPress={() => setShowCamera(true)} />
      </View>

      <View style={styles.buttonGroup}>
        <Button title="Submit Report" onPress={handleSubmit} color="green" />
      </View>

      {location && (
        <Text style={styles.gpsText}>
          GPS: {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 15,
  },
  label: {
    fontWeight: "500",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  severityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonGroup: {
    marginVertical: 5,
  },
  gpsText: {
    marginTop: 10,
    fontSize: 12,
    color: "gray",
  },
  infoText: {
    flex: 1,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 16,
  },
  camera: {
    flex: 1,
  },
  cameraControls: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 30,
  },
});