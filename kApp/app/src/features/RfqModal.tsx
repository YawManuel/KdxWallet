import { useState, useContext } from 'react'
import { RfqContext } from './RfqContext'
import { RfqFormIds, getRfqForms } from './RfqForms'
import { BackButton } from '../common/BackButton'
import { Panel } from '../common/Panel'
import { createExchange } from '../workshop/messageUtils'
import '../styles/date.css'
import { useRecoilState } from 'recoil'
import { credentialsState, didState } from '../state'
import { ExchangesContext } from './ExchangesContext'
import { pfiAllowlist } from '../workshop/allowlist'
import { PresentationExchange } from '@web5/credentials'
import { View, Text, StyleSheet } from 'react-native' // Updated imports

type RfqModalProps = {
  onClose: () => void;
}
export function RfqModal(props: RfqModalProps) {
  const { setExchangesUpdated } = useContext(ExchangesContext)
  const [step, setStep] = useState(0)
  const { offering, payinAmount, paymentDetails } = useContext(RfqContext)
  const [credentials] = useRecoilState(credentialsState)
  const [did] = useRecoilState(didState)

  // TODO 3: Choose only needed credentials to present using PresentationExchange.selectCredentials
  const selectedCredentials = PresentationExchange.selectCredentials({
    vcJwts: credentials,
    presentationDefinition: offering.data.requiredClaims,
  })

  const submitRfq = async () => {
    // TODO 4: Create an exchange calling the createExchange function on messageUtils
    await createExchange({
      pfiUri: offering.metadata.from,
      offeringId: offering.id,
      payin: {
        amount: payinAmount,
        kind: offering.data.payin.methods[0].kind,

        paymentDetails: {}
      },
      payout: {
        Kind: offering.data.payout.methods[0].kind,
        paymentDetails: paymentDetails
      },
      
      Claims: selectedCredentials,
      didState: did,
      offering
    })
    
    setExchangesUpdated(true)
    props.onClose()
  }

  const handleNext = async () => {
    const currentFormId = forms[step].id
    if (currentFormId === RfqFormIds.Review) {
      await submitRfq()
    } else {
      setStep((prevStep) => prevStep + 1)
    }
  }

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1)
  }

  const forms = getRfqForms(offering, handleNext, handleBack)
  const { title, component } = forms[step]

  return (
    <View style={styles.container}> // Changed to View
      <View style={styles.header}> // Changed to View
        <Text style={styles.title}> // Changed to Text
          { pfiAllowlist.find(pfi => pfi.pfiUri === offering.metadata.from).pfiName }
        </Text>
        <Text style={styles.description}> // Changed to Text
          {offering.data.description}
        </Text>
      </View>
      {step > 0 && (<BackButton onBack={handleBack}/>)}

      <Panel width={'100%'} height={'100%'}> // Adjusted width/height for React Native
        {!offering ? (
          <Text>Something went wrong with the offering.</Text> // Changed to Text
        ) : (
          <View style={styles.content}> // Changed to View
            <Text style={styles.formTitle}>{title}</Text> // Changed to Text
            {component}
          </View>
        )}
      </Panel>
    </View>
  )
}

// Styles for React Native
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F1F1F', // Equivalent to bg-neutral-800
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  header: {
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 12,
    lineHeight: 18,
  },
  description: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  content: {
    marginTop: 8,
    color: '#A0A0A0', // Equivalent to text-gray-500
  },
  formTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
    paddingHorizontal: 12,
  },
});
