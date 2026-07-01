// src/screens/auth/RegisterScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';

export const RegisterScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();

  const handleRegister = async () => {
    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password) {
      Alert.alert('Error', 'Todos los campos son requeridos');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setIsLoading(true);
    const result = await register({ name, email, password, role: 'psychologist' });
    setIsLoading(false);

    if (!result.success) {
      Alert.alert('Error de registro', result.error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView className="flex-1 px-6 py-4" showsVerticalScrollIndicator={false}>
          <View className="items-center mb-8">
            <View className="w-16 h-16 bg-primary-500 rounded-2xl items-center justify-center mb-3 shadow-lg">
              <Text className="text-white text-2xl font-bold">S</Text>
            </View>
            <Text className="text-2xl font-bold text-gray-900">Crear cuenta</Text>
            <Text className="text-gray-500 mt-1">Regístrate como psicólogo</Text>
          </View>

          <View className="space-y-4">
            <View>
              <Text className="text-gray-700 font-medium mb-1.5">Nombre completo</Text>
              <View className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 flex-row items-center">
                <Text className="text-gray-400 mr-2">👤</Text>
                <TextInput
                  className="flex-1 text-gray-800"
                  placeholder="Dr. Juan Pérez"
                  placeholderTextColor="#9ca3af"
                  value={formData.name}
                  onChangeText={(text) => setFormData({ ...formData, name: text })}
                />
              </View>
            </View>

            <View>
              <Text className="text-gray-700 font-medium mb-1.5">Email</Text>
              <View className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 flex-row items-center">
                <Text className="text-gray-400 mr-2">📧</Text>
                <TextInput
                  className="flex-1 text-gray-800"
                  placeholder="correo@psicologo.com"
                  placeholderTextColor="#9ca3af"
                  value={formData.email}
                  onChangeText={(text) => setFormData({ ...formData, email: text })}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>
            </View>

            <View>
              <Text className="text-gray-700 font-medium mb-1.5">Contraseña</Text>
              <View className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 flex-row items-center">
                <Text className="text-gray-400 mr-2">🔒</Text>
                <TextInput
                  className="flex-1 text-gray-800"
                  placeholder="Mínimo 6 caracteres"
                  placeholderTextColor="#9ca3af"
                  value={formData.password}
                  onChangeText={(text) => setFormData({ ...formData, password: text })}
                  secureTextEntry
                />
              </View>
            </View>

            <View>
              <Text className="text-gray-700 font-medium mb-1.5">Confirmar contraseña</Text>
              <View className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 flex-row items-center">
                <Text className="text-gray-400 mr-2">✅</Text>
                <TextInput
                  className="flex-1 text-gray-800"
                  placeholder="Repite la contraseña"
                  placeholderTextColor="#9ca3af"
                  value={formData.confirmPassword}
                  onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
                  secureTextEntry
                />
              </View>
            </View>

            <TouchableOpacity
              className={`bg-primary-500 rounded-xl py-4 mt-4 shadow-md ${
                isLoading ? 'opacity-70' : ''
              }`}
              onPress={handleRegister}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white font-bold text-center text-lg">
                  Registrarse
                </Text>
              )}
            </TouchableOpacity>

            <View className="flex-row justify-center mt-4">
              <Text className="text-gray-600">¿Ya tienes cuenta? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text className="text-primary-600 font-bold">Inicia Sesión</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="mt-8 items-center">
            <Text className="text-gray-400 text-xs">
              © 2026 Sincroniza. Todos los derechos reservados.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};