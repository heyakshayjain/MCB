import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, School, Award, FileText, Calendar, Globe, User, MessageCircle, Bot } from 'lucide-react-native';

import DashboardScreen from '../screens/DashboardScreen';
import SchoolsScreen from '../screens/SchoolsScreen';
import CareerScreen from '../screens/CareerScreen';
import DocumentsScreen from '../screens/DocumentsScreen';
import DeadlinesScreen from '../screens/DeadlinesScreen';
import PremiumBrowserScreen from '../screens/PremiumBrowserScreen';
import AccountScreen from '../screens/AccountScreen';
import GuidanceScreen from '../screens/GuidanceScreen';
import LoginScreen from '../screens/LoginScreen';
import ApplicationAssistantScreen from '../screens/ApplicationAssistantScreen';
import { useAuth } from '../context/AuthContext';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const RootStack = createNativeStackNavigator();

// Stack navigator for More/Account section
function MoreStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AccountMain" component={AccountScreen} />
      <Stack.Screen name="Documents" component={DocumentsScreen} />
      <Stack.Screen name="Career" component={CareerScreen} />
      <Stack.Screen name="Deadlines" component={DeadlinesScreen} />
      <Stack.Screen name="Browser" component={PremiumBrowserScreen} />
    </Stack.Navigator>
  );
}

// Main Tab Navigator
function MainTabs() {
  const screenOptions = {
    headerShown: false,
    tabBarActiveTintColor: '#007AFF',
    tabBarInactiveTintColor: '#8E8E93',
    tabBarStyle: {
      backgroundColor: '#FFFFFF',
      borderTopWidth: 0.5,
      borderTopColor: '#C6C6C8',
      paddingBottom: 24,
      paddingTop: 8,
      height: 83,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -0.5 },
      shadowOpacity: 0.1,
      shadowRadius: 0,
    },
    tabBarLabelStyle: {
      fontSize: 10,
      fontWeight: '500' as '500',
      marginTop: 2,
    },
    tabBarIconStyle: {
      marginTop: 0,
    },
  };

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => <Home size={24} color={String(color)} />,
        }}
      />
      <Tab.Screen
        name="Schools"
        component={SchoolsScreen}
        options={{
          tabBarLabel: 'Schools',
          tabBarIcon: ({ color, size }) => <School size={24} color={String(color)} />,
        }}
      />
      <Tab.Screen
        name="Apply"
        component={ApplicationAssistantScreen}
        options={{
          tabBarLabel: 'Apply',
          tabBarIcon: ({ color, size }) => <FileText size={24} color={String(color)} />,
        }}
      />
      <Tab.Screen
        name="Guidance"
        component={GuidanceScreen}
        options={{
          tabBarLabel: 'Guidance',
          tabBarIcon: ({ color, size }) => <MessageCircle size={24} color={String(color)} />,
        }}
      />
      <Tab.Screen
        name="Account"
        component={MoreStack}
        options={{
          tabBarLabel: 'More',
          tabBarIcon: ({ color, size }) => <User size={24} color={String(color)} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F2F2F7' }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <RootStack.Screen name="Main" component={MainTabs} />
        ) : (
          <RootStack.Screen name="Login" component={LoginScreen} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
