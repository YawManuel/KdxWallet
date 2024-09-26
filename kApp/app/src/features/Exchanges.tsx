import React, { useState, useEffect, useRef, useContext } from 'react'
import { View, Text, ActivityIndicator, Modal, StyleSheet } from 'react-native'
import { Toast } from 'react-native-toast-message'
import { fetchExchanges } from '../api-utils'
import { useRecoilState } from 'recoil'
import { didState } from '../state'
import { BearerDid } from '@web5/dids'
import { Exchange } from '@tbdex/http-client'
import { ExchangesContext } from './ExchangesContext'
import { pfiAllowlist } from '../workshop/allowlist'
import ExchangeItem from './ExchangeItem'
import ExchangeModal from './ExchangeModal'

async function loadExchanges(did: BearerDid): Promise<Exchange[]> {
  const fetchedExchanges = []
  const pfis = pfiAllowlist.map(item => item.pfiUri)
  for (const pfiUri of pfis) {
    try {
      const exchanges = await fetchExchanges({ didState: did, pfiUri })
      fetchedExchanges.push(exchanges)
      console.log('fetched exchanges', fetchedExchanges)
    } catch (e) {
      console.error(e)
      throw Error(e)
    }
  }
  return fetchedExchanges.flatMap(exchanges => exchanges)
}

export function Exchanges() {
  const { exchangesUpdated, setExchangesUpdated } = useContext(ExchangesContext)
  const [exchanges, setExchanges] = useState<Exchange[]>([])
  const [selectedExchange, setSelectedExchange] = useState<Exchange | null>(null)
  const [did] = useRecoilState(didState)
  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    const init = async () => {
      try {
        const exchanges = await loadExchanges(did)
        setExchanges(exchanges)
      } catch (e) {
        setExchanges(null)
        throw Error(e)
      }
    }
    if (exchangesUpdated) {
      init()
      setExchangesUpdated(false)
    }
  }, [exchangesUpdated])

  useEffect(() => {
    const init = async () => {
      try {
        const exchanges = await loadExchanges(did)
        setExchanges(exchanges)
      } catch (e) {
        setExchanges(null)
        throw Error(e)
      }
    }
    if (did) {
      init()
      const pollIntervalId = setInterval(init, 2000)
      return () => clearInterval(pollIntervalId)
    }
  }, [did])

  const handleModalOpen = (exchange) => {
    setSelectedExchange(exchange)
    setModalVisible(true)
  }
  const handleModalClose = () => {
    setSelectedExchange(null)
    setModalVisible(false)
  }

  if (exchanges.length === 0) {
    return <ActivityIndicator size="large" color="#0000ff" />
  }

  return (
    <View style={styles.container}>
      <Toast />
      <View style={styles.header}>
        <Text style={styles.headerText}>Transaction</Text>
        <Text style={styles.headerText}>Amount</Text>
      </View>
      {exchanges.length === 0 ? (
        <Text>No transactions found</Text>
      ) : (
        exchanges.map((exchange, index) => (
          <ExchangeItem key={index} exchange={exchange} handleStatusModalOpen={handleModalOpen} />
        )).reverse()
      )}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            {selectedExchange && (
              <ExchangeModal exchange={selectedExchange} onClose={handleModalClose} />
            )}
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
})
