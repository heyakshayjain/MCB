import React from 'react';
import { View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Minimal test app to isolate the issue
export default function TestApp() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' as 'bold' }}>MCB Mobile Test</Text>
      <Text style={{ fontSize: 16, color: '#6B7280', marginTop: 8 }}>If you see this, basic rendering works</Text>
      <StatusBar style="dark" />
    </View>
  );
}
