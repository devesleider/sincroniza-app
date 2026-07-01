import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { appointmentsApi } from '../../api/appointments';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type AppointmentDetailScreenProps = {
  navigation: NativeStackNavigationProp<any>;
  route: { params: { id: string } };
};

export const AppointmentDetailScreen: React.FC<AppointmentDetailScreenProps> = ({ 
  navigation, 
  route 
}) => {
  const { id } = route.params;
  const [appointment, setAppointment] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAppointment();
  }, [id]);

  const loadAppointment = async () => {
    try {
      setLoading(true);
      const data = await appointmentsApi.getOne(id);
      setAppointment(data);
    } catch (error) {
      console.error('Error loading appointment:', error);
      Alert.alert('Error', 'No se pudo cargar la cita');
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async () => {
    try {
      await appointmentsApi.confirm(id);
      Alert.alert('Éxito', 'Cita confirmada');
      loadAppointment();
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  const handleCancel = async () => {
    Alert.alert(
      'Cancelar cita',
      '¿Estás seguro de que quieres cancelar esta cita?',
      [
        { text: 'No', style: 'cancel' },
        { 
          text: 'Sí, cancelar', 
          style: 'destructive',
          onPress: async () => {
            try {
              await appointmentsApi.cancel(id, 'Cancelada por el psicólogo');
              Alert.alert('Éxito', 'Cita cancelada');
              loadAppointment();
            } catch (error: any) {
              Alert.alert('Error', error.message);
            }
          }
        }
      ]
    );
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0ea5e9" />
      </View>
    );
  }

  if (!appointment) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-gray-500">Cita no encontrada</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1 px-4">
        <Text className="text-xl font-bold text-gray-800 mt-4 mb-6">
          Detalle de Cita
        </Text>

        <View className="bg-white rounded-xl p-4 shadow-sm">
          <Text className="text-sm text-gray-500">Título</Text>
          <Text className="text-lg font-semibold text-gray-800 mt-1">
            {appointment.title}
          </Text>

          <View className="mt-4">
            <Text className="text-sm text-gray-500">Paciente</Text>
            <Text className="text-lg font-semibold text-gray-800 mt-1">
              {appointment.patientName}
            </Text>
          </View>

          <View className="mt-4">
            <Text className="text-sm text-gray-500">Teléfono</Text>
            <Text className="text-lg font-semibold text-gray-800 mt-1">
              {appointment.patientPhone}
            </Text>
          </View>

          <View className="mt-4">
            <Text className="text-sm text-gray-500">Fecha y hora</Text>
            <Text className="text-lg font-semibold text-gray-800 mt-1">
              {new Date(appointment.startTime).toLocaleString('es-CO')}
            </Text>
          </View>

          <View className="mt-4">
            <Text className="text-sm text-gray-500">Estado</Text>
            <Text className={`text-lg font-semibold mt-1 capitalize ${
              appointment.status === 'confirmed' ? 'text-green-600' :
              appointment.status === 'pending' ? 'text-yellow-600' :
              appointment.status === 'cancelled' ? 'text-red-600' :
              'text-gray-600'
            }`}>
              {appointment.status}
            </Text>
          </View>

          {appointment.description && (
            <View className="mt-4">
              <Text className="text-sm text-gray-500">Descripción</Text>
              <Text className="text-gray-800 mt-1">{appointment.description}</Text>
            </View>
          )}
        </View>

        <View className="mt-6 space-y-3">
          {appointment.status === 'pending' && (
            <TouchableOpacity
              className="bg-green-500 rounded-lg py-3"
              onPress={handleConfirm}
            >
              <Text className="text-white font-semibold text-center">✅ Confirmar cita</Text>
            </TouchableOpacity>
          )}

          {appointment.status !== 'cancelled' && appointment.status !== 'completed' && (
            <TouchableOpacity
              className="bg-red-500 rounded-lg py-3"
              onPress={handleCancel}
            >
              <Text className="text-white font-semibold text-center">❌ Cancelar cita</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            className="bg-gray-500 rounded-lg py-3"
            onPress={() => navigation.goBack()}
          >
            <Text className="text-white font-semibold text-center">Volver</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};