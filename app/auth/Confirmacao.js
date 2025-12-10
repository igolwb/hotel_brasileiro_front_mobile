import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Confirmacao() {
  const [codigo, setCodigo] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await AsyncStorage.getItem("userInfo");
        if (userInfo) {
          const { nome, email, telefone, senha } = JSON.parse(userInfo);
          setNome(nome);
          setEmail(email);
          setTelefone(telefone);
          setSenha(senha);
        } else {
          setError("Erro interno. Tente novamente.");
        }
      } catch (err) {
        console.error("Erro ao buscar informações do usuário:", err);
        setError("Erro interno. Tente novamente.");
      }
    };

    fetchUserInfo();
  }, []);

  const handleConfirmar = async () => {
    setError("");
    if (!codigo) {
      setError("Digite o código de confirmação.");
      return;
    }

    setLoading(true);
    try {
      const userInfo = await AsyncStorage.getItem("userInfo");
      if (!userInfo) {
        setError("Erro interno. Tente novamente.");
        setLoading(false);
        return;
      }

      const { nome, email, telefone, senha } = JSON.parse(userInfo);
      const API_URL = process.env.EXPO_PUBLIC_API_URL || "https://hotel-brasileiro-back-mobile.onrender.com";
      const response = await fetch(`${API_URL}/api/clientes/confirm`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, telefone, senha, confirmationCode: codigo }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        await AsyncStorage.removeItem("userInfo");
        router.push("/home/home"); // Navigate to the home screen after successful confirmation
      } else {
        setError(data.message || "Código inválido ou expirado.");
      }
    } catch (err) {
      setError("Erro de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirmação de Cadastro</Text>
      {error ? (
        <Text style={{ color: "red", textAlign: "center", marginVertical: 8 }}>
          {error}
        </Text>
      ) : (
        <Text style={styles.description}>
          Digite o código enviado para o email {email}.
        </Text>
      )}

      <TextInput
        style={styles.input}
        placeholder="Código de Confirmação"
        placeholderTextColor="#999"
        value={codigo}
        onChangeText={setCodigo}
      />

      <TouchableOpacity style={styles.button} onPress={handleConfirmar} disabled={loading || !nome || !email || !telefone || !senha}>
        <Text style={styles.buttonText}>{loading ? "Confirmando..." : "Confirmar"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#0B2A3A",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    color: "#FFF",
    marginBottom: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
  description: {
    color: "#E8F1F2",
    fontSize: 15,
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#E8F1F2",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 20,
    color: "#000",
  },
  button: {
    backgroundColor: "#006494",
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});