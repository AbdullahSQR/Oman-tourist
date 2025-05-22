import { 
  StyleSheet, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Platform,
  ViewStyle
} from 'react-native';
import { Search as SearchNormal1, X } from 'lucide-react-native';
import { useState } from 'react';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (text: string) => void;
  containerStyle?: ViewStyle;
}

export default function SearchBar({ 
  placeholder = 'Search...', 
  onSearch, 
  containerStyle 
}: SearchBarProps) {
  const [searchText, setSearchText] = useState('');
  
  const handleClear = () => {
    setSearchText('');
    if (onSearch) {
      onSearch('');
    }
  };
  
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.searchIcon}>
        <SearchNormal1 size={20} color="#999" />
      </View>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#999"
        value={searchText}
        onChangeText={(text) => {
          setSearchText(text);
          if (onSearch) {
            onSearch(text);
          }
        }}
      />
      {searchText ? (
        <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
          <X size={18} color="#999" />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 50,
    width: '100%',
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: '#333',
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
  },
  clearButton: {
    padding: 4,
  },
});