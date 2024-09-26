import { View, ScrollView, StyleSheet } from 'react-native';

/**
 * Panel Component
 *
 * This component provides a customizable panel or card container with a specified width and height.
 *
 * @param {Object} props - The props for the Panel component.
 * @param {ReactNode} props.children - The content to be displayed within the panel.
 * @param {string} props.width - The width of the panel, e.g., '50%', '100%'.
 * @param {string} props.height - The height of the panel, e.g., '200', 'auto'.
 * @returns {JSX.Element} - Returns a panel component with the specified width and height.
 */
export function Panel({ children, width, height }) {
  
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.flexCenter}>
          <View style={[styles.panel, { width, height }]}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
              {children}
            </ScrollView>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  innerContainer: {
    maxWidth: 600,
    color: 'white',
  },
  flexCenter: {
    justifyContent: 'center',
    paddingBottom: 28,
  },
  panel: {
    backgroundColor: '#4B5563', // Equivalent to bg-neutral-800
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  scrollContainer: {
    padding: 16,
    flexGrow: 1,
  },
});