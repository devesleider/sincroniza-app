// src/navigation/MainNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from '@react-native-vector-icons/ionicons';

import { DashboardScreen } from '../screens/dashboard/DashboardScreen';
import { AppointmentsScreen } from '../screens/appointments/AppointmentsScreen';
import { CreateAppointmentScreen } from '../screens/appointments/CreateAppointmentScreen';
import { AppointmentDetailScreen } from '../screens/appointments/AppointmentDetailScreen';
import { SettingsScreen } from '../screens/settings/SettingsScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const AppointmentsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="AppointmentsList" 
        component={AppointmentsScreen}
        options={{ title: 'Mis Citas' }}
      />
      <Stack.Screen 
        name="CreateAppointment" 
        component={CreateAppointmentScreen}
        options={{ title: 'Nueva Cita' }}
      />
      <Stack.Screen 
        name="AppointmentDetail" 
        component={AppointmentDetailScreen}
        options={{ title: 'Detalle de Cita' }}
      />
    </Stack.Navigator>
  );
};

export const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Dashboard':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Citas':
              iconName = focused ? 'calendar' : 'calendar-outline';
              break;
            case 'Configuración':
              iconName = focused ? 'settings' : 'settings-outline';
              break;
            default:
              iconName = 'apps';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#0ea5e9',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Citas" component={AppointmentsStack} />
      <Tab.Screen name="Configuración" component={SettingsScreen} />
    </Tab.Navigator>
  );
};