import { useContext, useState } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { RfqContext } from './RfqContext'
import { NextButton } from '../common/NextButton'

type RecipientPayoutFormProps = {
  schema: {
    required: string[],
    properties: {
      address?: { title: string },
      accountNumber?: { title: string },
      bankName?: { title: string },
      phoneNumber?: { title: string },
      networkProvider?: { title: string },
    }
  },
  onBack: () => void,
  onNext: () => void
}

export function RfqAddressPage(props: RecipientPayoutFormProps) {
  const { setPaymentDetails } = useContext(RfqContext)
  const [recipientPayoutForm, setRecipientPayoutForm] = useState({})
  const [hasAttemptedNext, setHasAttemptedNext] = useState(false)

  // Checks if all required properties are filled in the form
  const isInvalidPayoutDetails = props.schema.required.some(requiredProperty => !recipientPayoutForm[requiredProperty])

  const handleNext = () => {
    setHasAttemptedNext(true)
    if (!isInvalidPayoutDetails) {
      setPaymentDetails(recipientPayoutForm)
      props.onNext()
    }
  }

  const handleInputChange = (field, value) => {
    setRecipientPayoutForm(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <View style={styles.container}>
      <Text style={styles.instruction}>Make sure the information is correct.</Text>
      {props.schema.properties.address && (
        <>
          <Text style={styles.label}>Bitcoin Wallet Address</Text>
          <TextInput
            style={styles.input}
            placeholder={props.schema.properties.address.title}
            onChangeText={(value) => handleInputChange('address', value)}
            autoCompleteType='off'
          />
        </>
      )}
      {props.schema.properties.accountNumber && (
        <>
          <Text style={styles.label}>Account Number</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder={props.schema.properties.accountNumber.title}
            onChangeText={(value) => handleInputChange('accountNumber', value.replace(/[^0-9]/g, ''))}
            autoCompleteType='off'
          />
        </>
      )}
      {props.schema.properties.bankName && (
        <>
          <Text style={styles.label}>Bank Name</Text>
          <TextInput
            style={styles.input}
            placeholder={props.schema.properties.bankName.title}
            onChangeText={(value) => handleInputChange('bankName', value)}
            autoCompleteType='off'
          />
        </>
      )}
      {props.schema.properties.phoneNumber && (
        <>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            keyboardType="phone-pad"
            placeholder={props.schema.properties.phoneNumber.title}
            onChangeText={(value) => handleInputChange('phoneNumber', value.replace(/[^0-9]/g, ''))}
            autoCompleteType='off'
          />
        </>
      )}
      {props.schema.properties.networkProvider && (
        <>
          <Text style={styles.label}>Network Provider</Text>
          <TextInput
            style={styles.input}
            placeholder={props.schema.properties.networkProvider.title}
            onChangeText={(value) => handleInputChange('networkProvider', value)}
            autoCompleteType='off'
          />
        </>
      )}
      <View style={styles.buttonContainer}>
        {isInvalidPayoutDetails && hasAttemptedNext && (
          <Text style={styles.errorText}>Improper payout details</Text>
        )}
        <NextButton disabled={isInvalidPayoutDetails} onNext={handleNext} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  instruction: {
    fontSize: 12,
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 12,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
  },
})
