import { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native' // Updated imports
import { money, removeTrailingZeros, BTC } from '../currency-utils'
// import { toast } from 'react-toastify' // Consider using a React Native compatible toast library
import dayjs from 'dayjs'
import 'dayjs/locale/en'
import { type ClientExchange } from '../api-utils'

type ExchangeItemProps = {
  exchange: ClientExchange;
  handleStatusModalOpen: (exchange: ClientExchange) => void
}

/**
 * This component represents an individual item in a list of exchanges.
 *
 * @param {Object} props.exchange - The exchange object.
 * @param {Function} props.handleStatusModalOpen - A function to handle opening a status modal for the exchange.
 * @returns {JSX.Element} - Returns an individual exchange item component.
 */
export function ExchangeItem(props: ExchangeItemProps) {
  const [statusValue, setStatusValue] = useState(null)
  dayjs.locale('en')

  useEffect(() => {
    if (statusValue) {
      // Update toast notification for React Native
      // toast(getStatusString(props.exchange), { ... })
    }
    setStatusValue(props.exchange.status)
  }, [props.exchange.status])

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => props.handleStatusModalOpen(props.exchange)}>
        <View style={styles.innerContainer}>
          <View style={styles.iconContainer}>
            <Text style={styles.iconText}>$</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.statusText}>{getStatusString(props.exchange)}</Text>
          </View>
        </View>
        { props.exchange.status === 'quote' ? (
          <View style={styles.reviewContainer}>
            <Text style={styles.reviewText}>Review</Text>
          </View>
        ) : props.exchange.status === 'completed' || props.exchange.status === 'orderstatus' ? (
          <Text style={styles.amountText}>
            {removeTrailingZeros(BTC(props.exchange.payoutAmount).format())} {props.exchange.payoutCurrency}
          </Text>
        ) : (
          <Text style={styles.emptyText}></Text>
        )}
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { paddingVertical: 8 },
  button: { flexDirection: 'row', padding: 10, borderRadius: 8, backgroundColor: '#f0f0f0' },
  innerContainer: { flexDirection: 'row', flexGrow: 1 },
  iconContainer: { justifyContent: 'center', alignItems: 'center', width: 32, height: 32, borderRadius: 16, backgroundColor: '#4f46e5' },
  iconText: { color: 'white', fontSize: 16, fontWeight: '600' },
  textContainer: { flex: 1, paddingLeft: 10 },
  statusText: { fontSize: 12, color: '#6b7280' },
  reviewContainer: { justifyContent: 'center', alignItems: 'flex-end', width: '20%' },
  reviewText: { backgroundColor: '#374151', color: 'white', padding: 5, borderRadius: 5, fontSize: 10 },
  amountText: { fontSize: 12, fontWeight: '500', color: '#6b7280', textAlign: 'right' },
  emptyText: { width: '20%' },
})

const getStatusString = (exchange) => {
  switch (exchange.status) {
    case 'rfq':
      return `Requested ${money(exchange.payinAmount).format()} ${exchange.payinCurrency}`
    case 'quote':
      return `Quoted ${money(exchange.payinAmount).format()} ${exchange.payinCurrency}`
    case 'order':
      return `Payment for ${money(exchange.payinAmount).format()} ${exchange.payinCurrency} submitted`
    case 'orderstatus':
      return `Payment processing for ${money(exchange.payinAmount).format()} ${exchange.payinCurrency}...`
    case 'completed':
      return `Sent ${money(exchange.payinAmount).format()} ${exchange.payinCurrency}`
    case 'expired':
      return `Quote for ${money(exchange.payinAmount).format()} ${exchange.payinCurrency} expired`
    case 'cancelled':
      return `Exchange for ${money(exchange.payinAmount).format()} ${exchange.payinCurrency} was cancelled`
    case 'failed':
      return `Payment for ${money(exchange.payinAmount).format()} ${exchange.payinCurrency} failed`
    default:
      return exchange.status
  }
}
