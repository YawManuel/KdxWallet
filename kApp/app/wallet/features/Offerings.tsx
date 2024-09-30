import React, { useState, useEffect, useRef } from 'react'
import { View, Text, Button, FlatList, Modal, Image, ActivityIndicator } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons' // Add this line
import { RfqModal } from './RfqModal'
import { RfqProvider } from './RfqContext'
import { fetchOfferings } from '../api-utils'
// import bitcoinIcon from '../assets/bitcoin.png' // Use .png for React Native
import { Offering } from '@tbdex/http-client'
import { pfiAllowlist } from '../workshop/allowlist' // Changed from .ts to .js

export function Offerings() {
  const [offerings, setOfferings] = useState<Offering[]>(undefined)
  const [selectedOffering, setSelectedOffering] = useState<string | undefined>()
  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    const init = async () => {
      try {
        const fetchedOfferings: Offering[][] = []
        for (const pfi of pfiAllowlist) {
          const offering = await fetchOfferings(pfi.pfiUri)
          fetchedOfferings.push(offering)
        }
        setOfferings(fetchedOfferings.flatMap(offering => offering))
      } catch (e) {
        setOfferings(null)
      }
    }
    init()
  }, [])

  const handleModalOpen = (offering) => {
    setSelectedOffering(offering)
    setModalVisible(true)
  }

  const handleModalClose = () => {
    setSelectedOffering(undefined)
    setModalVisible(false)
  }

  if (offerings === undefined) return <ActivityIndicator />

  if (offerings === null) {
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>Failed to load</Text>
        <Text>There was an error trying to load offerings.</Text>
      </View>
    )
  }

  return (
    <>
      {offerings.length === 0 ? (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text>No offerings found</Text>
          <Text>Check back later.</Text>
        </View>
      ) : (
        <FlatList
          data={offerings}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={{ padding: 10 }}>
              <Button
                title={item.data.description}
                onPress={() => handleModalOpen(item)}
              />
              <Image
                source={bitcoinIcon}
                style={{ width: 32, height: 32 }}
              />
              <Text>{pfiAllowlist.find(pfi => pfi.pfiUri === item.metadata.from).pfiName}</Text>
              <Text>{item.data.payoutUnitsPerPayinUnit} {item.data.payout.currencyCode} for 1 {item.data.payin.currencyCode}</Text>
              <MaterialIcons name="chevron-right" size={24} color="black" />
            </View>
          )}
        />
      )}

      <Modal visible={modalVisible} onRequestClose={handleModalClose}>
        {selectedOffering && (
          <RfqProvider offering={selectedOffering}>
            <RfqModal onClose={handleModalClose} />
          </RfqProvider>
        )}
      </Modal>
    </>
  )
}
