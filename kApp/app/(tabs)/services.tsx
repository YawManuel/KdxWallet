import React from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const UtilityWidget = ({ title, icon, color, url }) => (
  <TouchableOpacity 
    style={[styles.widget, { backgroundColor: color }]}
    onPress={() => Linking.openURL(url)}
  >
    <Ionicons name={icon} size={24} color="white" />
    <Text style={styles.widgetText}>{title}</Text>
  </TouchableOpacity>
);

const App = () => {
  const utilities = [
    { title: 'Electricity', icon: 'flash', color: '#FFA500', url: 'exp://exp.host/@username/electricity-app' },
    { title: 'Water', icon: 'water', color: '#4169E1', url: 'exp://exp.host/@username/water-app' },
    { title: 'Gas', icon: 'flame', color: '#FF4500', url: 'exp://exp.host/@username/gas-app' },
    { title: 'Internet', icon: 'wifi', color: '#32CD32', url: 'exp://exp.host/@username/internet-app' },
    { title: 'Phone', icon: 'call', color: '#8A2BE2', url: 'exp://exp.host/@username/phone-app' },
    { title: 'TV', icon: 'tv', color: '#FF69B4', url: 'exp://exp.host/@username/tv-app' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Utility Payments</Text>
      <ScrollView contentContainerStyle={styles.widgetContainer}>
        {utilities.map((utility, index) => (
          <UtilityWidget key={index} {...utility} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingTop: 50,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  widgetContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 10,
  },
  widget: {
    width: '45%',
    aspectRatio: 1,
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  widgetText: {
    color: 'white',
    marginTop: 10,
    fontWeight: 'bold',
  },
});

export default App;
