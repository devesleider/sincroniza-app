// src/api/client.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

// Obtener URL de la API
const getApiUrl = () => {
  // Primero intentar obtener de las variables de entorno de Expo
  const expoApiUrl = Constants.expoConfig?.extra?.apiUrl;
  if (expoApiUrl) {
    return expoApiUrl;
  }

  // Si no, detectar según la plataforma
  if (Platform.OS === 'android') {
    // Android emulator usa 10.0.2.2
    return 'http://10.0.2.2:5000/api';
  }
  if (Platform.OS === 'ios') {
    // iOS simulator usa localhost
    return 'http://localhost:5000/api';
  }
  // Web o dispositivo físico
  return 'http://localhost:5000/api';
};

const API_URL = getApiUrl();

console.log(`📱 API URL (${Platform.OS}):`, API_URL);

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 segundos
});

// Interceptor para agregar token
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error getting token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expirado - limpiar
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
    }
    
    // Mostrar error detallado en desarrollo
    if (__DEV__) {
      console.error('API Error:', {
        url: error.config?.url,
        method: error.config?.method,
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;