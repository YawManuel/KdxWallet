import React, { useState } from 'react'
import { View } from 'react-native' // Import View from react-native

/**
 * This component provides a context to manage Exchanges data.
 *
 * @param {Object} props.children - Child components wrapped by the ExchangesProvider.
 * @param {Object} props.offeringsByCountry - Offerings by country used for displaying in the Offerings page.
 * @returns {JSX.Element} - Returns the ExchangesProvider component.
 */
export const ExchangesContext = React.createContext({ 
  exchangesUpdated: undefined,
  setExchangesUpdated: undefined,
})

export const ExchangesProvider = ({ children }) => {
  const [exchangesUpdated, setExchangesUpdated] = useState(false)

  return (
    <ExchangesContext.Provider
      value={{
        exchangesUpdated,
        setExchangesUpdated
      }}
    >
      <View>{children}</View> {/* Use View instead of a div */}
    </ExchangesContext.Provider>
  )
}