import React, { useEffect } from "react";
import { View, Text, TextInput, Button, Image, Alert, StyleSheet } from "react-native";
import * as Location from "expo-location";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useReportStore } from "@/store/useReportStore";
import { makeReport } from "@/utils/funcs";
import { Report } from "@/types"

export default function CreateReport() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { title, description, severity, photo, location, setField, setLocation } = useReportStore();

  useEffect(() => {
    if (params.photoUri) {
      setField("photo", params.photoUri);
    }
  }, [params.photoUri]);


  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permission needed",
          "Location permission is required to include GPS coordinates."
        );
        return;
      }
      const pos = await Location.getCurrentPositionAsync({});
      setLocation(pos.coords.latitude, pos.coords.longitude);
    })();
  }, []);



  const handleSubmit = async () => {
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
        latitude: location.latitude!,
        longitude: location.longitude!,
      },
      datetime: new Date().toISOString(),
    };

    try {
      await makeReport(report);

      Alert.alert("Success", "Report created successfully!");
      router.back();
    } catch (err: any) {
      Alert.alert("Error", err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Reporte</Text>

      <Text style={styles.label}>Title</Text>
      <TextInput
        value={title}
        onChangeText={(v) => setField("title", v)}
      />


      <Text style={styles.label}>Description</Text>
      <TextInput
        value={description}
        onChangeText={(v) => setField("description", v)}
      />

      <Text style={styles.label}>Severidad</Text>
      <View style={styles.severityContainer}>
        {(["Bajo", "Medio", "Alto"] as const).map((level) => (
          <Button
            key={level}
            title={level}
            onPress={() => setField("severity", "Bajo")}
          />
        ))}
      </View>

      {photo && <Image source={{ uri: photo }} style={styles.image} />}

      <View style={styles.buttonGroup}>
        <Button title="Take Photo" onPress={() => router.push("/camera-screen")} />
      </View>

      <View style={styles.buttonGroup}>
        <Button title="Submit Report" onPress={handleSubmit} color="green" />
      </View>

      {location && (
        <Text style={styles.gpsText}>
          GPS: {location.latitude!}, {location.longitude!}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 20,
    color: "#111827",
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 6,
    marginTop: 12,
  },

  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 8,
  },

  textArea: {
    height: 120,
    textAlignVertical: "top",
  },

  severityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 18,
  },

  image: {
    width: "100%",
    height: 220,
    borderRadius: 12,
    marginVertical: 15,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  buttonGroup: {
    marginVertical: 8,
  },

  gpsText: {
    marginTop: 15,
    fontSize: 13,
    color: "#6B7280",
    textAlign: "center",
  },

  buttonStyled: {
    backgroundColor: "#2563EB",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 5,
  },
  buttonStyledText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
  }
});
