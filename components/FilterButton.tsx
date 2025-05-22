import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface FilterButtonProps {
  title: string;
  active: boolean;
  onPress: () => void;
}

export default function FilterButton({ title, active, onPress }: FilterButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        active ? styles.activeContainer : null
      ]}
      onPress={onPress}
    >
      <Text 
        style={[
          styles.text,
          active ? styles.activeText : null
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    marginRight: 10,
  },
  activeContainer: {
    backgroundColor: '#CB7D62',
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  activeText: {
    color: '#FFFFFF',
  },
});