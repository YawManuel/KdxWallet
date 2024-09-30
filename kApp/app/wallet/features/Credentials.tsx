import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useRecoilState } from 'recoil'
import { renderCredential } from '../api-utils'
import { credentialsState } from '../state'

export function Credentials() {
  const [credentials] = useRecoilState(credentialsState)

  return (
    <View style={styles.container}>
      {credentials && credentials.map((credential, ind) => {
        const renderedCredential = renderCredential(credential)
        return (
          <View key={ind} style={styles.credentialCard}>
            <Text style={styles.title}>{renderedCredential.title}</Text>
            <Text style={styles.issued}>Issued: {renderedCredential.issuanceDate}</Text>
            <Text style={styles.country}>Country: {renderedCredential.countryCode}</Text>
          </View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  credentialCard: {
    maxWidth: '25%',
    minWidth: 'fit-content',
    borderRadius: 10,
    backgroundColor: '#4F46E5', // bg-indigo-600
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  title: {
    marginTop: 5,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E5E7EB', // text-gray-200
  },
  issued: {
    marginTop: 5,
    marginBottom: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#E5E7EB', // text-gray-200
  },
  country: {
    marginTop: 5,
    marginBottom: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#E5E7EB', // text-gray-200
  },
})