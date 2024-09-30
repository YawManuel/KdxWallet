import React, { useContext, useState } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { PayinAmountInput } from './RfqPayinAmountInput'
import { RfqContext } from './RfqContext'
import { TBD } from '../currency-utils'
import { useRecoilState } from 'recoil'
import { balanceState } from '../state'
import { isMatchingOffering } from '../api-utils'
import { credentialsState } from '../state'

type SetQuoteAmountFormProps = {
  onNext: () => void;
}

export function PayinPage(props: SetQuoteAmountFormProps) {
  const { offering, payinAmount, setPayinAmount, payoutAmount, setPayoutAmount } = useContext(RfqContext)
  const [currentPayoutAmount, setCurrentPayoutAmount] = useState(payoutAmount)
  const [currentPayinAmount, setCurrentPayinAmount] = useState(payinAmount)
  const [hasAttemptedNext, setHasAttemptedNext] = useState(false)
  const [accountBalance] = useRecoilState(balanceState)
  const [credentials] = useRecoilState(credentialsState)

  const needsCredential = !isMatchingOffering(offering, credentials)

  const minPayinAmount = offering.data.payin.min ? TBD(offering.data.payin.min).value : 0.01
  const maxPayinAmount = offering.data.payin.max ? TBD(offering.data.payin.max).value : accountBalance || 5

  const isWithinMinMax = (amount: string, minQuoteAmount: number, maxQuoteAmount: number) => {
    const parsedAmount = parseFloat(amount)
    if (minQuoteAmount < 0 && maxQuoteAmount < 0) return true
    return (minQuoteAmount < 0 || parsedAmount >= minQuoteAmount) && (maxQuoteAmount < 0 || parsedAmount <= maxQuoteAmount)
  }
  
  const [isAmountValid, setIsAmountValid] = useState(isWithinMinMax(currentPayinAmount, minPayinAmount, maxPayinAmount))

  const validateAmount = (amount: string) => {
    setIsAmountValid(isWithinMinMax(amount, minPayinAmount, maxPayinAmount))
  }

  const handleNext = () => {
    setHasAttemptedNext(true)
    if (isNaN(parseFloat(currentPayoutAmount))) return

    if (isAmountValid) {
      setPayoutAmount(currentPayoutAmount)
      setPayinAmount(currentPayinAmount)
      props.onNext()
    }
  }

  const handleCredentialRequest = () => {
    console.log('requesting credential')
    // Navigate to credential request screen (implement navigation as needed)
  }

  return (
    <View style={styles.container}>
      <PayinAmountInput
        minPayinAmount={minPayinAmount}
        maxPayinAmount={maxPayinAmount}
        isAmountValid={isAmountValid}
        validateAmount={validateAmount}
        currentPayinAmount={currentPayinAmount}
        setCurrentPayinAmount={setCurrentPayinAmount}
        currentPayoutAmount={currentPayoutAmount}
        setCurrentPayoutAmount={setCurrentPayoutAmount}
      />

      <View style={styles.buttonContainer}>
        {(currentPayoutAmount === '' && hasAttemptedNext) && (
          <Text style={styles.errorText}>Enter an amount in {offering.data.payin.currencyCode}</Text>
        )}
        {needsCredential && (
          <>
            <Text style={styles.errorText}>Credential missing</Text>
            <Button title="Verify Identity" onPress={handleCredentialRequest} />
          </>
        )}
        <Button title="Next" onPress={handleNext} disabled={needsCredential} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
})
