// import { CheckCircle, QuestionMarkCircle, EllipsisHorizontal, XCircle } from '@expo/vector-icons'
import { TBD } from '../currency-utils'
import { useContext, useState } from 'react'
import { addClose, addOrder } from '../workshop/messageUtils'
import { useRecoilState } from 'recoil'
import { balanceState } from '../state'
import { ExchangesContext } from './ExchangesContext'
import { Spinner } from '../common/Spinner'
import { View, Text, TouchableOpacity } from 'react-native' // Import React Native components

export const renderActionButtons = (amount, payInCurrency, exchangeId, onClose, didState, pfiUri) => {
  const { setExchangesUpdated } = useContext(ExchangesContext)
  const [isUpdating, setIsUpdating] = useState(false)
  const [accountBalance, setAccountBalance] = useRecoilState(balanceState)

  const handleUpdateExchange = async (action) => {
    if (action === 'accept') {
      setIsUpdating(true)
      try {
        await addOrder({ exchangeId, didState, pfiUri })
        if(payInCurrency === 'TBD') setAccountBalance(accountBalance - Number(amount))
        setExchangesUpdated(true)
      } catch (e) {
        setIsUpdating(false)
        console.error(e)
        return
      }
      setIsUpdating(false)
    }
    if (action === 'reject') {
      setIsUpdating(true)
      try {
        await addClose({ exchangeId, didState, pfiUri, reason: 'user cancelled' })
        setExchangesUpdated(true)
      } catch (e) {
        setIsUpdating(false)
        console.error(e)
        return
      }
      setIsUpdating(false)
    }
    onClose(true)
  }

  return (
      isUpdating ?
        <View style={{ margin: 8, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <Spinner />
        </View>
      : <View style={{ margin: 8, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
          <TouchableOpacity
            onPress={() => handleUpdateExchange('reject')}
            disabled={isUpdating}
          >
            <Text style={{ fontSize: 14, fontWeight: '600', color: 'white' }}>Reject</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleUpdateExchange('accept')}
            disabled={isUpdating}
            style={{ backgroundColor: '#4F46E5', padding: 8, borderRadius: 4, marginLeft: 8 }}
          >
            <Text style={{ fontSize: 14, fontWeight: '600', color: 'white' }}>Pay {TBD(amount).format()}</Text>
          </TouchableOpacity>
        </View>
  )
}

export const renderStatusInfo = (status) => {
    return (
      <View style={{ marginTop: 12, alignItems: 'center' }}>
        <View style={{ width: 20, height: 20, backgroundColor: 'white', borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
          {getStatusIcon(status)}
        </View>
        <Text style={{ marginTop: 8, color: 'white', fontWeight: '500' }}>
          {getStatusText(status)}
        </Text>
      </View>
    )
}

const getStatusIcon = (status) => {
  switch (status) {
    case 'rfq':
    case 'quote':
    case 'order':
    case 'orderstatus':
      return <EllipsisHorizontal className="absolute h-7 w-7 text-gray-500" />
    case 'completed':
      return <CheckCircle className="absolute h-7 w-7 text-green-500" />
    case 'failed':
    case 'expired':
      return <XCircle className="absolute h-7 w-7 text-red-600" />
    default:
      return <QuestionMarkCircle className="absolute h-7 w-7 text-gray-500" />
  }
}

const getStatusText = (status) => {
  switch (status) {
    case 'rfq':
      return 'Requested'
    case 'quote':
      return 'Quoted'
    case 'order':
    case 'orderstatus':
      return 'Pending'
    case 'completed':
      return 'Completed'
    case 'expired':
      return 'Expired'
    case 'cancelled':
      return 'Cancelled'
    case 'failed':
      return 'Failed'
    default:
      return status
  }
}
