import React, { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, TouchableOpacity } from 'react-native';
import { useColorScheme } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function Profile() {
  const [showAddress, setShowAddress] = useState(false);
  const walletAddress = 'did:tbd:123456789abcdefghi'; // Example address
  const colorScheme = useColorScheme();

  return (
    <ParallaxScrollView
      headerImage={
        <Image
          source={require('@/assets/images/crypto-background.jpg')}
          style={{ width: 1000, height: 600 }}
        />
      }
      headerBackgroundColor={{
        dark: '#000000',
        light: '#ffffff',
      }}
    >
      <ThemedView style={styles.container}>
        <ThemedText style={styles.username}>Emmanuel Hadzah</ThemedText>

        <ThemedView style={styles.addressContainer}>
          <Ionicons name="wallet-outline" size={24} color="#808080" />
          <ThemedText style={styles.addressText}>
            {showAddress ? walletAddress : walletAddress.substring(0, 6) + '...' + walletAddress.slice(-4)}
          </ThemedText>
          <TouchableOpacity onPress={() => setShowAddress(!showAddress)}>
            <Ionicons name={showAddress ? "eye-off-outline" : "eye-outline"} size={24} color="#808080" />
          </TouchableOpacity>
        </ThemedView>

        <ThemedView style={styles.balanceContainer}>
          <ThemedText style={styles.balanceLabel}>Total Balance</ThemedText>
          <ThemedText style={styles.balanceAmount}>$10,234.56</ThemedText>
        </ThemedView>

        <ThemedView style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Ionicons name="arrow-down-outline" size={24} color="#ffffff" />
            <ThemedText style={styles.buttonText}>Receive</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.sendButton]}>
            <Ionicons name="arrow-up-outline" size={24} color="#ffffff" />
            <ThemedText style={styles.buttonText}>Send</ThemedText>
          </TouchableOpacity>
        </ThemedView>

        <Collapsible title="Assets">
          <AssetItem name="Bitcoin" symbol="BTC" amount="0.5" value="15,000" />
          <AssetItem name="Ethereum" symbol="ETH" amount="2.3" value="4,500" />
          <AssetItem name="Cardano" symbol="ADA" amount="1000" value="450" />
        </Collapsible>

        <Collapsible title="Recent Transactions">
          <TransactionItem type="received" amount="0.1 BTC" date="2023-04-15" />
          <TransactionItem type="sent" amount="50 ADA" date="2023-04-14" />
          <TransactionItem type="received" amount="0.5 ETH" date="2023-04-13" />
        </Collapsible>
      </ThemedView>
    </ParallaxScrollView>
  );
}

function AssetItem({ name, symbol, amount, value }: { name: string; symbol: string; amount: string; value: string }) {
  return (
    <ThemedView style={styles.assetItem}>
      <ThemedText style={styles.assetName}>{name} ({symbol})</ThemedText>
      <ThemedView>
        <ThemedText style={styles.assetAmount}>{amount} {symbol}</ThemedText>
        <ThemedText style={styles.assetValue}>${value}</ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

function TransactionItem({ type, amount, date }: { type: 'received' | 'sent', amount: string, date: string }) {
  return (
    <ThemedView style={styles.transactionItem}>
      <Ionicons
        name={type === 'received' ? 'arrow-down-outline' : 'arrow-up-outline'}
        size={24}
        color={type === 'received' ? '#34C759' : '#FF3B30'}
      />
      <ThemedView style={styles.transactionDetails}>
        <ThemedText style={styles.transactionAmount}>{amount}</ThemedText>
        <ThemedText style={styles.transactionDate}>{date}</ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  // ... existing styles ...
  container: {
    padding: 16,
    alignItems: 'center',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  addressText: {
    fontSize: 16,
    marginHorizontal: 8,
  },
  balanceContainer: {
    alignItems: 'center',
    marginTop: 24,
  },
  balanceLabel: {
    fontSize: 16,
    color: '#808080',
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 24,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#34C759',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    marginRight: 0,
    marginLeft: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  assetItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  assetName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  assetAmount: {
    fontSize: 14,
    textAlign: 'right',
  },
  assetValue: {
    fontSize: 14,
    color: '#808080',
    textAlign: 'right',
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  transactionDetails: {
    marginLeft: 12,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  transactionDate: {
    fontSize: 14,
    color: '#808080',
  },
  link: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
  },
  linkText: {
    fontSize: 16,
    marginLeft: 8,
    color: '#007AFF',
  },
});