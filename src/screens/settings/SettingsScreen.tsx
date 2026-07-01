import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';

export const SettingsScreen: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <SafeAreaView className="flex-1 bg-gray-50 px-4">
      <Text className="text-xl font-bold text-gray-800 mt-4 mb-6">Configuración</Text>

      <View className="bg-white rounded-xl p-4 shadow-sm mb-4">
        <Text className="text-gray-500 text-sm">Cuenta</Text>
        <Text className="font-semibold text-gray-800 mt-1">{user?.name}</Text>
        <Text className="text-gray-500">{user?.email}</Text>
        <Text className="text-primary-500 text-sm mt-1 capitalize">Rol: {user?.role}</Text>
      </View>

      <View className="bg-white rounded-xl p-4 shadow-sm">
        <Text className="text-gray-500 text-sm mb-3">Opciones</Text>
        <TouchableOpacity className="py-3 border-b border-gray-100">
          <Text className="text-gray-800">📱 WhatsApp</Text>
        </TouchableOpacity>
        <TouchableOpacity className="py-3 border-b border-gray-100">
          <Text className="text-gray-800">📅 Google Calendar</Text>
        </TouchableOpacity>
        <TouchableOpacity className="py-3">
          <Text className="text-gray-800">🔔 Recordatorios</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        className="bg-red-500 rounded-xl py-3 mt-6"
        onPress={logout}
      >
        <Text className="text-white font-semibold text-center">Cerrar Sesión</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};