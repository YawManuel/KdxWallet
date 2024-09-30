import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Exchanges } from './Exchanges';
import { Panel } from '../common/Panel';
import { Offerings } from './Offerings';
import { Credentials } from './Credentials';
import { Balance } from './Balance';
import { ExchangesProvider } from './ExchangesContext';

export function ActivityPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.hiddenTitle}>My tbDEX Wallet</Text>
      <Panel>
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceTitle}>TBDollars Balance</Text>
          <Balance />
        </View>
      </Panel>
      <Panel>
        <Text style={styles.credentialsTitle}>Credentials</Text>
        <Credentials />
      </Panel>
      <ExchangesProvider>
        <Panel>
          <Text style={styles.transactionsTitle}>Transactions</Text>
          <Exchanges />
        </Panel>
        <Panel>
          <View style={styles.offeringsContainer}>
            <Text style={styles.offeringsTitle}>Offerings</Text>
            <Text style={styles.offeringsDescription}>What would you like to exchange TBDollars for?</Text>
          </View>
          <Offerings />
        </Panel>
      </ExchangesProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hiddenTitle: {
    position: 'absolute',
    opacity: 0,
  },
  balanceContainer: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: 10,
  },
  balanceTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#D1D5DB', // equivalent to text-gray-200
  },
  credentialsTitle: {
    marginBottom: 16,
  },
  transactionsTitle: {
    marginBottom: 16,
  },
  offeringsContainer: {
    alignItems: 'center',
  },
  offeringsTitle: {
    paddingTop: 16,
    textAlign: 'center',
  },
  offeringsDescription: {
    paddingBottom: 24,
    textAlign: 'center',
    fontSize: 12,
    color: '#6B7280', // equivalent to text-gray-500
  },
});
