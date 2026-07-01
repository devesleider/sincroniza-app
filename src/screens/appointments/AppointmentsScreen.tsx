import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { appointmentsApi } from '../../api/appointments';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type Appointment = {
  _id: string;
  title: string;
  patientName: string;
  startTime: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
};

type AppointmentsScreenProps = {
  navigation: NativeStackNavigationProp<any>;
};

export const AppointmentsScreen: React.FC<AppointmentsScreenProps> = ({ navigation }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      setLoading(true);
      const data = await appointmentsApi.getAll();
      setAppointments(data.appointments || []);
    } catch (error) {
      console.error('Error loading appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-700',
      confirmed: 'bg-green-100 text-green-700',
      cancelled: 'bg-red-100 text-red-700',
      completed: 'bg-blue-100 text-blue-700',
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0ea5e9" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-row justify-between items-center px-4 py-3">
        <Text className="text-xl font-bold text-gray-800">Mis Citas</Text>
        <TouchableOpacity 
          className="bg-primary-500 px-4 py-2 rounded-lg"
          onPress={() => navigation.navigate('CreateAppointment')}
        >
          <Text className="text-white font-semibold">+ Nueva</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={appointments}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            className="bg-white mx-4 mb-3 p-4 rounded-xl shadow-sm"
            onPress={() => navigation.navigate('AppointmentDetail', { id: item._id })}
          >
            <View className="flex-row justify-between items-center">
              <View className="flex-1">
                <Text className="font-semibold text-gray-800">{item.title}</Text>
                <Text className="text-gray-500 text-sm mt-1">
                  {new Date(item.startTime).toLocaleString('es-CO')}
                </Text>
                <Text className="text-gray-500 text-sm">Paciente: {item.patientName}</Text>
              </View>
              <View className={`px-3 py-1 rounded-full ${getStatusColor(item.status)}`}>
                <Text className="text-xs font-medium capitalize">{item.status}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center py-10">
            <Text className="text-gray-500">No tienes citas programadas</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};