import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Modal, FlatList } from 'react-native'
import { Ionicons } from '@expo/vector-icons'; // Example of a compatible icon library

/**
 * Dropdown Component
 *
 * This component provides a customizable dropdown menu using the Headless UI library in React.
 * It allows users to select an item from a list of options and displays the selected item or a label.
 *
 * @param {Object} props - The props for the Dropdown component.
 * @param {Array} props.items - An array of items to populate the dropdown menu.
 * @param {any} props.selectedItem - The currently selected item from the dropdown.
 * @param {Function} props.setSelectedItem - A callback function to set the selected item.
 * @param {string} [props.selectedItemColor='text-gray-100'] - The color of the selected item text, defaulting to a light gray.
 * @param {string} [props.label] - A label to display when no item is selected.
 * @param {string} [props.labelKind=''] - If specified, this key is used to extract the label text from items.
 * @returns {JSX.Element} - Returns a dropdown menu component.
 */
export function Dropdown({ items, selectedItem, setSelectedItem, selectedItemColor = 'gray', label, labelKind = '' }) {
  const [modalVisible, setModalVisible] = useState(false)

  const handleSelect = (item) => {
    setSelectedItem(item)
    setModalVisible(false)
  }

  return (
    <View className="relative mt-3">
      <TouchableOpacity 
        onPress={() => setModalVisible(true)} 
        className="w-full flex-row justify-between items-center bg-transparent px-3 py-2"
      >
        <Text className={`${selectedItem ? selectedItemColor : 'text-gray-400'} text-left`}>
          {selectedItem ? (labelKind !== '' ? selectedItem[labelKind] : selectedItem) : label}
        </Text>
        <Ionicons name="chevron-down" size={20} color="gray" /> // Updated icon usage
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
      >
        <View className="absolute right-0 z-10 mt-2 w-full max-h-60 bg-neutral-900">
          <FlatList
            data={items}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => handleSelect(item)} className="px-4 py-2">
                <Text className={`${labelKind !== '' ? item[labelKind] : item} text-gray-300`}>
                  {labelKind !== '' ? item[labelKind] : item}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </View>
  )
}
