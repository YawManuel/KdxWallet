import { ActivityIndicator, View, StyleSheet } from 'react-native';

/**
 * Spinner Component
 *
 * This component renders a spinning loading spinner.
 *
 * @returns {JSX.Element} - Returns a spinning loading indicator.
 */
export function Spinner() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#4F8EF7" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});