import { TouchableOpacity, Text } from 'react-native';

export function NextButton({ onNext, disabled }) {
  return (
    <>
      <TouchableOpacity
        disabled={disabled}
        onPress={onNext}
        style={{
          borderRadius: 20,
          backgroundColor: disabled ? 'rgba(99, 102, 241, 0.5)' : '#6366F1',
          width: '100%',
          paddingVertical: 10,
          paddingHorizontal: 15,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'white', fontWeight: '600', fontSize: 14 }}>
          Next
        </Text>
      </TouchableOpacity>
    </>
  );
}