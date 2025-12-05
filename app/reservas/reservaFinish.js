import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useRouter } from "expo-router";

export default function ReservaFinish() {
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      {/* Top image with overlay */}
      <View>
        <ImageBackground
          source={require("../../assets/images/imagemCadastro.png")}
          style={styles.topImage}
        >
          <View style={styles.overlay} />
        </ImageBackground>
      </View>

      {/* Main container */}
      <View style={styles.container}>
        <Text style={styles.title}>Reserva Concluída!</Text>
        <Text style={styles.description}>
          A lua já sabe que você vem.
          Prepare-se para um banho de estrelas.
        </Text>

        {/* Button to go back to home */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/home/home")}
        >
          <Text style={styles.buttonText}>Voltar para o início</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topImage: {
    width: "100%",
    height: 376,
    resizeMode: "cover",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#0B2A3A",
    justifyContent: "flex-start",
    paddingTop: 50,
  },
  title: {
    padding: 20,
    marginTop: 10,
    fontSize: 20,
    color: "#FFF",
    marginVertical: 15,
    fontWeight: "intermediate",
    alignSelf: "center",
  },
  description: {
    color: "#E8F1F2",
    fontSize: 15,
    marginBottom: 30,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#006494",
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 25,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});