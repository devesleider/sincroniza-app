// src/screens/dashboard/DashboardScreen.tsx
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';

export const DashboardScreen = ({ navigation }) => {
  const { user } = useAuth();

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        {/* Header con saludo */}
        <View className="mt-4 mb-6">
          <Text className="text-3xl font-bold text-gray-900">
            ¡Hola, {user?.name || 'Psicólogo'}! 👋
          </Text>
          <Text className="text-gray-500 mt-1 text-base">
            Bienvenido a Sincroniza
          </Text>
        </View>

        {/* Tarjetas de estadísticas */}
        <View className="flex-row flex-wrap justify-between mb-6">
          <View className="bg-white rounded-2xl p-5 w-[48%] shadow-sm mb-3 border border-gray-100">
            <View className="flex-row items-center justify-between">
              <Text className="text-3xl font-bold text-primary-600">12</Text>
              <View className="w-10 h-10 bg-primary-50 rounded-full items-center justify-center">
                <Text className="text-primary-500 text-lg">📅</Text>
              </View>
            </View>
            <Text className="text-gray-500 text-sm mt-2">Citas hoy</Text>
          </View>

          <View className="bg-white rounded-2xl p-5 w-[48%] shadow-sm mb-3 border border-gray-100">
            <View className="flex-row items-center justify-between">
              <Text className="text-3xl font-bold text-success-600">8</Text>
              <View className="w-10 h-10 bg-success-50 rounded-full items-center justify-center">
                <Text className="text-success-500 text-lg">✅</Text>
              </View>
            </View>
            <Text className="text-gray-500 text-sm mt-2">Confirmadas</Text>
          </View>

          <View className="bg-white rounded-2xl p-5 w-[48%] shadow-sm border border-gray-100">
            <View className="flex-row items-center justify-between">
              <Text className="text-3xl font-bold text-warning-600">3</Text>
              <View className="w-10 h-10 bg-warning-50 rounded-full items-center justify-center">
                <Text className="text-warning-500 text-lg">⏳</Text>
              </View>
            </View>
            <Text className="text-gray-500 text-sm mt-2">Pendientes</Text>
          </View>

          <View className="bg-white rounded-2xl p-5 w-[48%] shadow-sm border border-gray-100">
            <View className="flex-row items-center justify-between">
              <Text className="text-3xl font-bold text-danger-600">1</Text>
              <View className="w-10 h-10 bg-danger-50 rounded-full items-center justify-center">
                <Text className="text-danger-500 text-lg">❌</Text>
              </View>
            </View>
            <Text className="text-gray-500 text-sm mt-2">Canceladas</Text>
          </View>
        </View>

        {/* Acciones rápidas */}
        <Text className="text-lg font-semibold text-gray-800 mb-3">
          Acciones rápidas
        </Text>
        <View className="flex-row flex-wrap justify-between mb-6">
          <TouchableOpacity 
            className="bg-primary-500 rounded-2xl p-5 w-[48%] shadow-sm mb-3"
            onPress={() => navigation.navigate('Citas', { screen: 'CreateAppointment' })}
          >
            <Text className="text-white font-semibold text-center text-base">📅</Text>
            <Text className="text-white font-semibold text-center mt-1">Nueva cita</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className="bg-secondary-500 rounded-2xl p-5 w-[48%] shadow-sm mb-3"
            onPress={() => navigation.navigate('Citas')}
          >
            <Text className="text-white font-semibold text-center text-base">📋</Text>
            <Text className="text-white font-semibold text-center mt-1">Ver citas</Text>
          </TouchableOpacity>
        </View>

        {/* Próximas citas */}
        <Text className="text-lg font-semibold text-gray-800 mb-3">
          Próximas citas
        </Text>
        <View className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-4">
          <View className="flex-row justify-between items-center py-3 border-b border-gray-50">
            <View className="flex-1">
              <Text className="font-semibold text-gray-800">María González</Text>
              <Text className="text-sm text-gray-500 mt-0.5">10:00 - 11:00 AM</Text>
            </View>
            <View className="bg-success-100 px-3 py-1.5 rounded-full">
              <Text className="text-success-700 text-xs font-medium">Confirmada</Text>
            </View>
          </View>
          <View className="flex-row justify-between items-center py-3 border-b border-gray-50">
            <View className="flex-1">
              <Text className="font-semibold text-gray-800">Carlos Pérez</Text>
              <Text className="text-sm text-gray-500 mt-0.5">11:30 - 12:30 PM</Text>
            </View>
            <View className="bg-warning-100 px-3 py-1.5 rounded-full">
              <Text className="text-warning-700 text-xs font-medium">Pendiente</Text>
            </View>
          </View>
          <View className="flex-row justify-between items-center py-3">
            <View className="flex-1">
              <Text className="font-semibold text-gray-800">Laura Martínez</Text>
              <Text className="text-sm text-gray-500 mt-0.5">03:00 - 04:00 PM</Text>
            </View>
            <View className="bg-warning-100 px-3 py-1.5 rounded-full">
              <Text className="text-warning-700 text-xs font-medium">Pendiente</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};