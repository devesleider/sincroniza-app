// src/config/index.js
import { Platform } from 'react-native';
import Constants from 'expo-constants';

// Obtener URL de la API
const getApiUrl = () => {
  // Intentar obtener de Expo
  const expoApiUrl = Constants.expoConfig?.extra?.apiUrl;
  if (expoApiUrl) {
    return expoApiUrl;
  }

  // Detectar según plataforma
  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:5000/api';
  }
  return 'http://localhost:5000/api';
};

const config = {
  apiUrl: getApiUrl(),
  appName: Constants.expoConfig?.name || 'Sincroniza',
  platform: Platform.OS,
  isDevelopment: __DEV__,
};

console.log('📱 Config:', config);

export default config;