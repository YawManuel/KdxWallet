import React, { useContext, useState } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { RfqContext } from './RfqContext'
import { formatUnits, money } from '../currency-utils'
import { Spinner } from '../common/Spinner'

type ReviewPageProps = {
  onSubmit: () => void;
  onBack: () => void;
}

export function ReviewPage(props: ReviewPageProps) {
  const {
    offering,
    payinAmount,
    payoutAmount,
    paymentDetails
  } = useContext(RfqContext)

  const payinCurrency = offering?.data.payin.currencyCode
  const payoutCurrency = offering?.data.payout.currencyCode
  const payinUnits = money(payinAmount).format()
  const payoutUnits = formatUnits(payoutAmount, 8)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = () => {
    setIsSubmitting(true)
    props.onSubmit()
  }

  const getPaymentDetailsDisplay = () => {
    const details = []
    if (paymentDetails?.address) details.push(`${paymentDetails.address}`)
    if (paymentDetails?.accountNumber) details.push(`Account Number: ${paymentDetails.accountNumber}`)
    if (paymentDetails?.bankName) details.push(`Bank Name: ${paymentDetails.bankName}`)
    if (paymentDetails?.phoneNumber) details.push(`Phone Number: ${paymentDetails.phoneNumber}`)
    if (paymentDetails?.networkProvider) details.push(`Network Provider: ${paymentDetails.networkProvider}`)

    return details.length > 0 ? details.join(', ') : 'No payment details provided'
  }

  return (
    <View style={styles.container}>
      <Text style={styles.instructionText}>Make sure to check the amount and delivery info before sending.</Text>

      <View style={styles.amountContainer}>
        <Text style={styles.amountText}>{payinUnits} {payinCurrency}</Text>
        <Text style={styles.labelText}>Transfer amount</Text>
      </View>
      <View style={styles.amountContainer}>
        <Text style={styles.amountText}>{payoutUnits} {payoutCurrency}</Text>
        <Text style={styles.labelText}>Total to you</Text>
      </View>

      <View style={styles.paymentDetailsContainer}>
        <Text style={styles.methodText}>{offering.data.payout.methods[0].kind}</Text>
        <Text style={styles.detailsText}>{getPaymentDetailsDisplay()}</Text>
      </View>

      <View style={styles.buttonContainer}>
        {isSubmitting ? (
          <Spinner />
        ) : (
          <Button
            title="Request"
            onPress={handleSubmit}
            color="#4F46E5" // Indigo color
          />
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  instructionText: {
    fontSize: 12,
    marginTop: 8,
  },
  amountContainer: {
    marginTop: 24,
    color: 'gray',
  },
  amountText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  labelText: {
    fontSize: 12,
    marginTop: 4,
  },
  paymentDetailsContainer: {
    marginTop: 16,
    color: 'gray',
  },
  methodText: {
    fontSize: 12,
    color: 'white',
  },
  detailsText: {
    fontSize: 12,
    marginTop: 4,
  },
  buttonContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
})
