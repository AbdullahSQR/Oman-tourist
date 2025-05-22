import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

interface CategoryButtonProps {
  title: string;
  icon: string;
  color: string;
}

export default function CategoryButton({ title, icon, color }: CategoryButtonProps) {
  const iconName = icon === 'umbrella-beach' 
    ? '🏖️' 
    : icon === 'mountain' 
    ? '⛰️' 
    : icon === 'landmark' 
    ? '🏛️' 
    : icon === 'hiking' 
    ? '🥾' 
    : '🍽️';
    
  return (
    <Link
      href={{
        pathname: '/(tabs)/attractions',
        params: { category: title.toLowerCase() }
      }}
      asChild
    >
      <TouchableOpacity style={styles.container}>
        <View style={[styles.iconContainer, { backgroundColor: color }]}>
          <Text style={styles.icon}>{iconName}</Text>
        </View>
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginRight: 20,
    width: 70,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    fontSize: 24,
  },
  title: {
    fontSize: 12,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
});