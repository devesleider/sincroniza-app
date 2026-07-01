// src/screens/auth/LoginScreen.tsx
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
  Image,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';

export const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor ingresa email y contraseña');
      return;
    }

    setIsLoading(true);
    const result = await login(email, password);
    setIsLoading(false);

    if (!result.success) {
      Alert.alert('Error de inicio de sesión', result.error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 justify-center px-6"
      >
        {/* Logo y título */}
        <View className="items-center mb-12">
          <View className="w-20 h-20 bg-primary-500 rounded-3xl items-center justify-center mb-4 shadow-lg">
            <Text className="text-white text-3xl font-bold">S</Text>
          </View>
          <Text className="text-3xl font-bold text-gray-900">Sincroniza</Text>
          <Text className="text-gray-500 mt-1 text-center">
            Gestión de citas inteligente para psicólogos
          </Text>
        </View>

        {/* Formulario */}
        <View className="space-y-4">
          <View>
            <Text className="text-gray-700 font-medium mb-1.5">Email</Text>
            <View className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 flex-row items-center">
              <Text className="text-gray-400 mr-2">📧</Text>
              <TextInput
                className="flex-1 text-gray-800"
                placeholder="correo@psicologo.com"
                placeholderTextColor="#9ca3af"
                value={email}
                onChangeText={setEmail}
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
                placeholder="••••••••"
                placeholderTextColor="#9ca3af"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>
          </View>

          {/* Olvidé mi contraseña */}
          <TouchableOpacity className="self-end">
            <Text className="text-primary-600 text-sm font-medium">
              ¿Olvidaste tu contraseña?
            </Text>
          </TouchableOpacity>

          {/* Botón de login */}
          <TouchableOpacity
            className={`bg-primary-500 rounded-xl py-4 mt-4 shadow-md ${
              isLoading ? 'opacity-70' : ''
            }`}
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white font-bold text-center text-lg">
                Iniciar Sesión
              </Text>
            )}
          </TouchableOpacity>

          {/* Enlace a registro */}
          <View className="flex-row justify-center mt-6">
            <Text className="text-gray-600">¿No tienes cuenta? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text className="text-primary-600 font-bold">Regístrate</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer */}
        <View className="mt-8 items-center">
          <Text className="text-gray-400 text-xs">
            © 2026 Sincroniza. Todos los derechos reservados.
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};