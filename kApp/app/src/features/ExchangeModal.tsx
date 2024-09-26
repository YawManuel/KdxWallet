import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { renderActionButtons, renderStatusInfo } from './ExchangeModalUtils'
import { money, BTC, removeTrailingZeros } from '../currency-utils'
import { type ClientExchange } from '../api-utils'
import { useRecoilState } from 'recoil'
import { didState } from '../state'
import { pfiAllowlist } from '../workshop/allowlist'

type ExchangeModalProps = {
  exchange: ClientExchange
  onClose: (hasSubmitted: boolean) => void
}

export function ExchangeModal(props: ExchangeModalProps) {
  dayjs.extend(relativeTime)
  const [did] = useRecoilState(didState)

  return (
    <View style={{ position: 'relative', borderRadius: 10, backgroundColor: '#1F2937', paddingBottom: 16, paddingTop: 20, width: 320 }}>
      <TouchableOpacity style={{ position: 'absolute', top: 20, right: 20 }} onPress={() => { props.onClose(true) }}>
        <Text style={{ color: 'white' }}>X</Text>
      </TouchableOpacity>
      <View style={{ alignItems: 'center', padding: 32 }}>
        <View style={{ justifyContent: 'center', alignItems: 'center', width: 48, height: 48, borderRadius: 24, backgroundColor: '#4F46E5', marginBottom: 16 }}>
          <Text style={{ color: 'white', fontSize: 14 }}> $ </Text>
        </View>
        <Text style={{ fontSize: 12, color: '#E5E7EB' }}>
          { pfiAllowlist.find(pfi => pfi.pfiUri === props.exchange.pfiDid)?.pfiName }
        </Text>
        {props.exchange.payinCurrency && props.exchange.payoutCurrency &&
          <Text style={{ fontSize: 12, color: '#9CA3AF', marginTop: 4 }}>Exchange from {props.exchange.payinCurrency} to {props.exchange.payoutCurrency}</Text>
        }
        <Text style={{ marginTop: 32, marginBottom: 4, fontSize: 24, fontWeight: '600', color: '#E5E7EB' }}>
          {money(props.exchange.payinAmount).format()} {props.exchange.payinCurrency}
        </Text>
        <Text style={{ fontSize: 12, color: '#9CA3AF', marginBottom: 12 }}>{dayjs(props.exchange.createdTime).format('MMM D [at] h:mm A')}</Text>

        {renderStatusInfo(props.exchange.status)}

        <View style={{ width: '100%', marginTop: 24, paddingHorizontal: 20 }}>
          <View style={{ flexDirection: 'row', marginBottom: 8 }}>
            <Text style={{ width: '50%', textAlign: 'left', color: '#6B7280' }}>Amount</Text>
            <Text style={{ width: '50%', textAlign: 'right' }}>{removeTrailingZeros(BTC(props.exchange.payoutAmount).format())} {props.exchange.payoutCurrency}</Text>
          </View>
          <View style={{ flexDirection: 'row', marginBottom: 8 }}>
            <Text style={{ width: '50%', textAlign: 'left', color: '#6B7280' }}>To</Text>
            <Text style={{ width: '50%', textAlign: 'right', flexWrap: 'wrap' }}>{props.exchange.to}</Text>
          </View>
          <View style={{ flexDirection: 'row', marginBottom: 8 }}>
            <Text style={{ width: '50%', textAlign: 'left', color: '#6B7280' }}>From</Text>
            <Text style={{ width: '50%', textAlign: 'right', flexWrap: 'wrap' }}>{props.exchange.from}</Text>
          </View>
          {props.exchange.status === 'quote' && props.exchange.expirationTime && (
            <View style={{ flexDirection: 'row', marginBottom: 8 }}>
              <Text style={{ width: '50%', textAlign: 'left', color: '#6B7280' }}>Expires in</Text>
              <Text style={{ width: '50%', textAlign: 'right' }}>{dayjs(props.exchange.expirationTime).fromNow(true)}</Text>
            </View>
          )}
        </View>
      </View>

      {props.exchange.status === 'quote' && renderActionButtons(props.exchange.payinAmount, props.exchange.payinCurrency, props.exchange.id, props.onClose, did, props.exchange.pfiDid )}
    </View>
  )
}
