import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { appointmentsApi } from '../../api/appointments';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type CreateAppointmentScreenProps = {
  navigation: NativeStackNavigationProp<any>;
};

export const CreateAppointmentScreen: React.FC<CreateAppointmentScreenProps> = ({ navigation }) => {
  const [formData, setFormData] = useState({
    patientName: '',
    patientPhone: '',
    patientEmail: '',
    title: '',
    description: '',
    startTime: '',
    endTime: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!formData.patientName || !formData.patientPhone || !formData.startTime || !formData.endTime) {
      Alert.alert('Error', 'Por favor completa todos los campos requeridos');
      return;
    }

    try {
      setLoading(true);
      await appointmentsApi.create(formData);
      Alert.alert('Éxito', 'Cita creada correctamente');
      navigation.goBack();
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Error al crear la cita');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1 px-4">
        <Text className="text-xl font-bold text-gray-800 mt-4 mb-6">Nueva Cita</Text>

        <View className="space-y-4">
          <View>
            <Text className="text-gray-700 font-medium mb-1">Nombre del paciente *</Text>
            <TextInput
              className="bg-white border border-gray-200 rounded-lg px-4 py-3"
              placeholder="Nombre completo"
              value={formData.patientName}
              onChangeText={(text) => setFormData({ ...formData, patientName: text })}
            />
          </View>

          <View>
            <Text className="text-gray-700 font-medium mb-1">Teléfono *</Text>
            <TextInput
              className="bg-white border border-gray-200 rounded-lg px-4 py-3"
              placeholder="+573001234567"
              value={formData.patientPhone}
              onChangeText={(text) => setFormData({ ...formData, patientPhone: text })}
              keyboardType="phone-pad"
            />
          </View>

          <View>
            <Text className="text-gray-700 font-medium mb-1">Email</Text>
            <TextInput
              className="bg-white border border-gray-200 rounded-lg px-4 py-3"
              placeholder="paciente@email.com"
              value={formData.patientEmail}
              onChangeText={(text) => setFormData({ ...formData, patientEmail: text })}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View>
            <Text className="text-gray-700 font-medium mb-1">Título *</Text>
            <TextInput
              className="bg-white border border-gray-200 rounded-lg px-4 py-3"
              placeholder="Terapia cognitivo-conductual"
              value={formData.title}
              onChangeText={(text) => setFormData({ ...formData, title: text })}
            />
          </View>

          <View>
            <Text className="text-gray-700 font-medium mb-1">Fecha y hora inicio *</Text>
            <TextInput
              className="bg-white border border-gray-200 rounded-lg px-4 py-3"
              placeholder="2026-07-20T10:00:00"
              value={formData.startTime}
              onChangeText={(text) => setFormData({ ...formData, startTime: text })}
            />
          </View>

          <View>
            <Text className="text-gray-700 font-medium mb-1">Fecha y hora fin *</Text>
            <TextInput
              className="bg-white border border-gray-200 rounded-lg px-4 py-3"
              placeholder="2026-07-20T11:00:00"
              value={formData.endTime}
              onChangeText={(text) => setFormData({ ...formData, endTime: text })}
            />
          </View>

          <TouchableOpacity
            className="bg-primary-500 rounded-lg py-3 mt-4"
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text className="text-white font-semibold text-center">
              {loading ? 'Creando...' : 'Crear Cita'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};