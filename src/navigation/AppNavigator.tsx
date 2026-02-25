import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import ProgressScreen from '../screens/ProgressScreen';
import QuizScreen from '../screens/QuizScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { useAppStore } from '../store/useAppStore';
import { lightTheme, darkTheme } from '../theme/theme';

const Tab = createBottomTabNavigator();

const TabIcon = ({ label, focused, color }: { label: string; focused: boolean; color: string }) => (
  <Text style={{ fontSize: focused ? 24 : 20 }}>{label}</Text>
);

export default function AppNavigator() {
  const darkMode = useAppStore((s) => s.darkMode);
  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.card },
        headerTintColor: theme.text,
        headerTitleStyle: { fontWeight: '700' },
        tabBarStyle: { backgroundColor: theme.card, borderTopColor: theme.border },
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textSecondary,
      }}
    >
      <Tab.Screen
        name="Today"
        component={HomeScreen}
        options={{
          headerTitle: 'Java Quest',
          tabBarIcon: ({ focused, color }) => <TabIcon label="📋" focused={focused} color={color} />,
        }}
      />
      <Tab.Screen
        name="Progress"
        component={ProgressScreen}
        options={{
          tabBarIcon: ({ focused, color }) => <TabIcon label="📊" focused={focused} color={color} />,
        }}
      />
      <Tab.Screen
        name="Quiz"
        component={QuizScreen}
        options={{
          headerTitle: 'Daily Quiz',
          tabBarIcon: ({ focused, color }) => <TabIcon label="🧠" focused={focused} color={color} />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ focused, color }) => <TabIcon label="⚙️" focused={focused} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
