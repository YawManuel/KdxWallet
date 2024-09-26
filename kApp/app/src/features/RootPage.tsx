import { Outlet } from 'react-router-native' // Change import for React Native
import { View } from 'react-native' // Import View from react-native

export function RootPage() {
  return (
    <View style={{ paddingVertical: 10 }}> // Use View instead of main
        <Outlet />
    </View>
  )
}
