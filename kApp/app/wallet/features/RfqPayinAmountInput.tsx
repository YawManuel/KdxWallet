import React, { useContext } from 'react'
import { RfqContext } from './RfqContext'
import { TBD, convertToBaseUnits, formatUnits, getExchangeRate } from '../currency-utils'
import { View, Text, TextInput, StyleSheet } from 'react-native'

type PayinAmountInputProps = {
  minPayinAmount: number;
  maxPayinAmount: number;
  isAmountValid: boolean;
  validateAmount: (value: string) => void;
  currentPayinAmount: string;
  setCurrentPayinAmount: (value: string) => void;
  currentPayoutAmount: string;
  setCurrentPayoutAmount: (value: string) => void;
}

export function PayinAmountInput(props: PayinAmountInputProps) {
  const { offering } = useContext(RfqContext)

  const payinCurrency = offering.data.payin.currencyCode
  const payoutCurrency = offering.data.payout.currencyCode

  const handlePayinAmountChange = (payinAmount: string) => {
    const formattedPayinAmount = formatUnits(payinAmount, 8)

    props.setCurrentPayinAmount(formattedPayinAmount)
    props.setCurrentPayoutAmount(
      convertToBaseUnits(formattedPayinAmount, offering.data.payoutUnitsPerPayinUnit)
    )
    props.validateAmount(formattedPayinAmount)
  }

  return (
    <View>
      <View style={styles.inputContainer}>
        <Text style={[styles.errorText, { display: props.isAmountValid ? 'none' : 'flex' }]}>
          {props.minPayinAmount >= 0 && parseFloat(props.currentPayinAmount) < props.minPayinAmount
            ? `Minimum order is ${props.minPayinAmount} ${payinCurrency}`
            : props.maxPayinAmount >= 0 && parseFloat(props.currentPayinAmount) > props.maxPayinAmount
            ? `Maximum order is ${props.maxPayinAmount} ${payinCurrency}`
            : null}
        </Text>
        <Text style={styles.label}>You Send</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.textInput}
            placeholder="0.00"
            value={props.currentPayinAmount}
            onChangeText={handlePayinAmountChange}
            autoCompleteType='off'
          />
          <Text style={styles.currencyText}>{payinCurrency}</Text>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>They get</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.textInput}
            placeholder="0.00"
            value={formatUnits(props.currentPayoutAmount, 8)}
            editable={false}
          />
          <Text style={styles.currencyText}>{payoutCurrency}</Text>
        </View>
      </View>

      <View style={styles.rateContainer}>
        <Text style={styles.rateText}>Est. rate</Text>
        <Text style={styles.rateValue}>{getExchangeRate(offering.data.payoutUnitsPerPayinUnit, payinCurrency, payoutCurrency)}</Text>
        <Text style={styles.totalText}>Total</Text>
        <Text style={styles.totalValue}>{props.currentPayinAmount ? `${TBD(props.currentPayinAmount).format()} ${payinCurrency}` : `0.00 ${payinCurrency}`}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    padding: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    position: 'absolute',
    top: -10,
    left: 5,
  },
  label: {
    fontSize: 12,
    color: '#A0AEC0',
    marginBottom: 4,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    fontSize: 24,
    color: '#4F46E5',
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: '#A0AEC0',
    padding: 0,
  },
  currencyText: {
    marginLeft: 5,
    fontSize: 20,
    color: '#A0AEC0',
  },
  rateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    padding: 5,
  },
  rateText: {
    color: '#A0AEC0',
  },
  rateValue: {
    color: '#A0AEC0',
  },
  totalText: {
    color: '#A0AEC0',
    marginTop: 5,
  },
  totalValue: {
    color: '#A0AEC0',
    marginTop: 5,
  },
})
