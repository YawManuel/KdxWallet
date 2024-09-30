import React, { useRef } from 'react'
import { View, TextInput, Button, StyleSheet } from 'react-native'
import { useRecoilState } from 'recoil'
import { didState, credentialsState } from '../state'
import { requestCredentialFromIssuer } from '../api-utils'
import { useNavigation } from '@react-navigation/native'

export function GetCredentialPage() {
  const navigation = useNavigation()
  const [did] = useRecoilState(didState)
  const [credentials, setCredentials] = useRecoilState(credentialsState)

  const customerNameRef = useRef(null)
  const countryCodeRef = useRef(null)

  const getCredentials = async () => {
    const customerName = customerNameRef.current.value
    const countryCode = countryCodeRef.current.value
    const credential = await requestCredentialFromIssuer(did.uri, customerName, countryCode)
    setCredentials([...credentials, credential])
    navigation.navigate('Home') // Adjust the route name as necessary
  }

  return (
    <View style={styles.container}>
      <TextInput
        ref={customerNameRef}
        style={styles.input}
        placeholder="Name (eg. John Doe)"
        maxLength={20}
        autoCompleteType='off'
      />
      <TextInput
        ref={countryCodeRef}
        style={styles.input}
        placeholder="Country code (eg. GH)"
        maxLength={2}
        autoCompleteType='off'
      />
      <Button title="Get Credentials" onPress={getCredentials} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    backgroundColor: '#333',
    color: 'white',
  },
})