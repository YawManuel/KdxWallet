import { useRecoilState } from 'recoil'
import { balanceState } from '../state'
import { Spinner } from '../common/Spinner'
import { TBD } from '../currency-utils'
import { View, Text } from 'react-native' // Import React Native components

export function Balance() {
  const [accountBalance] = useRecoilState(balanceState)
  
  return (
    <>
      {accountBalance === undefined ? ( 
        <View style={{ marginTop: 16 }}><Spinner /></View> // Use View instead of div
      ) : accountBalance === null ? (
        <View style={{ minWidth: 0, alignItems: 'center' }}> // Use View instead of div
          <Text style={{ fontSize: 12, fontWeight: '500', color: '#FFFFFF', marginTop: 12 }}>Failed to load</Text> // Use Text instead of h3
          <Text style={{ fontSize: 12, color: '#A0A0A0' }}>There was an error trying to load your balance.</Text> // Use Text instead of p
        </View>
      ) : (
        <Text style={{ marginTop: 8, marginBottom: 12, fontSize: 24, fontWeight: '600', color: '#D0D0D0' }}>{TBD(accountBalance).format()}</Text> // Use Text instead of div
      )}
    </>
  )
}