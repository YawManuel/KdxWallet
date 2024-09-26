import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { ArrowLeftIcon } from '@heroicons/react/24/outline'; // Ensure this icon is compatible with React Native

/**
 * BackButton Component
 *
 * This component is a reusable button for navigating back to the previous page or view.
 *
 * @param {Object} props - The props for the BackButton component.
 * @param {Function} onBack - A callback function used to trigger a return to previous screen.
 * @returns {JSX.Element} - Returns a button with a left arrow icon for navigating back.
 */
export function BackButton({ onBack }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onBack}>
      <ArrowLeftIcon style={styles.icon} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: 20, // Adjusted for React Native
    left: 20, // Adjusted for React Native
    // Additional styles can be added here
  },
  icon: {
    height: 25, // Adjusted for React Native
    width: 25, // Adjusted for React Native
    color: 'white', // Adjusted for React Native
  },
});