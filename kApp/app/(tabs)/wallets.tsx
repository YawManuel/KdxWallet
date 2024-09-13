import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const CryptoCard = ({ name, symbol, balance, value, icon, onSend }) => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      <Ionicons name={icon} size={24} color="#4A4A4A" />
      <Text style={styles.cardTitle}>{name}</Text>
    </View>
    <Text style={styles.balance}>{balance} {symbol}</Text>
    <Text style={styles.value}>${value}</Text>
    <TouchableOpacity style={styles.sendButton} onPress={() => onSend(symbol)}>
      <Ionicons name="send-outline" size={18} color="#FFFFFF" />
      <Text style={styles.sendButtonText}>Send</Text>
    </TouchableOpacity>
  </View>
);

export default function Wallets() {
  const cryptos = [
    { name: 'Bitcoin', symbol: 'BTC', balance: '0.5', value: '15,234.56', icon: 'logo-bitcoin' },
    { name: 'USD Coin', symbol: 'USDC', balance: '1,000', value: '1,000.00', icon: 'logo-usd' },
    { name: 'Ethereum', symbol: 'ETH', balance: '2.5', value: '4,567.89', icon: 'logo-ethereum' },
    { name: 'Solana', symbol: 'SOL', balance: '50', value: '2,345.67', icon: 'sunny-outline' },
  ];

  const handleSend = (symbol: string) => {
    console.log(`Initiate send transaction for ${symbol}`);
    // Implement your send logic here
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>My Wallet</Text>
      <Text style={styles.totalBalance}>$23,148.12</Text>
      {cryptos.map((crypto, index) => (
        <CryptoCard key={index} {...crypto} onSend={handleSend} />
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