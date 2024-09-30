import { useState, useContext } from 'react'
import { RfqContext } from '../../features/RfqContext'
import { RfqFormIds, getRfqForms } from '../../features/RfqForms'
import { BackButton } from '../../common/BackButton'
import { Panel } from '../../common/Panel'
import { createExchange } from '../.././workshop/messageUtils'
import { View, Text, StyleSheet } from 'react-native' // Updated imports
import { useRecoilState } from 'recoil'
import { credentialsState, didState } from '../../state'
import { ExchangesContext } from '../../features/ExchangesContext'
import { pfiAllowlist } from '../../workshop/allowlist' // Ensure this path is correct
import { PresentationExchange } from '@web5/credentials'

type RfqModalProps = {
  onClose: () => void;
}
export function RfqModal(props: RfqModalProps) {
  const { setExchangesUpdated } = useContext(ExchangesContext)
  const [step, setStep] = useState(0)
  const { offering, payinAmount, paymentDetails } = useContext(RfqContext)
  const [credentials] = useRecoilState(credentialsState)
  const [did] = useRecoilState(didState)

  const selectedCredentials = PresentationExchange.selectCredentials({
    vcJwts: credentials,
    presentationDefinition: offering.data.requiredClaims,
  })

  const submitRfq = async () => {
    // TODO 3: Create an exchange calling the createExchange function on messageUtils
    await createExchange({
      pfiUri: offering.metadata.from,
      offeringId: offering.id,
      payin: {
        amount: payinAmount,
        kind: offering.data.payin.methods[0].kind,
        paymentDetails: {}
      },
      payout: {
        kind: offering.data.payout.methods[0].kind,
        paymentDetails
      },
      claims: selectedCredentials,
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
      <View style={styles.textCenter}> // Changed to View
        <Text style={styles.title}> // Changed to Text
          { pfiAllowlist.find(pfi => pfi.pfiUri === offering.metadata.from).pfiName }
        </Text>
        <Text style={styles.description}> // Changed to Text
          {offering.data.description}
        </Text>
      </View>
      {step > 0 && (<BackButton onBack={handleBack}/>)}

      <Panel width={'w-80'} height={'h-128'}>
        {!offering ? (
          <Text>Something went wrong with the offering.</Text> // Changed to Text
        ) : (
          <View style={styles.content}> // Changed to View
            <Text style={styles.componentTitle}>{title}</Text> // Changed to Text
            {component}
          </View>
        )}
      </Panel>
    </View>
  )
}

const styles = StyleSheet.create({ // Added styles
  container: {
    // Add styles for the container
  },
  textCenter: {
    alignItems: 'center',
  },
  title: {
    fontSize: 12,
    lineHeight: 18,
    color: 'white',
  },
  description: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
  },
  content: {
    marginTop: 8,
    color: 'gray',
  },
  componentTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
    paddingHorizontal: 12,
  },
})
