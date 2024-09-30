import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

type CryptoCardProps = {
  name: string;
  symbol: string;
  balance: string;
  value: string;
  icon: string;
  color: string;
  onSend: (symbol: string) => void;
  navigation: any; // Replace 'any' with the appropriate type if known
};

const CryptoCard: React.FC<CryptoCardProps> = ({ name, symbol, balance, value, icon, color, onSend, navigation }) => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      <FontAwesome5 name={icon} size={24} color={color} />
      <Text style={styles.cardTitle}>{name}</Text>
    </View>
    <Text style={styles.balance}>{balance} {symbol}</Text>
    <Text style={styles.value}>${value}</Text>
    <TouchableOpacity 
      style={styles.sendButton} 
      onPress={() => {
        navigation.navigate('wallet');
        onSend(symbol);
      }}
    > 
      <Ionicons name="send-outline" size={18} color="#FFFFFF" />
      <Text style={styles.sendButtonText}>Transact</Text>
    </TouchableOpacity>
  </View>
);

export default function Wallets() {
  const navigation = useNavigation(); // Define navigation
  const cryptos = [
    { name: 'Bitcoin', symbol: 'BTC', balance: '0.5', value: '15,234.56', icon: 'bitcoin', color: "gold" },
    { name: 'USD Coin', symbol: 'USDC', balance: '1,000', value: '1,000.00', icon: 'logo-usd', color: "#FFFFFF" },
    // { name: 'Ethereum', symbol: 'ETH', balance: '1.0', value: '3,000.00', icon: 'ethereum', color: " #497493" }, 
    { name: 'Ghana eCedis', symbol: 'eCEDIS', balance: '2.5', value: '4,567.89', icon: '', color: "#000000" },
    { name: 'e-Naira', symbol: 'cNGN', balance: '50', value: '2,345.67', icon: 'logo-cNGN', color: "#FF0000" }, // Updated Solana to eNaira
    { name: 'Celo Kenya Shilling', symbol: 'cKES', balance: '100', value: '1,234.56', icon: 'logo-cKES', color: "#00FF00" }, // Added Celo Kenya Shilling wallet card
  ];

  const handleSend = (symbol: string) => {
    console.log(`Initiate send transaction for ${symbol}`);
    // Implement your send logic here
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>My Wallets</Text>
      <Text style={styles.totalBalance}>$23,148.12</Text>
      {cryptos.map((crypto, index) => (
        <CryptoCard key={index} {...crypto} onSend={handleSend} navigation={navigation} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  totalBalance: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  balance: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: '#888',
    marginBottom: 12,
  },
  sendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    padding: 8,
    borderRadius: 8,
    justifyContent: 'center',
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginLeft: 4,
  },
});